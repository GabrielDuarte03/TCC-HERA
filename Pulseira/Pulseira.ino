#include "BluetoothSerial.h"
#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif
BluetoothSerial SerialBT;
int aux=0;   
int alarme1=0;
int alarme2=0;

void setup() {
  pinMode(0, INPUT);
  pinMode(2,OUTPUT);
  Serial.begin(9600);
  SerialBT.begin("HERA"); 
}

void loop() {
  int buttonState = digitalRead(0);
  if (buttonState == LOW) {
    aux++;
    delay(333); 
  }
   if(aux==1){
    if(alarme1>2){
      socorro1();
    }
    alarme1++;
    }
    if(aux>1){
      if(alarme2>2){
       socorro2();
    }
    alarme2++;
  }
}
void socorro1(){
  SerialBT.write('1');
  Serial.println("");
  Serial.println("SOCORRO 1");
  delay(333);
  aux=0;
  alarme1=0;
  alarme2=0;
}
void socorro2(){
  SerialBT.write('2');
  Serial.println("");
  Serial.println("SOCORRO 2");
  delay(333);H
  aux=0;
  alarme1=0;
  alarme2=0;
}
