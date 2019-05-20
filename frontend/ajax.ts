//Objeto Ajax
class Ajax {
  private _type: "get" | "post"
  public get type() {
    return this._type
  }

  private _url: string
  public get url() {
    return this._url
  }

  private _onSuccess: (data: any) => void
  public get onSuccess() {
    return this._onSuccess
  }
  public set onSuccess(value: (data: any) => void) {
    this._onSuccess = value
  }

  private _onError: (error: any) => void
  public get onError() {
    return this._onError
  }
  public set onError(value: (error: any) => void) {
    this._onError = value
  }

  private _core: XMLHttpRequest
  constructor(type: "get" | "post", url: string) {
    this._type = type
    this._url = url

    this._core = new XMLHttpRequest()
    this._core.onreadystatechange = () => {
      if ((this._core.readyState == 4) && (this._core.status == 200)) {
        if (this._onSuccess != null) {
          this._onSuccess(JSON.parse(this._core.response))
        }
      } else {
        if (this._onError != null) {
          this._onError(null)
        }
      }
    }
  }

  public send(req?: any) {
    this._core.open(this._type, this._url, true)
    this._core.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    this._core.setRequestHeader("Access-Control-Allow-Origin", "*")
    this._core.send(JSON.stringify(req))
  }
}
