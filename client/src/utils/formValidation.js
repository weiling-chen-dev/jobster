export const isRequired = (value) => {
  return value === "" ? false : true;
};

export const isBetween = (length, min, max) => {
  return length < min || length > max ? false : true;
};

export const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

export const showError = (target, message) => {
  console.log(`ERROR! ${target}:${message}`);
  return { valid: false, message: message, target: target };
};
export const showSuccess = (target) => {
  console.log(`Success! ${target}:valid`);
  return { valid: true, target: target };
};

// Validate the username field

export const checkUsername = (name) => {
  const min = 3;
  const max = 25;
  const username = name.trim();
  if (!isRequired(username)) {
    return showError("name", "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    return showError(
      "name",
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    return showSuccess("name");
  }
};
//Validate the email field

export const checkEmail = (email) => {
  const trimEmail = email.trim();

  if (!isRequired(trimEmail)) {
    return showError("email", "Email cannot be blank.");
  } else if (!isEmailValid(trimEmail)) {
    return showError("email", "Email is not valid.");
  } else {
    return showSuccess("email");
  }
};

//Validate password field

export const checkPassword = (password) => {
  let valid = false;

  const trimPassword = password.trim();

  if (!isRequired(trimPassword)) {
    return showError("password", "Password cannot be blank.");
  } else if (!isPasswordSecure(trimPassword)) {
    return showError(
      "password",
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    return showSuccess("password");
  }
};
