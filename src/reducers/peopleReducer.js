export const initialLoginState = {
  isLoading: true,
  username: "",
  password: "",
  userToken: null,
  isValidUser: true,
  isValidPassword: true,
};

export default (prevState = initialLoginState, action) => {
  switch (action.type) {
    case "RETRIEVE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "LOGIN":
      return {
        ...prevState,
        username: action.id,
        userToken: action.token,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...prevState,
        username: null,
        userToken: null,
        isLoading: false,
      };
    case "REGISTER":
      return {
        ...prevState,
        username: action.id,
        userToken: action.token,
        isLoading: false,
      };
    case "USER_VALIDATION":
      return {
        ...prevState,
        username: action.payload,
        isValidUser: action.valid,
      };
    case "PASSWORD_VALIDATION":
      return {
        ...prevState,
        password: action.payload,
        isValidPassword: action.valid,
      };
    default:
      return {
        ...prevState,
      };
  }
};
