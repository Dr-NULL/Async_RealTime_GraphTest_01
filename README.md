# Async RealTime GraphTest

A real time graph of "Arduino serial port" output. This Project use:
* An Arduino UNO.
* Arduino IDE.
* Typescript.
* Node.js (Backend).
* HTML + CSS + JS (Frontend).

## Before for All
* Load the arduino serial Script on your Arduino UNO.
* Open the file "backend/src/main.ts" and configure your Arduino port in line 9 (```let Arduino = new Driver("COM3", 9600)```)

## How to use:
Prepare the Backend folder:
* ```cd backend```
* ```npm update```

Prepare the Frontend folder:
* ```cd frontend```
* ```npm update```

Last, execute the project:
* ```cd backend```
* ```tsc```
* ```npm start```

And finally, open [http://localhost/main.html](http://localhost/main.html).
