import React, { useReducer } from "react";
import { StoreContext } from "../store/";
import { userReducer, initialState as userInitialState } from "../reducer/user";
import { formReducer, initialState as formInitialState } from "../reducer/form";
import {
  postReducer,
  initialState as postInitialState
} from "../reducer/posts";
import {
  friendReducer,
  initialState as friendInitialState
} from "../reducer/friend";

const Store = props => {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);
  const [formState, formDispatch] = useReducer(formReducer, formInitialState);
  const [postState, postDispatch] = useReducer(postReducer, postInitialState);
  const [friendState, friendDispatch] = useReducer(
    friendReducer,
    friendInitialState
  );

  const combinerReducer = {
    store: {
      ...userState,
      ...formState,
      ...postState,
      ...friendState
    },
    dispatch: action => {
      userDispatch(action);
      formDispatch(action);
      postDispatch(action);
      friendDispatch(action);
    }
  };

  return (
    <StoreContext.Provider value={combinerReducer}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default Store;
