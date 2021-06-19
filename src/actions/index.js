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

export const grabUserInfo = () => {
  fetch("192.168.1.13:3000/").then((data) => {
    console.log(data);
  });
};
