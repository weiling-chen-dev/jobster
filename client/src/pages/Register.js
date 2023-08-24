import { useState } from "react";
import { styled } from "styled-components";
import { FormRow } from "../components";
import { Navigate } from "react-router-dom";

import {
  checkUsername,
  checkEmail,
  checkPassword,
} from "../utils/formValidation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/UserSlice";

const initialState = {
  name: { value: "", valid: true, message: "", target: "name" },
  email: { value: "", valid: true, message: "", target: "email" },
  password: { value: "", valid: true, message: "", target: "password" },
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store) => store.user);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "name") {
      setValues({ ...values, [name]: { value, ...checkUsername(value) } });
      console.log(`name:${name} value:${value}`);
    } else if (name === "email") {
      setValues({ ...values, [name]: { value, ...checkEmail(value) } });
    } else {
      setValues({ ...values, [name]: { value, ...checkPassword(value) } });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (values.isMember) {
      if (!values.email.value || !values.password.value) {
        setValues({
          ...values,
          email: { value: "", ...checkPassword("") },
          password: { ...values.password, ...checkPassword("") },
        });
      }
    } else {
      if (!values.email.value || !values.password.value || !values.name.value) {
        setValues({
          ...values,
          email: { value: "", ...checkEmail("") },
          password: { ...values.password, ...checkPassword("") },
          name: { ...values.name, ...checkUsername("") },
        });
      }
    }

    let isUsernameValid =
        values.isMember || checkUsername(values.name.value).valid,
      isEmailValid = checkEmail(values.email.value).valid,
      isPasswordValid =
        values.isMember || checkPassword(values.password.value).valid;

    let isFormValid = isUsernameValid && isEmailValid && isPasswordValid;

    if (isFormValid) {
      console.log("form submitted");

      if (values.isMember) {
        dispatch(
          loginUser({
            email: values.email.value,
            password: values.password.value,
          })
        );
      } else {
        dispatch(
          registerUser({
            name: values.name.value,
            email: values.email.value,
            password: values.password.value,
          })
        );
      }

      // submit to the server if the form is valid
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        {values.isMember ? (
          <>
            <h3>Login</h3>
            <FormRow
              name="email"
              type="email"
              value={values.email.value}
              onChange={handleChange}
              valid={values.email.valid}
              message={values.email.message}
            />
            <FormRow
              name="password"
              type="password"
              value={values.password.value}
              onChange={handleChange}
              valid={values.isMember || values.password.valid}
              message={values.isMember ? "" : values.password.message}
            />
            <p>
              not a member yet?{" "}
              <button
                type="button"
                onClick={toggleMember}
                className="member-btn"
              >
                register
              </button>
            </p>
          </>
        ) : (
          <>
            <h3>register</h3>
            <FormRow
              name="name"
              type="text"
              value={values.name.value}
              onChange={handleChange}
              valid={values.name.valid}
              message={values.name.message}
            />
            <FormRow
              name="email"
              type="email"
              value={values.email.value}
              onChange={handleChange}
              valid={values.email.valid}
              message={values.email.message}
            />
            <FormRow
              name="password"
              type="password"
              value={values.password.value}
              onChange={handleChange}
              valid={values.password.valid}
              message={values.password.message}
            />
            <p>
              Already a member?
              <button
                type="button"
                onClick={toggleMember}
                className="member-btn"
              >
                login
              </button>
            </p>
          </>
        )}

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() =>
            dispatch(
              loginUser({
                email: "testUser@test.com",
                password: "Pass1234****",
              })
            )
          }
        >
          {isLoading ? "loading..." : "Demo"}
        </button>
      </form>
      {/* should i use useEffect? */}
      {user && <Navigate to="/" replace={true} />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
    text-transform: capitalize;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background-color: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
  }
`;

export default Register;
