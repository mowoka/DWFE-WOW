import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  isLoading: true,
  user: {
    email: "",
    fullName: "",
    role: "",
    profileImage: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        user: {
          email: action.payload.email,
          fullName: action.payload.fullName,
          role: action.payload.role,
          profileImage: action.payload.profile.profileImage,
        },
      };
    case "USER_LOADED":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        user: {
          email: action.payload.email,
          fullName: action.payload.fullName,
          role: action.payload.role,
          profileImage: action.payload.profile.profileImage,
        },
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        user: {
          ...state.user,
          email: action.payload.user.email,
          fullName: action.payload.user.fullName,
          role: action.payload.user.role,
          profileImage: action.payload.profileImage,
        },
      };
    case "ADD_TOKEN":
      localStorage.setItem("token", action.payload.token);
      return { ...state };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        user: {
          email: "",
          fullName: "",
          role: "",
          profileImage: "",
        },
      };
    default:
      throw new Error();
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
