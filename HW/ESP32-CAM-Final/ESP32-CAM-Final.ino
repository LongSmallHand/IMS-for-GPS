#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <TinyGPS++.h>
#include "esp_camera.h"
#include "soc/soc.h" 
#include "soc/rtc_cntl_reg.h"
#include "time.h"
#include "driver/rtc_io.h"
#include <LittleFS.h>
#include <FS.h>
#include "M5Stack.h"
#include "M5GFX.h"
#include "M5_SIM7080G.h"

// Provide the token generation process info.
#include <addons/TokenHelper.h>
// Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>

#define SPIFFS LittleFS
String Device_ID = "1913991";

/* 1. Define the WiFi credentials */
#define WIFI_SSID ""
#define WIFI_PASSWORD ""
/* 2. Define the API Key */
// #define API_KEY "AIzaSyB1vx2TC2M5I1sFVxrOsPNy-fhymp5Cpgk"
#define API_KEY ""
/* 3. Define the RTDB URL */
// #define DATABASE_URL "https://esp32-jpg-default-rtdb.asia-southeast1.firebasedatabase.app"
#define DATABASE_URL ""
/* 4. Define the user Email and password that alreadey registerd or added in your project */
#define USER_EMAIL ""
#define USER_PASSWORD ""
/* 5. Define the project ID */
// #define FIREBASE_PROJECT_ID "esp32-jpg"
#define FIREBASE_PROJECT_ID ""
// Define Firebase storage bucket ID
// #define STORAGE_BUCKET_ID "esp32-jpg.appspot.com"
#define STORAGE_BUCKET_ID ""
// Define OV2640 camera module pins 
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

// Define pins
#define TXD 1
#define RXD 3
#define FLASH 4

// Define GPS object
HardwareSerial neogps(1);
TinyGPSPlus gps;

// Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig configF;
// Define Timezone https://github.com/nayarsystems/posix_tz_db/blob/master/zones.csv
String myTimezone ="<+07>-7";

bool takeNewPhoto = true;
bool taskCompleted = false;
bool valid = false;

// Vehicle Variable
double lat, lng, spd;
int fuel = 100; 
int id = 1;
uint8_t day, month, hour, minute, second;
uint16_t year;
// uint32_t d_value, t_value;
String t_value;
String state, now;

// Error Variable
String time_e, fs_e, write_e, firebase_e, pushimg_e, delete_p, cam_e, name, e;
// Counter
unsigned int cnt = 0;
unsigned int step = 0;

M5GFX display;
M5Canvas canvas(&display);
M5_SIM7080G device;

void log(String str) {
  Serial.print(str);
  canvas.print(str);
  canvas.pushSprite(0, 0);
}

void fcsUploadCallback(FCS_UploadStatusInfo info);

void deleteFile(fs::FS &fs, String& path){
  if(fs.remove(path)) delete_p = "File deleted";
  else delete_p = "Delete failed";
}

void setTimezone(String timezone){
  setenv("TZ",timezone.c_str(),1);  
  tzset();
}

// Connect to NTP server and adjust timezone
void initTime(String timezone){
  struct tm timeinfo;
  configTime(0, 0, "pool.ntp.org");    
  if(!getLocalTime(&timeinfo)){
    time_e="Failed to obtain time";
    return;
  }
  setTimezone(timezone);
}

// Get the picture filename based on the current time
String getTime(){
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    time_e = "Failed to obtain time";
    return "";
  }
  char timeString[10];
  strftime(timeString, sizeof(timeString), "%H:%M:%S", &timeinfo);
  return timeString;
}

String getPictureFilename(){
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    time_e = "Failed to obtain time";
    return "";
  }
  char timeString[20];
  strftime(timeString, sizeof(timeString), "%d-%m-%y_%H-%M-%S", &timeinfo);
  time_e = timeString;
  String filename = "/" + String(timeString) +".jpg";
  return filename;
}

