int frameRate = 50;
float seconds = 0;
float waveshape = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  //Simulates a sine Analog signal...
  //...and send this wave by serial port
  seconds = calcSeconds();
  waveshape = sin(seconds);
  waveshape = reescaleWave();
  
  Serial.print(waveshape);
  Serial.print("\n");
}

float calcSeconds() {
  float in = millis();
  float out = in / 1000;
  return out;
}

float reescaleWave() {
    float out = waveshape;
    out = out * (1023 / 2);
    out = out + (1023 / 2);

    return out;
}
