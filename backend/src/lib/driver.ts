import SerialPort from "serialport";
import * as SerialPortCore from "serialport";
import Log from "/lib/log"

class Driver {
  private _port: string = 'COM3'
  public get port() {
    return this._port
  }

  private _baudRate: number = 9600
  public get baudRate() {
    return this._baudRate
  }

  private _isConnected: boolean
  public get isConnected() {
    return this._isConnected
  }

  private _outputString: string = null
  public get outputString(): string {
    return this._outputString
  }

  private _core: SerialPort
  private _lineStream: SerialPortCore.parsers.Readline

  constructor(port: string = 'COM3', baudRate: number = 9600) {
    this._port = port
    this._baudRate = baudRate
    this._core = new SerialPort(this._port, {
      baudRate: this._baudRate,
      autoOpen: false
    })

    this._isConnected = false
    this._core.open((err) => {
      if (err != null) {
        Log.writeLine("Se ha perdido comunicación con el Arduino.", 3)
        return
      }

      this._isConnected = true
      this._core.on("error", () => {
        Log.writeLine("Se ha perdido comunicación con el Arduino.", 3)
        this._isConnected = false
      })

      this._lineStream = this._core.pipe(new SerialPortCore.parsers.Readline({
        delimiter: "\n",
        encoding: "utf8"
      }))

      this._lineStream.on("data", (data: string) => {
        this._outputString = data
      })
    })
  }
}

export default Driver
