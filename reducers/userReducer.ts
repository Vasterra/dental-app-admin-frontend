import { ActionMap, Maybe } from './types';

export enum UserTypes {
  RESET = 'RESET_USER',
  LOGIN = 'USER_LOGIN',
  LOGOUT = 'USER_LOGOUT',
}

// USER_DATA_LAKE
export type userPayload = {
  [UserTypes.RESET]: undefined;
  [UserTypes.LOGOUT]: undefined;
  [UserTypes.LOGIN]: TUserReducerState;
};

interface Service {
  service_name: string;
  service_id: string;
}

export type TUserReducerState = {
  isLogged: boolean;
  adminDetails: {
    username: string;
    email: string;
    avatar_url: string;
  };
  services: Service[];
  subscriberSettings: {
    freeIsVerified: boolean;
    setting_code: string | 'sys_settings';
    freeHasPhoneNumber: boolean;
    paidHasWebsite: boolean;
    paidMaxServices: number;
    paidMaxLocations: number;
    paidIsVerified: boolean;
    freeHasWebsite: boolean;
    freeMaxLocations: number;
    paidHasPhoneNumber: boolean;
    freeMaxServices: number;
  };
  premiumInformation: {
    terms: string;
    setting_code: string | 'premium_settings';
    features: string[];
    price: number;
  };
};

export type UserActions = ActionMap<userPayload>[keyof ActionMap<userPayload>];

export const UserInitialState: TUserReducerState = {
  adminDetails: {
    avatar_url: '',
    email: '',
    username: '',
  },
  isLogged: false,
  services: [],
  subscriberSettings: {
    freeHasPhoneNumber: false,
    freeHasWebsite: false,
    freeIsVerified: false,
    freeMaxLocations: 0,
    freeMaxServices: 0,
    paidHasPhoneNumber: false,
    paidHasWebsite: false,
    paidIsVerified: false,
    paidMaxLocations: 0,
    paidMaxServices: 0,
    setting_code: '',
  },
  premiumInformation: {
    features: [],
    price: 0,
    setting_code: '',
    terms: '',
  },
};

export const userReducer = (
  state: TUserReducerState,
  action: UserActions
): TUserReducerState => {
  switch (action.type) {
    case UserTypes.RESET:
      return { ...UserInitialState };
    case UserTypes.LOGIN:
      return { ...state, ...action.payload };
    case UserTypes.LOGOUT:
      return { ...UserInitialState };
    default:
      return state;
  }
};
