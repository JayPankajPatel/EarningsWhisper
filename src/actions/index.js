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
    fetch("http://earningswhisper.zapto.org:3000/userinfo")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "LOAD_USERS", payload: data });
      })
      .catch((error) => console.log(error));
  };
};

export const createNewSignUp = ({
  fname,
  lname,
  birthdate,
  email,
  phone,
  address,
  zipcode,
  city,
  _state,
  country,
  username,
  password,
  question,
  answer,
}) => {
  return (dispatch) => {
    fetch("http://earningswhisper.zapto.org:3000/signup", {
      method: "POST",
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        birthdate: birthdate,
        email: email,
        phone: phone,
        address: address,
        zipcode: zipcode,
        city: city,
        _state: _state,
        country: country,
        username: username,
        password: password,
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
      })
      .catch((error) => console.log(error));
  };
};

export const loadDailyStock = (stock) => {
  return (dispatch) => {
    fetch(`http://earningswhisper.zapto.org:3000/dailystock`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        earning = data["time"];
        dispatch({ type: "LOAD_DAILY", payload: earning });
      })
      .catch((error) => console.log(error));
  };
};
export const loadWeeklyStock = () => {
  return (dispatch) => {
    fetch(`http://earningswhisper.zapto.org:3000/weeklystock`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        earning = data[0]["time"];
        dispatch({ type: "LOAD_WEEKLY", payload: earning });
      })
      .catch((error) => console.log(error));
  };
};
export const loadMonthlyStock = (stock) => {
  return (dispatch) => {
    fetch(`http://earningswhisper.zapto.org:3000/monthlystock`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        earning = data;
        dispatch({ type: "LOAD_MONTHLY", payload: earning });
      })
      .catch((error) => console.log(error));
  };
};

export const stockDetail = (stocksymbol) => {
  return (dispatch) => {
    fetch(`http://earningswhisper.zapto.org:3000/stockinfo`, {
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
      })
      .catch((error) => console.log(error));
  };
};

export const stockGrade = (stocksymbol) => {
  return (dispatch) => {
    fetch(`http://earningswhisper.zapto.org:3000/grade`, {
      method: "POST",
      body: JSON.stringify({
        stocksymbol: stocksymbol,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "GRADE", payload: data.grade });
      })
      .catch((error) => console.log(error));
  };
};

export const unLoadStock = () => {
  return (dispatch) => {
    dispatch({ type: "UNLOAD", payload: [], grade: null });
  };
};

export const searchStock = (stocksymbol) => {
  return (dispatch) => {
    fetch(`http://earningswhisper.zapto.org:3000/search`, {
      method: "POST",
      body: JSON.stringify({
        search: stocksymbol,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SEARCH", payload: data });
      })
      .catch((error) => console.log(error));
  };
};

export const loaduser = (user) => {
  return {
    type: "LOADUSER",
    fname: user.fname,
    lname: user.lname,
    birthdate: user.birthdate,
    email: user.email,
    phone: user.phone,
    address: user.address,
    zipcode: user.zipcode,
    city: user.city,
    state: user.state,
    country: user.country,
    username: user.username,
    email: user.email,
    ewallet: user.ewallet_id,
  };
};

export const grabuserinfo = (ewallet) => {
  return () => {
    fetch(`http://earningswhisper.zapto.org:3000/user`, {
      method: "POST",
      body: JSON.stringify({
        ewallet: ewallet,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => loaduser(data.user[0]))
      .catch((error) => console.log(error));
  };
};

export const getWalBal = (ewallet) => {
  return (dispatch) => {
    fetch("http://earningswhisper.zapto.org:3000/getWalletBal", {
      method: "POST",
      body: JSON.stringify({
        ewallet: ewallet,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "WALLET_BAL", ewalletBal: data }))
      .catch((error) => console.log(error));
  };
};

export const TransferMoney = (wallet, money, email, desc) => {
  return (dispatch) => {
    fetch("http://earningswhisper.zapto.org:3000/transfer", {
      method: "POST",
      body: JSON.stringify({
        amount: money,
        source_ewallet: wallet,
        dest: email,
        desc: desc,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };
};

export const loadCard = (wallet) => {
  return (dispatch) => {
    fetch("http://earningswhisper.zapto.org:3000/loadCard", {
      method: "POST",
      body: JSON.stringify({
        ewallet: wallet,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: "LOAD_CARD",
          cardNum: data.card_number,
          cardCSV: data.cvv,
          cardExp: `${data.expiration_month}/${data.expiration_year}`,
          fname: data["ewallet_contact"]["first_name"],
          lname: data["ewallet_contact"]["last_name"],
        })
      )
      .catch((error) => console.log(error));
  };
};
