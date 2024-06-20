#include "M5_SIM7080G.h"
M5_SIM7080G device;
String latitude, longitude, speed;

void setup()
{
    Serial.begin(115200);
    device.Init(&Serial2, 43, 44);

    /* Reboot SIM7080G */
    device.sendMsg("AT+CREBOOT\r\n");
    delay(1000);


    /* Open GNSS power */
    while (device.send_and_getMsg("AT+CGNSPWR=1\r\n").indexOf("OK") == -1) {
      Serial.print(".");
      delay(3000);
    }

    delay(1000);

    while(1){
      device.sendMsg("AT+CSQ\r\n");
      String readstr = device.waitMsg(1000);
      Serial.print(readstr);
      if(readstr.indexOf("+CSQ: 99,99") ==-1){
          break;
      }
    }

    /* Check SIM status */
    device.sendMsg("AT+CMEE=2\r\n");
    delay(1000);

    device.sendMsg("AT+CNACT=0,1\r\n");
    Serial.print(device.waitMsg(200));
    device.sendMsg("AT+CNACT?\r\n");
    Serial.print(device.waitMsg(200));
    device.sendMsg("AT+SMDISC?\r\n");
    Serial.print(device.waitMsg(200));
    
}
void loop()
{
  /* Start MQTT connection */
  Serial.println("Connect to MQTT server");
  while(1){
    /* Set up */
    device.sendMsg("AT+SMCONF=\"URL\",\"io.adafruit.com\",\"1883\"\r\n");
    Serial.print(device.waitMsg(500));
    device.sendMsg("AT+SMCONF=\"CLEANSS\",1\r\n");
    Serial.print(device.waitMsg(500));
    device.sendMsg("AT+SMCONF=\"KEEPTIME\",60\r\n");
    Serial.print(device.waitMsg(500));
    device.sendMsg("AT+SMCONF=\"CLIENTID\",\"SIM7080G\"\r\n");
    Serial.print(device.waitMsg(500));
    device.sendMsg("AT+SMCONF=\"QOS\",1\r\n");
    Serial.print(device.waitMsg(500));
    device.sendMsg("AT+SMCONF=\"USERNAME\",\"Username\"\r\n");
    Serial.print(device.waitMsg(500));
    device.sendMsg("AT+SMCONF=\"PASSWORD\",\"Key\"\r\n");
    Serial.print(device.waitMsg(500));
    /* Connecting */
    device.sendMsg("AT+SMCONN\r\n");
    String res = device.waitMsg(5000);
    Serial.println(res);
    if(res.indexOf("ERROR") == -1){
      break;
    }
  }

  while(1){
    /* Read GNSS data */
    String data = device.send_and_getMsg("AT+CGNSINF\r\n");
    // Serial.println(data);

    if(data != NULL){
      /* Handle NMEA string */
      int startIndex = 0;
      int endIndex = data.indexOf(',');
      int i = 0;
      String a[20];

      while (endIndex != -1) {
        String token = data.substring(startIndex, endIndex);
        a[i++] = token;

        startIndex = endIndex + 1;
        endIndex = data.indexOf(',', startIndex);
      }

      Serial.println("[" + a[3] + ", " + a[4] + "], " + a[6]);

      if(a[3] != NULL){
        device.sendMsg("AT+SMPUB=\"\"," + String(a[3].length()) + ",1,1\r\n");
        delay(100);
        device.sendMsg(a[3] + "\r\n");
        Serial.println(device.waitMsg(0));
      }

      if(a[4] != NULL){
        device.sendMsg("AT+SMPUB=\"\"," + String(a[4].length()) + ",1,1\r\n");
        delay(100);
        device.sendMsg(a[4] + "\r\n");
        Serial.println(device.waitMsg(0));
      }

      if(a[6] != NULL){
        device.sendMsg("AT+SMPUB=\"\"," + String(a[6].length()) + ",1,1\r\n");
        delay(100);
        device.sendMsg(a[6] + "\r\n");
        Serial.println(device.waitMsg(0));
      } 
    }
    delay(6000);
  }
}