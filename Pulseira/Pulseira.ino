#include "BluetoothSerial.h"
#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif

const int buttonPin=15;
int buttonState=0;    
int aux=0;   
int alarme1=0;
int alarme2=0;
BluetoothSerial SerialBT;

void setup() {
  Serial.begin(9600);
  SerialBT.begin("ESP32test"); 
  pinMode(buttonPin, INPUT);
}

void loop() {
  buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH) {
     buttonState = (!buttonState);
     delay(333);
     aux++;
  }
  if(aux==1){
    if(alarme1>2){
      Socorro1();
    }
    alarme1++;
    }
    if(aux>1){
      if(alarme2>2){
        Socorro2();
    }
    alarme2++;
  }
}

void Socorro1(){
  SerialBT.write('1');
  Serial.println("Tipo Um");
  ESP.restart();
}
void Socorro2(){
  SerialBT.write('2');
  Serial.println("Tipo Dois");
  ESP.restart();
  
}