// Capture Photo and Save to LittleFS
void capturePhotoSaveLittleFS( void ) {
  // Dispose first pictures because of bad quality
  camera_fb_t* fb = NULL;
  // Skip first 3 frames (increase/decrease number as needed).
  for (int i = 0; i < 4; i++) {
    fb = esp_camera_fb_get();
    esp_camera_fb_return(fb);
    fb = NULL;
  }
  // Take a new photo
  fb = NULL;
  fb = esp_camera_fb_get();  
  if(!fb) {
    cam_e = "Camera capture failed";
    delay(1000);
    ESP.restart();
  }  
  else cam_e = "Capture success";

  // Photo file name
  String path = getPictureFilename();
  name = path;
  File file = LittleFS.open(path.c_str(), FILE_WRITE);

  // Insert the data in the photo file
  if (!file) {
    write_e = "Failed to open file in writing mode";
  }
  else {
    write_e = "Save picture to littleFS";
    file.write(fb->buf, fb->len); // payload (image), payload length
  }
  file.close();
  esp_camera_fb_return(fb);
}

void initLittleFS(){
  if (!LittleFS.begin(true)) {
    fs_e = "An Error has occurred while mounting LittleFS";
    ESP.restart();
  }
  else {
    delay(500);
    fs_e = "Mounting LittleFS success";
  }
}

void initCamera(){
 // OV2640 camera module
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.grab_mode = CAMERA_GRAB_LATEST;
  config.frame_size = FRAMESIZE_VGA;
  config.jpeg_quality = 16;
  config.fb_count = 1;

  // Camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    ESP.restart();
  }

  sensor_t * s = esp_camera_sensor_get();
  s->set_brightness(s, 2);
  s->set_saturation(s, 2);
  s->set_contrast(s, -1);
  s->set_hmirror(s, 0);
  s->set_whitebal(s, 1);
  s->set_awb_gain(s,1);
  s->set_wb_mode(s,0);
  s->set_lenc(s, 1);  
  s->set_quality(s, 16);
  s->set_framesize(s, FRAMESIZE_VGA);
  s->set_agc_gain(s, 1);
  s->set_gainceiling(s, (gainceiling_t)6);
  s->set_raw_gma(s, 1);
}

void setup(){
  M5.begin();
  display.begin();
  if (display.isEPD())
  {
    display.setEpdMode(epd_mode_t::epd_fastest);
    display.invertDisplay(true);
    display.clear(TFT_BLACK);
  }
  if (display.width() < display.height())
  {
    display.setRotation(display.getRotation() ^ 1);
  }
  canvas.setColorDepth(1);
  canvas.createSprite(display.width(), display.height());
  canvas.setTextSize((float)canvas.width() / 160);
  canvas.setTextScroll(true);
  
  // neogps.begin(9600, SERIAL_8N1, RXD, TXD);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
  }
  initTime(myTimezone);
  // initLittleFS();
  // Turn-off the 'brownout detector'
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
  // initCamera();

  /* Assign the api key (required) */
  configF.api_key = API_KEY;
  /* Assign the user sign in credentials */
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  /* Assign the RTDB URL (required) */
  configF.database_url = DATABASE_URL;
  /* Assign the callback function for the long running token generation task */
  configF.token_status_callback = tokenStatusCallback;
  // Since Firebase v4.4.x, BearSSL engine was used, the SSL buffer need to be set.
  fbdo.setBSSLBufferSize( 4096 /* Rx */, 4096 /* Tx */);
  // Connect Firebase and authentication
  Firebase.begin(&configF, &auth);
  // Comment or pass false value when WiFi reconnection will control by your code or third party library e.g. WiFiManager
  Firebase.reconnectNetwork(true);
}

