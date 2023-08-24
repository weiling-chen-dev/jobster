import { useState } from "react";
import { FormRow } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/formValidation";
import { styled } from "styled-components";

import { updateUser } from "../../features/user/UserSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store) => store.user);
  const [userData, setUserData] = useState({
    name: { value: user?.name || "", valid: true },
    lastName: { value: user?.lastName || "", valid: true },
    location: { value: user?.location || "", valid: true },
    email: { value: user?.email || "", valid: true },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name) {
      setUserData({ ...userData, name: { ...name, valid: false } });
    }
    if (!email) {
      setUserData({ ...userData, email: { ...email, valid: false } });
    } else {
      setUserData({
        ...userData,
        email: {
          ...userData.email,
          valid: isEmailValid(email.value),
          message: isEmailValid(email.value)
            ? null
            : "please input valid email",
        },
      });
    }
    if (!lastName) {
      setUserData({ ...userData, lastName: { ...lastName, valid: false } });
    }
    if (!location) {
      setUserData({ ...userData, location: { ...location, valid: false } });
    }
    const formValidation =
      name.valid && email.valid && location.valid && lastName.valid;
    if (!formValidation) {
      toast.error("please input the value correctly");
      return;
    }
    dispatch(
      updateUser({
        name: name.value,
        email: email.value,
        lastName: lastName.value,
        location: location.value,
      })
    );
  };
  const handleChange = (e) => {
    if (!e.target.value) {
      setUserData({
        ...userData,
        [e.target.name]: { value: e.target.value, valid: false },
      });
    } else {
      if (e.target.name === "email") {
        setUserData({
          ...userData,
          email: {
            value: e.target.value,
            valid: isEmailValid(e.target.value),
            message: isEmailValid(e.target.value)
              ? null
              : "please input valid email",
          },
        });
      } else {
        setUserData({
          ...userData,
          [e.target.name]: { value: e.target.value, valid: true },
        });
      }
    }
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            className="form-row"
            name="name"
            type="text"
            value={userData.name.value}
            onChange={handleChange}
            valid={userData.name.valid}
            message="name can not be blank"
          />
          <FormRow
            className="form-row"
            name="lastName"
            type="text"
            value={userData.lastName.value}
            onChange={handleChange}
            valid={userData.lastName.valid}
            message="lastName can not be blank"
            labelText="last name"
          />
          <FormRow
            className="form-row"
            name="email"
            type="email"
            value={userData.email.value}
            onChange={handleChange}
            valid={userData.email.valid}
            message={
              userData.email.message
                ? userData.email.message
                : "email can not be blank"
            }
          />
          <FormRow
            className="form-row"
            name="location"
            type="text"
            value={userData.location.value}
            onChange={handleChange}
            valid={userData.location.valid}
            message="location can not be blank"
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "updating" : "save"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: var(--white);
  width: 100%;
  border-radius: var(--borderRadius);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin-top: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: flex-start;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Profile;
