#include "M5_SIM7080G.h"
#include "Arduino.h"
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>

#define WIFI_SSID ""
#define WIFI_PASSWORD ""
#define USER_EMAIL ""
#define USER_PASSWORD ""
#define FIREBASE_PROJECT_ID ""
#define STORAGE_BUCKET_ID ""
#define API_KEY ""

M5_SIM7080G device;

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig configF;

int id = 1;
bool in = true;
bool firstStart = true;

double latitude, longitude, speed;
String timeValue, state;
// double latitude_estimate, longitude_estimate, speed_estimate;
// double latitude_variance = 0.5, longitude_variance = 0.5, speed_variance = 0.5; 
// double process_variance = 0.001, measurement_variance = 5.0;


void setup()
{
    Serial.begin(115200);
    /* Init SIM7080G */
    device.Init(&Serial2, 43, 44);

    /* Reboot SIM7080G */
    device.sendMsg("AT+CREBOOT\r\n");
    delay(1000);

    /* Open GNSS power */
    while (device.send_and_getMsg("AT+CGNSPWR=1\r\n").indexOf("OK") == -1) {
        Serial.print(".");
        delay(2000);
    }

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED)
    {
      Serial.print("-");
      delay(2000);
    }
    Serial.println("Wifi connected");

    configF.api_key = API_KEY;
    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;
    configF.token_status_callback = tokenStatusCallback;
    fbdo.setBSSLBufferSize( 4096 /* Rx */, 4096 /* Tx */);
    Firebase.begin(&configF, &auth);
    Firebase.reconnectNetwork(true);

    delay(10000);
}

void loop()
{
  String data = device.send_and_getMsg("AT+CGNSINF\r\n");
  unsigned long start = millis();

  int startIndex = 0;
  int endIndex = data.indexOf(',');
  // Serial.print(data);

  int i = 0;
  String a[20];
  while (endIndex != -1) {
    String token = data.substring(startIndex, endIndex);
    a[i++] = token;

    startIndex = endIndex + 1;
    endIndex = data.indexOf(',', startIndex);
  }
  
  timeValue = a[2];
  latitude = a[3].toDouble();
  longitude = a[4].toDouble();
  speed = a[6].toDouble();

  if(latitude == 0.000000 && longitude == 0.000000)
  {
    Serial.println("GPS is starting up");
  }
  else{
    if(firstStart == true){
      unsigned long end = millis();
      unsigned long duration = end - start;
      Serial.print("Time taken: ");
      Serial.print(duration);
      Serial.println(" ms");
    }
  }

  if(speed > 1) state = "Di chuyển";
  else state = "Đang đỗ";

  // if(in == true && latitude != 0){
  //   latitude_estimate = latitude;
  //   longitude_estimate = longitude;
  //   speed_estimate = speed;
  //   in = false;
  // }
  // else if(in == false){
  //   latitude_estimate += process_variance;
  //   double kalman_gain_lat = latitude_estimate / (latitude_estimate + measurement_variance);
  //   latitude_estimate += kalman_gain_lat * (latitude - latitude_estimate);
  //   latitude_variance = (1 - kalman_gain_lat) * latitude_variance;

  //   longitude_estimate += process_variance;
  //   double kalman_gain_long = longitude_estimate / (longitude_estimate + measurement_variance);
  //   longitude_estimate += kalman_gain_long * (longitude - longitude_estimate);
  //   longitude_variance = (1 - kalman_gain_long) * longitude_variance;

  //   speed_estimate += process_variance;
  //   double kalman_gain_speed = speed_estimate / (speed_estimate + measurement_variance);
  //   speed_estimate += kalman_gain_long * (speed - speed_estimate);
  //   speed_variance = (1 - kalman_gain_long) * speed_variance;
  // }

  Serial.print("Number: ");
  Serial.print(id);
  Serial.print(", [");
  Serial.print(latitude, 6);
  Serial.print(", ");
  Serial.print(longitude, 6);
  Serial.print("]");

  Serial.print(", Speed: ");
  Serial.print(speed, 2);
  Serial.print(", Time: ");
  Serial.print(timeValue);

  if (Firebase.ready() && latitude != 0 && longitude != 0){
    unsigned long startTime = millis();
    String documentPath = "devices/1913991/box/" + (String)id;
    String newData = "devices/1913991";


    FirebaseJson data;
    data.set("fields/box_lat/doubleValue", latitude);
    data.set("fields/box_lng/doubleValue", longitude);
    data.set("fields/box_spd/doubleValue", speed);
    data.set("fields/box_time/stringValue", timeValue);
    data.set("fields/state/stringValue", state);

    id++;

    Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), data.raw(), "");
    Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), data.raw());
    Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", newData.c_str(), data.raw(), "");
    Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", newData.c_str(), data.raw());
    unsigned long endTime = millis();
    unsigned long duration = endTime - startTime;
    Serial.print(", Time taken: ");
    Serial.print(duration);
    Serial.println(" ms");
  }

  delay(3000);
}