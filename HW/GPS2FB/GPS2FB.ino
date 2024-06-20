#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <TinyGPS++.h>

// Provide the token generation process info.
#include <addons/TokenHelper.h>

// Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>
#define ID ""

/* 1. Define the WiFi credentials */
#define WIFI_SSID ""
#define WIFI_PASSWORD ""

// For the following credentials, see examples/Authentications/SignInAsUser/EmailPassword/EmailPassword.ino

/* 2. Define the API Key */
#define API_KEY ""

/* 3. Define the RTDB URL */
#define DATABASE_URL "" //<databaseName>.firebaseio.com or <databaseName>.<region>.firebasedatabase.app

/* 4. Define the user Email and password that alreadey registerd or added in your project */
#define USER_EMAIL ""
#define USER_PASSWORD ""

#define FIREBASE_PROJECT_ID ""
// Define UART pins
#define RXD 3
#define TXD 1

// Define GPS object
HardwareSerial neogps(1);
TinyGPSPlus gps;

// Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;

bool gpsData = false;
bool valid = false;
bool update = true;
int flag;
int cnt = 0;
double lat;
double lng;
double spd;
double hgt;
String rec;
String e;

void setup()
{
    neogps.begin(9600, SERIAL_8N1, 3, 1);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED)
    {
      delay(300);
    }

    /* Assign the api key (required) */
    config.api_key = API_KEY;

    /* Assign the user sign in credentials */
    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;

    /* Assign the RTDB URL (required) */
    config.database_url = DATABASE_URL;

    /* Assign the callback function for the long running token generation task */
    config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

    // Since Firebase v4.4.x, BearSSL engine was used, the SSL buffer need to be set.
    // Large data transmission may require larger RX buffer, otherwise connection issue or data read time out can be occurred.
    fbdo.setBSSLBufferSize(10240 /* Rx buffer size in bytes from 512 - 16384 */, 10240 /* Tx buffer size in bytes from 512 - 16384 */);

    // Or use legacy authenticate method
    // config.database_url = DATABASE_URL;
    // config.signer.tokens.legacy_token = "<database secret>";

    Firebase.begin(&config, &auth);

    // Comment or pass false value when WiFi reconnection will control by your code or third party library e.g. WiFiManager
    Firebase.reconnectNetwork(true);
}

void loop()
{
  cnt++;
  flag = neogps.available();
  for(unsigned long start = millis(); millis() - start < 1000;){
    while(neogps.available() > 0){
      if(gps.encode(neogps.read())){
        if(gps.location.isValid()){
          valid = true;
          lat = gps.location.lat();
          lng = gps.location.lng();
        }
        else valid = false;
        gpsData = true;
      }
    }
    if(gpsData == true){
      gpsData = false;
      spd = gps.speed.kmph();
      hgt = gps.altitude.meters();
    }
  }
  if (Firebase.ready())
  {
    FirebaseJson json;
    json.setDoubleDigits(15);
    json.add("Count", cnt);
    json.add("Error", e);
    Firebase.RTDB.setJSON(&fbdo, "/Data", &json);
    Firebase.RTDB.getJSON(&fbdo, "/Data");
    

    String documentPath = "Data/Location";
    FirebaseJson data;
    data.set("fields/ID/doubleValue", String(ID).c_str());
    data.set("fields/Latitude/doubleValue", String(lat).c_str());
    data.set("fields/Longitude/doubleValue", String(lng).c_str());
    data.set("fields/Speed/doubleValue", String(spd).c_str());
    data.set("fields/Count/doubleValue", String(cnt).c_str());
    if(Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), data.raw(), "ID, Latitude, Longitude, Speed, Count")){
      return;
    }
    else e = fbdo.errorReason();
    if(Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), data.raw())){
      return;
    }
    else e = fbdo.errorReason();
  }
  delay(1);
}
