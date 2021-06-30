export const initialLoginState = {
  users: [],
  searchedStocks: [],
  calendar: {
    daily: [],
    weekly: [],
    monthly: [],
  },
  stocks: [],
  searchTerm: null,
  isLoading: true,
  user_id: null,
  fname: null,
  lname: null,
  birthdate: null,
  phone: null,
  address: null,
  city: null,
  state: null,
  zipcode: null,
  country: null,
  username: null,
  password: null,
  confirmPassword: null,
  email: null,
  question: null,
  answer: null,
  userToken: null,
  isValidUser: true,
  isValidPassword: true,
};

export default (prevState = initialLoginState, action) => {
  switch (action.type) {
    case "LOAD_USERS":
      return {
        ...prevState,
        users: action.payload,
      };
    case "LOAD_STOCKS":
      return {
        ...prevState,
        calendar: {
          [action.payload.prop]: action.payload.value,
        },
      };

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
    case "FORM_UPDATE":
      return {
        ...prevState,
        [action.payload.prop]: action.payload.value,
      };
    case "STOCK":
      return {
        ...prevState,
        stocks: action.payload,
      };
    case "UNLOAD":
      return {
        ...prevState,
        stocks: action.payload,
      };
    case "SEARCH":
      return {
        ...prevState,
        searchedStocks: action.payload,
      };
    case "STOCK_RESET":
      return {
        ...prevState,
        stocks: [],
      };
    default:
      return {
        ...prevState,
      };
  }
};
