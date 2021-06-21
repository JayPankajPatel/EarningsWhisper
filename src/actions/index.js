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
      fetch("http://192.168.1.13:3000/")
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
