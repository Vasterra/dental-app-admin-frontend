import React, { createContext, useReducer, Dispatch } from 'react';
import { userReducer, UserActions, UserInitialState } from '../reducers';

type InitialStateType = {
  userState: typeof UserInitialState;
};

const initialState: InitialStateType = {
  userState: UserInitialState,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<UserActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ userState }: InitialStateType, action: UserActions) => ({
  userState: userReducer(userState, action as UserActions),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<
    React.Reducer<InitialStateType, UserActions>
  >(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
