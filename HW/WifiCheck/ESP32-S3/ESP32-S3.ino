// int count = 0;

// void setup() {
//   Serial.begin(9600);
// }

// void loop() {
//   Serial.print("count = "); Serial.println(count++);
//   delay(500);
// }
#include <WiFi.h>
const char* ssid = "abcd";
const char* password = "23086021";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  WiFi.setSleep(false);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  Serial.print(WiFi.localIP());
}

void loop() {
  Serial.println(".");
  delay(500);
}