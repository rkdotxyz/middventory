/*
  Middventory data: everything in Middla Lab.

  To add a part, copy a line in ITEMS and change it:
    name    what people call it
    drawer  a code from DRAWERS below
    tab     boards | parts | tools | supplies
    icon    a drawing from js/art.js (reuse a similar one if there's no exact match)
    count   the number shown in the slot's corner (use null to hide it)
    mark    null | 'borrowed' | 'issue' | 'broken' | 'low'
    tags    extra search words, space separated
*/

const DRAWERS = {
  A1: "Arduino",
  A2: "Raspberry Pi",
  A3: "ESP and Wi‑Fi boards",
  A4: "LEDs and light",
  B1: "Sensors",
  B2: "Motors and servos",
  B3: "Pneumatics",
  B4: "Wires and connectors",
  C1: "Power",
  C2: "Soldering",
  C3: "Hand tools",
  C4: "Measuring",
  D1: "E‑textiles",
  D2: "Screws and bits",
  D3: "Sheets and filament",
};

const ITEMS = [
  // A1 · Arduino
  { name: "Arduino Uno R3", drawer: 'A1', tab: 'boards', icon: 'uno', count: 7, mark: null, tags: "microcontroller board" },
  { name: "Arduino Nano 33 BLE", drawer: 'A1', tab: 'boards', icon: 'nano', count: 0, mark: 'borrowed', tags: "microcontroller bluetooth" },
  { name: "Arduino Mega 2560", drawer: 'A1', tab: 'boards', icon: 'mega', count: 3, mark: null, tags: "microcontroller board" },
  { name: "Sensor shield", drawer: 'A1', tab: 'boards', icon: 'shield', count: 2, mark: null, tags: "" },
  // A2 · Raspberry Pi
  { name: "Raspberry Pi 4", drawer: 'A2', tab: 'boards', icon: 'pi4', count: 4, mark: null, tags: "computer linux" },
  { name: "Raspberry Pi Pico", drawer: 'A2', tab: 'boards', icon: 'pico', count: 8, mark: null, tags: "microcontroller rp2040" },
  { name: "Pi Camera Module 3", drawer: 'A2', tab: 'boards', icon: 'picam', count: 2, mark: 'issue', tags: "camera" },
  { name: "microSD card 32 GB", drawer: 'A2', tab: 'supplies', icon: 'sdcard', count: 10, mark: null, tags: "storage" },
  // A3 · ESP and Wi‑Fi boards
  { name: "ESP32 DevKit", drawer: 'A3', tab: 'boards', icon: 'esp32', count: 8, mark: null, tags: "wifi bluetooth microcontroller" },
  { name: "Adafruit Feather RP2040", drawer: 'A3', tab: 'boards', icon: 'feather', count: 4, mark: null, tags: "microcontroller" },
  { name: "BBC micro:bit", drawer: 'A3', tab: 'boards', icon: 'microbit', count: 6, mark: null, tags: "microbit microcontroller" },
  { name: "Teensy 4.0", drawer: 'A3', tab: 'boards', icon: 'teensy', count: 4, mark: null, tags: "microcontroller" },
  // A4 · LEDs and light
  { name: "LED strip, 1 m", drawer: 'A4', tab: 'parts', icon: 'ledstrip', count: 5, mark: 'issue', tags: "neopixel ws2812 addressable" },
  { name: "NeoPixel ring", drawer: 'A4', tab: 'parts', icon: 'ring', count: 0, mark: 'borrowed', tags: "led ws2812" },
  { name: "8×8 LED matrix", drawer: 'A4', tab: 'parts', icon: 'matrix', count: 4, mark: null, tags: "led display" },
  { name: "LED assortment", drawer: 'A4', tab: 'supplies', icon: 'ledbox', count: 1, mark: null, tags: "led" },
  { name: "OLED display 0.96\"", drawer: 'A4', tab: 'parts', icon: 'oled', count: 4, mark: null, tags: "screen display i2c" },
  { name: "Piezo buzzer", drawer: 'A4', tab: 'parts', icon: 'piezo', count: 10, mark: null, tags: "sound beep" },
  { name: "Mini speaker 8Ω", drawer: 'A4', tab: 'parts', icon: 'speaker', count: 4, mark: null, tags: "sound audio" },
  // B1 · Sensors
  { name: "Ultrasonic sensor", drawer: 'B1', tab: 'parts', icon: 'ultrasonic', count: 8, mark: null, tags: "hc-sr04 distance" },
  { name: "Touch board MPR121", drawer: 'B1', tab: 'parts', icon: 'touch', count: 3, mark: null, tags: "capacitive touch sensor" },
  { name: "Flex sensor", drawer: 'B1', tab: 'parts', icon: 'flex', count: 6, mark: null, tags: "bend" },
  { name: "PIR motion sensor", drawer: 'B1', tab: 'parts', icon: 'pir', count: 5, mark: null, tags: "motion" },
  { name: "IMU MPU6050", drawer: 'B1', tab: 'parts', icon: 'imu', count: 6, mark: null, tags: "accelerometer gyro sensor" },
  { name: "Potentiometer 10k", drawer: 'B1', tab: 'parts', icon: 'pot', count: 14, mark: null, tags: "knob dial input" },
  { name: "Tactile buttons", drawer: 'B1', tab: 'supplies', icon: 'buttons', count: 40, mark: null, tags: "push switch input" },
  { name: "Joystick module", drawer: 'B1', tab: 'parts', icon: 'joystick', count: 4, mark: 'issue', tags: "thumbstick input" },
  { name: "Light sensor (LDR)", drawer: 'B1', tab: 'parts', icon: 'ldr', count: 12, mark: null, tags: "photoresistor light" },
  { name: "4×4 keypad", drawer: 'B1', tab: 'parts', icon: 'keypad', count: 0, mark: 'borrowed', tags: "buttons input" },
  // B2 · Motors and servos
  { name: "SG90 micro servo", drawer: 'B2', tab: 'parts', icon: 'sg90', count: 11, mark: null, tags: "motor servo" },
  { name: "MG996R servo", drawer: 'B2', tab: 'parts', icon: 'mg996', count: 4, mark: null, tags: "motor servo" },
  { name: "Stepper motor", drawer: 'B2', tab: 'parts', icon: 'stepper', count: 4, mark: null, tags: "nema motor" },
  { name: "DC gear motor", drawer: 'B2', tab: 'parts', icon: 'gearmotor', count: 8, mark: null, tags: "motor" },
  { name: "Servo driver PCA9685", drawer: 'B2', tab: 'parts', icon: 'servodriver', count: 3, mark: null, tags: "pwm motor" },
  // B3 · Pneumatics
  { name: "Mini air pump", drawer: 'B3', tab: 'parts', icon: 'pump', count: 3, mark: null, tags: "air soft robotics" },
  { name: "Solenoid valve", drawer: 'B3', tab: 'parts', icon: 'valve', count: 6, mark: null, tags: "air" },
  { name: "Air pressure sensor", drawer: 'B3', tab: 'parts', icon: 'pressure', count: 3, mark: null, tags: "sensor" },
  { name: "Silicone tubing", drawer: 'B3', tab: 'supplies', icon: 'tubing', count: 2, mark: 'low', tags: "air hose" },
  // B4 · Wires and connectors
  { name: "Jumper wire kit", drawer: 'B4', tab: 'parts', icon: 'wires', count: 8, mark: 'issue', tags: "dupont cables" },
  { name: "Crimp tool", drawer: 'B4', tab: 'parts', icon: 'crimp', count: 0, mark: 'borrowed', tags: "dupont jst" },
  { name: "JST connector set", drawer: 'B4', tab: 'supplies', icon: 'connbox', count: 1, mark: null, tags: "connectors" },
  { name: "Alligator clip leads", drawer: 'B4', tab: 'supplies', icon: 'clips', count: 20, mark: null, tags: "crocodile" },
  { name: "Breadboard", drawer: 'B4', tab: 'parts', icon: 'breadboard', count: 16, mark: null, tags: "prototyping" },
  { name: "Hook-up wire spool", drawer: 'B4', tab: 'supplies', icon: 'wirespool', count: 5, mark: null, tags: "cable 22awg" },
  { name: "Heat-shrink tubing", drawer: 'B4', tab: 'supplies', icon: 'heatshrink', count: 1, mark: 'low', tags: "insulation" },
  // C1 · Power
  { name: "9 V batteries", drawer: 'C1', tab: 'supplies', icon: 'battery9v', count: 6, mark: 'low', tags: "battery" },
  { name: "LiPo battery", drawer: 'C1', tab: 'parts', icon: 'lipo', count: 6, mark: null, tags: "battery 3.7v" },
  { name: "Buck converter", drawer: 'C1', tab: 'parts', icon: 'buck', count: 8, mark: null, tags: "voltage regulator" },
  { name: "Bench power supply", drawer: 'C1', tab: 'parts', icon: 'psu', count: 2, mark: null, tags: "psu" },
  { name: "Relay module", drawer: 'C1', tab: 'parts', icon: 'relay', count: 6, mark: null, tags: "switch power" },
  // C2 · Soldering
  { name: "Soldering station", drawer: 'C2', tab: 'tools', icon: 'solderstation', count: 3, mark: 'issue', tags: "iron" },
  { name: "Desoldering pump", drawer: 'C2', tab: 'tools', icon: 'desolder', count: 3, mark: null, tags: "solder sucker" },
  { name: "Helping hands", drawer: 'C2', tab: 'tools', icon: 'helping', count: 4, mark: null, tags: "magnifier" },
  { name: "Solder wire", drawer: 'C2', tab: 'supplies', icon: 'solderreel', count: 2, mark: 'low', tags: "solder" },
  // C3 · Hand tools
  { name: "Hot glue gun", drawer: 'C3', tab: 'tools', icon: 'gluegun', count: 2, mark: null, tags: "glue" },
  { name: "Dremel", drawer: 'C3', tab: 'tools', icon: 'dremel', count: 0, mark: 'borrowed', tags: "rotary tool" },
  { name: "Wire strippers", drawer: 'C3', tab: 'tools', icon: 'strippers', count: 4, mark: null, tags: "" },
  { name: "Screwdriver set", drawer: 'C3', tab: 'tools', icon: 'screwset', count: 3, mark: null, tags: "precision" },
  // C4 · Measuring
  { name: "Multimeter", drawer: 'C4', tab: 'tools', icon: 'multimeter', count: 3, mark: null, tags: "meter voltage" },
  { name: "Digital calipers", drawer: 'C4', tab: 'tools', icon: 'calipers', count: 2, mark: null, tags: "" },
  { name: "Tape measure", drawer: 'C4', tab: 'tools', icon: 'tape', count: 3, mark: null, tags: "" },
  // D1 · E‑textiles
  { name: "Conductive thread", drawer: 'D1', tab: 'supplies', icon: 'thread', count: 3, mark: 'low', tags: "sewing" },
  { name: "Velostat sheet", drawer: 'D1', tab: 'supplies', icon: 'velostat', count: 5, mark: null, tags: "pressure" },
  { name: "Sewable LEDs", drawer: 'D1', tab: 'supplies', icon: 'sewleds', count: 30, mark: null, tags: "led" },
  { name: "LilyPad Arduino", drawer: 'D1', tab: 'parts', icon: 'lilypad', count: 4, mark: null, tags: "wearable" },
  // D2 · Screws and bits
  { name: "M3 screw kit", drawer: 'D2', tab: 'supplies', icon: 'screwbox', count: 1, mark: null, tags: "bolts nuts" },
  { name: "Heat‑set inserts", drawer: 'D2', tab: 'supplies', icon: 'inserts', count: 40, mark: 'low', tags: "threaded" },
  { name: "Zip ties", drawer: 'D2', tab: 'supplies', icon: 'zipties', count: 200, mark: null, tags: "cable ties" },
  // D3 · Sheets and filament
  { name: "PLA filament", drawer: 'D3', tab: 'supplies', icon: 'filament', count: 9, mark: null, tags: "3d printing" },
  { name: "Plywood 3 mm", drawer: 'D3', tab: 'supplies', icon: 'plywood', count: 14, mark: null, tags: "laser wood" },
  { name: "Clear acrylic 3 mm", drawer: 'D3', tab: 'supplies', icon: 'acrylic', count: 3, mark: 'low', tags: "laser plexi" },
  { name: "Foam board A3", drawer: 'D3', tab: 'supplies', icon: 'foam', count: 10, mark: null, tags: "" },
];
