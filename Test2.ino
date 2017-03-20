#include <SPI.h>
#include <MFRC522.h>
#include <Adafruit_Fingerprint.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal.h>

#define RST_PIN         9
#define SS_PIN          10
MFRC522 mfrc522(SS_PIN, RST_PIN);

SoftwareSerial mySerial(2, 3);    // for fingerprint               Arduino : Tx(11) --->  Rx(Whilte) FingerModulue     Arduino : Rx(10) <---  Tx(Green) FingerModulue
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);
int ch_rfid=0;
int ch_fing=0;
int getFingerprintIDez();
long int tick=0;
long int tock=0;
bool Ser = 0;
char res[11]={};
int ID = 0;
LiquidCrystal lcd(4,5,A1,A2,A3,A4);

void setup() {
  Serial.begin(9600);
  SPI.begin();
  lcd.begin(16, 2);
  mfrc522.PCD_Init();
  finger.begin(57600);
  pinMode(6,INPUT_PULLUP);
  pinMode(7,INPUT_PULLUP);
  
  if (finger.verifyPassword()) {
    //Serial.println("Found BioSen");
    lcd.print("Found BioSen");
  } else {
    //Serial.println("BioSen Not Found");
    lcd.print("BioSen Not Found");
    while (1);
  }
  //Serial.println("RFID Waiting");
  lcd.clear();
  lcd.print("Ready...");

}

void loop() {

 ch_rfid = 0;
 ch_rfid = RfidScan();
 if (ch_rfid==1){
  //Serial.println("Finger Biometric Ready...");
  lcd.clear();
  lcd.print("Place Finger");
  for(int i=0; i<5; i++){
    delay(1000);
    }
    ch_fing = 0;
  ch_fing = getFingerprintIDez();
  if (ch_fing == 1){
    //Serial.println("User Authenticated !");
    Serial.print("RFID:");
    dump_byte_array(mfrc522.uid.uidByte, mfrc522.uid.size);
    //Serial.println("");
    Serial.print("Finger ID:");
    Serial.print(finger.fingerID);
    tick = tock = millis();
    Ser = 0;
    Serial.flush();
    for (int i=0; i<11; i++)
    {
       res[i] = {};
       //delay(50);
    }
    while (tock - tick < 10000)
    {
      if (Serial.available()>0)
      {
        for (int i=0; i<3; i++)
        {
          res[i] = Serial.read();
          delay(50);
        }
        if (res[0]=='Y' && res[1]=='E' && res[2]=='S')
          Ser = 1;
        break;
      }
      tock = millis();
    }
    if (Ser == 1)
    {
    lcd.clear();
    lcd.print("Weapon Issued");
    delay(2000);
    }
    else
    {
      lcd.clear();
    lcd.print("No User Found");
    delay(2000);
    }
  }
  else{
    //Serial.println("Finger Biometric Not Authenticated !");
    lcd.clear();
    lcd.print("No User Found"Z);
    delay(2000);
    }
     lcd.clear();
    lcd.print("Ready...");
 }
  else if (digitalRead(6)== LOW)
  {
    Serial.print("Enroll RFID");
    lcd.clear();
    lcd.print("Enrolling RFID");
    tick = tock = millis();
    Ser = 0;
    Serial.flush();
    for (int i=0; i<11; i++)
    {
       res[i] = {};
       //delay(50);
    }
    while (tock - tick < 10000)
    {
      if (Serial.available()>0)
      {
        for (int i=0; i<10; i++)
        {
          res[i] = Serial.read();
          delay(50);
        }
        if (res[0]=='A' && res[1]=='C' && res[2]=='K' && res[3]==' ' && res[4]=='E' && res[5]=='n' && res[6]=='r' && res[7]=='o' && res[8]=='l' && res[9]=='l' )
          Ser = 1;
        break;
      }
      tock = millis();
    }
    if (Ser == 1)
    {
      ch_rfid = 0;
      lcd.clear();
      lcd.print("Place RFID");
      tick = tock = millis();
      while ((ch_rfid == 0) && (tock - tick < 10000))
      {
        ch_rfid = RfidScan();
        tock = millis();
      }
      if (ch_rfid == 1){
      Serial.print("RFID:");
      dump_byte_array(mfrc522.uid.uidByte, mfrc522.uid.size);
      tick = tock = millis();
      Ser = 0;
      Serial.flush();
      for (int i=0; i<11; i++)
        {
          res[i] = {};
          //delay(50);
        }
    while (tock - tick < 10000)
    {
      if (Serial.available()>0)
      {
        for (int i=0; i<8; i++)
        {
          res[i] = Serial.read();
          delay(50);
        }
        if (res[0]=='E' && res[1]=='n' && res[2]=='r' && res[3]=='o' && res[4]=='l' && res[5]=='l' && res[6]=='e' && res[7]=='d')
            Ser = 1;
        break;
      }
      tock = millis();
    }
    if (Ser == 1)
    {
      lcd.clear();
      lcd.print("Enrolled!");
      delay(2000);
    }
    else
    {
      lcd.clear();
      lcd.print("Error!");
      delay(2000);
    }
    
    }
    }
    lcd.clear();
    lcd.print("Ready...");
  }
  else if (digitalRead(7)==LOW)
  {
    Serial.print("Enroll BioSen?");
    lcd.clear();
    lcd.print("Enrolling BioSen");
    tick = tock = millis();
    Ser = 0;
    Serial.flush();
    for (int i=0; i<11; i++)
    {
       res[i] = {};
       //delay(50);
    }
    while (tock - tick < 10000)
    {
      if (Serial.available()>0)
      {
        for (int i=0; i<10; i++)
        {
          res[i] = Serial.read();
          delay(50);
        }
        if (res[0]=='A' && res[1]=='C' && res[2]=='K' && res[3]==' ' && res[4]=='E' && res[5]=='n' && res[6]=='r' && res[7]=='o' && res[8]=='l' && res[9]=='l' )
          Ser = 1;
        break;
      }
      tock = millis();
    }
    if (Ser == 1)
    {
      ch_fing = 0;
      ch_fing = getFingerprintEnroll();
      if (ch_fing == 1){
      Serial.print("Finger ID:");
      Serial.print(ID);
      Ser = 0;
      Serial.flush();
      for (int i=0; i<11; i++)
        {
          res[i] = {};
          //delay(50);
        }
        tick = tock = millis();
    while (tock - tick < 10000)
    {
      if (Serial.available()>0)
      {
        for (int i=0; i<8; i++)
        {
          res[i] = Serial.read();
          delay(50);
        }
        if (res[0]=='E' && res[1]=='n' && res[2]=='r' && res[3]=='o' && res[4]=='l' && res[5]=='l' && res[6]=='e' && res[7]=='d')
            Ser = 1;
        break;
      }
      tock = millis();
    }
    if (Ser == 1)
    {
      lcd.clear();
      lcd.print("Enrolled!");
      delay(2000);
    }
    else
    {
      lcd.clear();
      lcd.print("Error!");
      delay(2000);
    }
    
    }
    }
    lcd.clear();
    lcd.print("Ready...");
  } 
}

