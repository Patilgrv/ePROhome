export interface Root {
    inquiryDetail: InquiryDetail
    results: Results
  }
  
  export interface InquiryDetail {
    inquiry: Inquiry
    client: Client
    validate: Validate
    slot: Slot
    location: Location
    practitioner: Practitioner
    demographic: Demographic
    waitlist: Waitlist
    payment: Payment
    otp: Otp
    finish: any
  }
  
  export interface Inquiry {
    inquiryId: number
    inquiryToken: string
    createdDt: string
    lastUpdatedDtDt: string
  }
  
  export interface Client {
    clientId: number
    clientName: string
    clientPhone: string
    clientEmail: string
    termsOfServiceURL: string
  }
  
  export interface Validate {
    isComplete: boolean
    append1Edit2: number
    hasPatientCommitted: boolean
    hasAppointmentCommitted: boolean
    hasVerifiedMobileNo: boolean
    hasSlot: boolean
    hasApptType: boolean
    hasProvider: boolean
    hasLocation: boolean
    hasCompleteDemographic: boolean
    hasCancelled: boolean
    patientDupesCnt: number
    mobileNumberCnt: number
    emailCnt: number
    allowCommit: boolean
    warning: string
    publicMessage: string
    useRequestForm: boolean
    allowFormSubmit: boolean
  }
  
  export interface Slot {
    appointmentSrcId: number
    appointmentId: number
    appointmentStatus: string
    slotId: string
    appointmentTypeSrcId: number
    appointmentTypeDesc: string
    description: string
    appointmentStart: string
    appointmentEnd: string
    appointmentStartLocal: string
    appointmentDuration: number
  }
  
  export interface Location {
    locationSrcId: number
    locationDesc: string
    locationAddress: string
  }
  
  export interface Practitioner {
    srcProviderId: number
    providerName: string
  }
  
  export interface Demographic {
    patId: number
    srcPatId: number
    firstName: any
    middleName: any
    familyName: any
    email: any
    mobilePhone: any
    birthDate: string
    hduhaU_ShowNo0_ShowYes1_ShowAndRequire2: number
    hduhaU_Selected_ID: number
    gender: string
    notes: string
    showZipCode: boolean
    zipCode: string
    smsOptIn: boolean
  }
  
  export interface Waitlist {
    allowWaitlist: boolean
    addToWaitList: boolean
    waitListFromDate: string
    waitListToDate: string
  }
  
  export interface Payment {
    paymentRequired: boolean
    paymentAmount: number
    paymentAccepted: boolean
    paymentExplanation: string
    paymentService: string
    braintree: Braintree
    modMedPay: ModMedPay
    authorizeDotNet: AuthorizeDotNet
    heartland: Heartland
  }
  
  export interface Braintree {
    paymentPublicKey: string
    paymentSecretKey: string
    paymentMerchantId: string
    accountType: string
  }
  
  export interface ModMedPay {
    mmpAuthDomain: string
    mmpApiDomain: string
    mmpClientID: string
    mmpSecret: string
    mmpBusinessUnitID: string
    mmpLocationID: string
    mmpSuccessReturnURL: any
    mmpCancelReturnURL: any
    mmpUserSrcID: string
    mmpUserSrcNme: string
  }
  
  export interface AuthorizeDotNet {
    loginID: string
    transactionKey: string
  }
  
  export interface Heartland {
    paymentMerchantID: string
    paymentPublicKey: string
    paymentSecretKey: string
    accountType: any
  }
  
  export interface Otp {
    otpRequired: boolean
    lastSentDt: string
    otpValidated: boolean
    otpMobileNumber: any
    otpCode: number
    otpSent: boolean
    smsStatus: any
  }
  
  export interface Results {
    status: number
    message: any
    validation: any
  }
  