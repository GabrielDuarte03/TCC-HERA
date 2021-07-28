#include "BluetoothSerial.h"

#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif
const int buttonPin = 13;
int buttonState = 0;       
BluetoothSerial SerialBT;

void setup() {
  Serial.begin(115200);
  SerialBT.begin("ESP32test"); 
   pinMode(buttonPin, INPUT);
}


void loop() {
  buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH) {
     SerialBT.write('1');
     buttonState = (!buttonState);
  } 
}