export const handleUserChange = (val) => {
  var validUser = false;
  if (val.trim().length >= 4) {
    validUser = true;
  }
  return {
    type: "USER_VALIDATION",
    payload: val,
    valid: validUser,
  };
};

export const formUpdate = ({ prop, value }) => {
  return {
    type: "FORM_UPDATE",
    payload: { prop, value },
  };
};

export const handlePasswordChange = (val) => {
  var validPassword = false;
  if (val.trim().length >= 8) {
    validPassword = true;
  }
  return {
    type: "PASSWORD_VALIDATION",
    payload: val,
    valid: validPassword,
  };
};

export const loadUsers = () => {
  return (dispatch) => {
    try {
      fetch("http://192.168.1.13:3000/userinfo")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch({ type: "LOAD_USERS", payload: data });
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createNewSignUp = ({
  username,
  password,
  email,
  birthdate,
  question,
  answer,
}) => {
  return (dispatch) => {
    fetch("http://192.168.1.13:3000/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        birthdate: birthdate,
        question: question,
        answer: answer,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .then(() => {
        dispatch({ type: "SIGNUP" });
      });
  };
};

export const loadStock = (stock) => {
  return (dispatch) => {
    try {
      fetch(`http://192.168.1.13:3000/${stock}stock`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch({ type: "LOAD_STOCKS", payload: { stock, data } });
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const stockDetail = (stocksymbol) => {
  //console.log(stocksymbol);
  return (dispatch) => {
    fetch(`http://192.168.1.13:3000/stockinfo`, {
      method: "POST",
      body: JSON.stringify({
        stocksymbol: stocksymbol,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        dispatch({ type: "STOCK", payload: data });
      });
  };
};
export const unLoadStock = () => {
  //console.log(stocksymbol);
  return (dispatch) => {
    dispatch({ type: "UNLOAD", payload: [] });
  };
};

export const searchStock = (stocksymbol) => {
  //console.log(stocksymbol);
  return (dispatch) => {
    fetch(`http://192.168.1.13:3000/search`, {
      method: "POST",
      body: JSON.stringify({
        search: stocksymbol,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        dispatch({ type: "SEARCH", payload: data });
      });
  };
};
