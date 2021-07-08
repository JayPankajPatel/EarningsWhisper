import { ActionSheetIOS } from "react-native";

export const initialLoginState = {
  users: [],
  searchedStocks: [],
  daily: [],
  weekly: [],
  monthly: [],
  stocks: [],
  grade: null,
  searchTerm: null,
  isLoading: true,
  user_id: null,
  fname: null,
  lname: null,
  birthdate: null,
  phone: null,
  address: null,
  city: null,
  _state: null,
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
  ewallet: null,
  ewalletBal: null,
  cardNum: null,
  cardCSV: null,
  cardExp: null,
};

export default (prevState = initialLoginState, action) => {
  switch (action.type) {
    case "LOAD_USERS":
      return {
        ...prevState,
        users: action.payload,
      };
    case "LOADUSER": {
      return {
        ...prevState,
        fname: action.fname,
        lname: action.lname,
        birthdate: action.birthdate,
        phone: action.phone,
        address: action.address,
        city: action.city,
        _state: action.state,
        zipcode: action.zipcode,
        country: action.country,
        username: action.username,
        email: action.email,
        ewallet: action.ewallet,
      };
    }
    case "LOAD_CARD":
      return {
        ...prevState,
        cardNum: action.cardNum,
        cardCSV: action.cardCSV,
        cardExp: action.cardExp,
        fname: action.fname,
        lname: action.lname,
      };
    case "WALLET_BAL":
      return {
        ...prevState,
        ewalletBal: action.ewalletBal,
      };
    case "LOAD_STOCKS":
      return {
        ...prevState,
        [action.payload.prop]: action.payload.value,
      };

    case "LOAD_DAILY":
      return {
        ...prevState,
        daily: action.payload,
      };
    case "LOAD_WEEKLY":
      return {
        ...prevState,
        weekly: action.payload,
      };
    case "LOAD_MONTHLY":
      return {
        ...prevState,
        monthly: action.payload,
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
    case "GRADE":
      return {
        ...prevState,
        grade: action.payload,
      };
    case "UNLOAD":
      return {
        ...prevState,
        stocks: action.payload,
        grade: action.grade,
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
