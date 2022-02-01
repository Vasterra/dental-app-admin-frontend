import { ActionMap, Maybe } from './types';
import {IMonthStats, IService, ISubSettings, IYearStats, IUser} from './interfaces';

export enum UserTypes {
  RESET = 'RESET_USER',
  LOGIN = 'USER_LOGIN',
  LOGOUT = 'USER_LOGOUT',
  DELETE_SERVICE = 'DELETE_SERVICE',
  SET_SERVICES = 'SET_SERVICES',
  SET_SUBSCRIBER_SETTINGS = 'SET_SUBSCRIBER_SETTINGS',
  GET_MONTHLY_STATS = 'GET_MONTHLY_STATS',
  GET_YEAR_STATS = 'GET_YEAR_STATS',
  OPEN_LEFT_MENU = 'OPEN_LEFT_MENU',
}

// USER_DATA_LAKE
export type userPayload = {
  [UserTypes.RESET]: undefined;
  [UserTypes.LOGOUT]: undefined;
  [UserTypes.LOGIN]: TUserReducerState;
  [UserTypes.DELETE_SERVICE]: {
    id: string;
  };
  [UserTypes.SET_SERVICES]: IService[];
  [UserTypes.SET_SUBSCRIBER_SETTINGS]: ISubSettings;
  [UserTypes.GET_MONTHLY_STATS]: IMonthStats;
  [UserTypes.GET_YEAR_STATS]: IYearStats;
  [UserTypes.OPEN_LEFT_MENU]: boolean;
};

export type TUserReducerState = {
  isLogged: boolean;
  adminDetails: {
    username: string;
    email: string;
    avatar_url: string;
  };
  services: IService[];
  subscriberSettings: ISubSettings;
  premiumInformation: {
    terms: string;
    setting_code: string | 'premium_settings';
    features: string[];
    price: number;
  };
  monthlyStats: IMonthStats;
  yearStats: IYearStats;
  isOpenLeftMenu: boolean;
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
    freeMaxLocations: 1,
    freeMaxServices: 1,
    paidHasPhoneNumber: false,
    paidHasWebsite: false,
    paidIsVerified: false,
    paidMaxLocations: 1,
    paidMaxServices: 1,
    setting_code: '',
  },
  premiumInformation: {
    features: [],
    price: 0,
    setting_code: '',
    terms: '',
  },
  monthlyStats: {
    amountOfNewAccounts: 0,
    amountOfSubscriptions: 0,
    amountOfClosedAccounts: 0,
    amountOfClosedSubscriptions: 0,
    amountOfImages: 0,
  },
  yearStats: {
    amountOfNewAccounts: 0,
    amountOfSubscriptions: 0,
    amountOfClosedAccounts: 0,
    amountOfClosedSubscriptions: 0,
    amountOfImages: 0,
    graphicOfFreeAccounts: [],
    graphicOfSubscriptions: []
  },
  isOpenLeftMenu: true,
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
    case UserTypes.DELETE_SERVICE:
      const filterServices = state.services.filter(
        (item) => item.service_id !== action.payload.id
      );
      return { ...state, services: filterServices };
    case UserTypes.SET_SERVICES:
      return { ...state, services: action.payload };
    case UserTypes.SET_SUBSCRIBER_SETTINGS:
      return { ...state, subscriberSettings: { ...action.payload } };
    case UserTypes.GET_MONTHLY_STATS:
      return { ...state, monthlyStats: { ...action.payload } };
    case UserTypes.GET_YEAR_STATS:
      return { ...state, yearStats: { ...action.payload } };
    case UserTypes.OPEN_LEFT_MENU:
      return { ...state, isOpenLeftMenu: action.payload };
    default:
      return state;
  }
};
