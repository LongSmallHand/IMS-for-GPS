#include "M5_SIM7080G.h"


M5_SIM7080G device;

String readstr;

void log(String str) {
    Serial.print(str);
}

void setup()
{
    device.Init(&Serial2, 43, 44);
    Serial.begin(115200);

    device.sendMsg("AT+CREBOOT\r\n");
    delay(1000);
    while(1){
        device.sendMsg("AT+CSQ\r\n");
        readstr = device.waitMsg(1000);
        log(readstr);
        if(readstr.indexOf("+CSQ: 99,99") ==-1){
            break;
        }
    }
}

void loop()
{

    while(1) {
        device.sendMsg("AT+CNACT=0,1\r\n");
        readstr = device.waitMsg(200);
        log(readstr);

        device.sendMsg("AT+CNACT?\r\n");
        readstr = device.waitMsg(200);
        log(readstr);

        device.sendMsg("AT+SMCONF=\"URL\",\"broker.emqx.io\",\"1883\"\r\n");
        readstr = device.waitMsg(1000);
        log(readstr);

        device.sendMsg("AT+SMCONF=\"KEEPTIME\",60\r\n");
        readstr = device.waitMsg(1000);
        log(readstr);

        device.sendMsg("AT+SMCONF=\"CLEANSS\",1\r\n");
        readstr = device.waitMsg(1000);
        log(readstr);

        device.sendMsg("AT+SMCONF=\"CLIENTID\",\"simmqtt\"\r\n");
        readstr = device.waitMsg(1000);
        log(readstr);

        device.sendMsg("AT+SMCONN\r\n");
        readstr = device.waitMsg(5000);
        log(readstr);

        if(readstr.indexOf("ERROR") == -1) {
            break;
        }
    }

    device.sendMsg("AT+SMSUB=\"sub_topic\",1\r\n");
    readstr = device.waitMsg(1000);
    log(readstr);

    while(1){
        device.sendMsg("AT+SMPUB=\"pub_topic\",5,1,1\r\n");
        delay(100);
        device.sendMsg("hello\r\n");
        readstr = device.waitMsg(0);
        Serial.print(readstr);
        delay(2000);
    }
}
