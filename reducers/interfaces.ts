export interface IService {
  service_name: string
  service_id: string
}

export interface IMonthStats {
  amountOfNewAccounts: number
  amountOfSubscriptions: number
  amountOfClosedAccounts: number
  amountOfClosedSubscriptions: number
  amountOfImages: number
}

export interface IGraphicData {
  period: number
  count: number
}

export interface IYearStats {
  amountOfNewAccounts: number
  amountOfSubscriptions: number
  amountOfClosedAccounts: number
  amountOfClosedSubscriptions: number
  amountOfImages: number
  graphicOfFreeAccounts: IGraphicData[]
  graphicOfSubscriptions: IGraphicData[]
}

export interface ISubSettings {
  freeHasPhoneNumber: boolean
  freeHasWebsite: boolean
  freeIsVerified: boolean
  freeMaxLocations: number
  freeMaxServices: number
  paidHasPhoneNumber: boolean
  paidHasWebsite: boolean
  paidIsVerified: boolean
  paidMaxLocations: number
  paidMaxServices: number
  setting_code: string
}

export interface IUser {
  website: string | null,
  subscription_id: string | null,
  gdc_number: string,
  profileBio: string | null,
  email: string,
  accountType: string,
  qualifications: string | null,
  username: string,
  exp: string | null,
  phone: string | null,
  auth_time: string | null,
  title: string | null,
  created_at: Date,
  isSuspended?: boolean
}
