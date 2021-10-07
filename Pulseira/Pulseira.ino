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
  SerialBT.begin("HERA"); 
  pinMode(buttonPin, INPUT);
}

void loop() {
  buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH) {
    aux++;
    buttonState = digitalRead(buttonPin); 
    delay(333); 
  }
   if(aux==1){
    Serial.println(aux);
    if(alarme1>2){
      socorro1();
    }
    alarme1++;
    }
    if(aux>1){
      Serial.print(aux);
      if(alarme2>2){
       socorro2();
    }
    alarme2++;
  }
}
void socorro1(){
  SerialBT.write('1');
  Serial.println("1");
  delay(333);
  aux=0;
  alarme1=0;
  alarme2=0;
  buttonState = (!buttonState);
}
void socorro2(){
  SerialBT.write('2');
  Serial.println("2");
  delay(333);
  aux=0;
  alarme1=0;
  alarme2=0;
  buttonState = (!buttonState);
  
}
