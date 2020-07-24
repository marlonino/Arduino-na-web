const int pot= 1;
const int led= 13;
int valor=0;



void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
pinMode(led,OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
valor= analogRead(pot);
Serial.println(valor);

if(Serial.available()){
  switch(Serial.read()){
    case 'a':
    digitalWrite(led, HIGH);
    break;
    case 'b':
    digitalWrite(led,LOW);
    break;
  }
  delay(2000);
}
}
