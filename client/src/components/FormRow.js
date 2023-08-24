import { styled } from "styled-components";

const FormRow = ({
  name,
  type,
  value,
  onChange,
  valid,
  message,
  labelText,
}) => {
  return (
    <Wrapper className="form-row ">
      <label htmlFor={name} className="form-label">
        {labelText ? labelText : name}
      </label>
      <input
        id={name}
        className={valid ? "form-input" : "form-input error"}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {valid || <small>{message}</small>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .error {
    border: #ff0000 1px solid;
  }
  small {
    color: #ff0000;
  }
`;
export default FormRow;