int RfidScan()
{
if ( ! mfrc522.PICC_IsNewCardPresent())
return 0;

if ( ! mfrc522.PICC_ReadCardSerial())
return 0;

return 1;
}


// returns -1 if failed, otherwise returns ID #
int getFingerprintIDez() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK)  return -1;
  
  // found a match!
  //Serial.print("Found ID #"); Serial.print(finger.fingerID); 
  //Serial.print(" with confidence of "); Serial.println(finger.confidence);
  //return finger.fingerID; 
  return 1;
}

void dump_byte_array(byte *buffer, byte bufferSize) {
for (byte i = 0; i < bufferSize; i++) {
Serial.print(buffer[i] < 0x10 ?  ",0" : ",");
//Serial.print(" ");
Serial.print(buffer[i],HEX);
}
Serial.println();
}

int getFingerprintEnroll() {

  int p = -1;
  lcd.clear();
  lcd.print("Place Finger");
  p = finger.getTemplateCount();
  if (p != FINGERPRINT_OK)  return -1;
  uint16_t id = finger.templateCount + 1;
  delay(4000);
  //Serial.print("Waiting for valid finger to enroll as #"); Serial.println(id);
  //while (p != FINGERPRINT_OK) {
  p = finger.getImage();
  if (p != FINGERPRINT_OK)  return -1;
  p = finger.image2Tz(1);
  if (p != FINGERPRINT_OK)  return -1;
  
  lcd.clear();
  lcd.print("Remove Finger");
  delay(2000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  p = -1;
  lcd.clear();
  lcd.print("Place finger");
  delay(4000);
  p = finger.getImage();  
  if (p != FINGERPRINT_OK)  return -1;
  // OK success!

  p = finger.image2Tz(2);
  if (p != FINGERPRINT_OK)  return -1;
  
  // OK converted!
  
  p = finger.createModel();
  if (p != FINGERPRINT_OK)  return -1;
  p = finger.storeModel(id);
  if (p != FINGERPRINT_OK)  return -1;
  ID = id;
  return 1;
}
