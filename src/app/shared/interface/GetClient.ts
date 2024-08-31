export interface GetClient {
    rsaC_LOGIN_RESPONSE: RsaCLoginResponse
    results: Results
  }
  
  export interface RsaCLoginResponse {
    accesstoken: string
    clientid: number
    rsaC_API_CLIENT_KEY: string
    pageTitle: string
  }
  
  export interface Results {
    status: number
    message: any
    validation: any
  }
  