void loop(){
  cnt++;
  step++;
  if (takeNewPhoto){
    capturePhotoSaveLittleFS();
    takeNewPhoto = false;
  }
  if (Firebase.ready() && !taskCompleted){
    taskCompleted = true;
    String path = "photo" + name;
    pushimg_e = "Send image to firebase";
    if(Firebase.Storage.upload(&fbdo, STORAGE_BUCKET_ID, name, mem_storage_type_flash, path, "image/jpeg", fcsUploadCallback)){
      firebase_e = "Upload";
    } 
    else firebase_e = fbdo.errorReason();
  }
  if (cnt == 10){
    cnt = 0;
    takeNewPhoto = true;
    taskCompleted = false;
  }
  if (step > 10) step = 0;

  for(unsigned long start = millis(); millis() - start < 1000;){
    while(neogps.available() > 0){
      if(gps.encode(neogps.read())){
        if(gps.location.isValid()){
          lat = gps.location.lat();
          lng = gps.location.lng();
        }
        if(gps.speed.isValid()){
          spd = gps.speed.kmph();
        }
        if(gps.date.isValid()){
          day = gps.date.day();
          month = gps.date.month();
          year = gps.date.year();
          d_value = gps.date.value();
        }
        if(gps.time.isValid()){
          hour = gps.time.hour();
          minute = gps.time.minute();
          second = gps.time.second();
          t_value = gps.time.value();
        }
        hour += 7;
        if(hour > 23) hour-=24;
      }
    }
    // lat = myLat[step];
    // lng = myLng[step];
    // spd = random(200, 3000) / 100.0;
    t_value = getTime();
    if(spd >= 3){
      state = "Di chuyển";
    }
    else state = "Đang đỗ";
  }
  if (Firebase.ready()){
    String documentPath = "devices/" + Device_ID + "/data/" + (String)id;
    String newData = "devices/" + Device_ID;
    FirebaseJson data;
    data.set("fields/lat/doubleValue", lat);
    data.set("fields/lng/doubleValue", lng);

    data.set("fields/speed/doubleValue", spd);
    data.set("fields/fuel/integerValue", fuel);
    data.set("fields/state/stringValue", state);

    // data.set("fields/time/arrayValue/values/[0]/integerValue", hour);
    // data.set("fields/time/arrayValue/values/[1]/integerValue", minute);
    // data.set("fields/time/arrayValue/values/[2]/integerValue", second);

    // data.set("fields/date/arrayValue/values/[0]/integerValue", day);
    // data.set("fields/date/arrayValue/values/[1]/integerValue", month);
    // data.set("fields/date/arrayValue/values/[2]/integerValue", year);

    // data.set("fields/d_v/integerValue", d_value);
    data.set("fields/t_v/stringValue", t_value);
    data.set("fields/img/stringValue", fbdo.downloadURL());
    id++;
    if(id > 20) id = 1;
    fuel--;
    if(fuel == 0) fuel = 100;

    if(Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), data.raw(), "lat, lng, speed, fuel, state, img, t_v")){
      e = "success";
    }
    else e = fbdo.errorReason();
    if(Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), data.raw())){
      e = "success";
    }
    else e = fbdo.errorReason();
  
    Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", newData.c_str(), data.raw(), "lat, lng, speed, fuel, state, img, t_v");
    Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", newData.c_str(), data.raw());
    // FirebaseJson rt;
    // rt.add("latitude", lat);
    // rt.add("Longitude", lng);
    // rt.add("State", state);
    // rt.add("Fuel", fuel);
    // rt.add("Speed", spd);
    // rt.add("Time", t_value);
    // rt.add("Date", d_value);
    // Firebase.RTDB.setJSON(&fbdo, "/Data", &rt);
    // Firebase.RTDB.getJSON(&fbdo, "/Data");

    FirebaseJson err;
    err.add("Time", time_e);
    err.add("FS", fs_e);
    err.add("Firebase", firebase_e);
    err.add("Pushing image", pushimg_e);
    err.add("Delete image", delete_p);
    err.add("Camera", cam_e);
    err.add("Save picture", write_e);
    err.add("Firestore", e);
    Firebase.RTDB.setJSON(&fbdo, "/Error", &err);
    Firebase.RTDB.getJSON(&fbdo, "/Error");  
  }
  delay(2000);
}

// The Firebase Storage upload callback function
void fcsUploadCallback(FCS_UploadStatusInfo info){
  if (info.status == firebase_fcs_upload_status_init){
    pushimg_e = "Init";
  }
  else if (info.status == firebase_fcs_upload_status_upload)
  {
    pushimg_e = "Uploading";
  }
  else if (info.status == firebase_fcs_upload_status_complete)
  {
    pushimg_e = "Upload completed";
    deleteFile(SPIFFS, name);
  }
  else if (info.status == firebase_fcs_upload_status_error){
    pushimg_e = "Upload failed";
    deleteFile(SPIFFS, name);
  }
}