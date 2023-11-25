import { Context, createContext, useContext, useReducer } from 'react';

interface IState {
  //
}

const defaultState: IState = {
  user: undefined,
};

type Action = { type: 'DEFAULT'; payload: null };

const reducer = (state: IState = defaultState, action: Action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};

const DispatchContext: Context<any> = createContext(defaultState);
const StoreContext: Context<any> = createContext(defaultState);

export const StoreProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, defaultState as never);

  return <StoreContext.Provider value={{ state, dispatch }}>{props.children}</StoreContext.Provider>;
};

export const useDispatch = () => useContext(DispatchContext);
export const useStore = () => useContext(StoreContext);
