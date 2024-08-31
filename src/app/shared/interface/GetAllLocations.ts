export interface Root {
    locations: Locations[]
    appointmentTypes: AppointmentType[]
    results: Results
    hearAboutUsList: any
    providers: any
  }
  
  export interface Locations {
    rsaC_LOCATION_ID: number
    rsaC_LOCATION_SRC_ID: number
    rsaC_LOCATION_NME: string
    rsaC_ADDRESS_LINE_1: string
    rsaC_ADDRESS_LINE_2?: string
    rsaC_ADDRESS_CITY: string
    rsaC_ADDRESS_STATE: string
    rsaC_ADDRESS_ZIP: string
    rsaC_CLIENT_ID: number
    rsaC_LOCATION_ENABLED: boolean
  }
  
  export interface AppointmentType {
    appointmentTypeSrcID: number
    appointmentTypeDesc: string
  }
  
  export interface Results {
    status: number
    message: any
    validation: any
  }