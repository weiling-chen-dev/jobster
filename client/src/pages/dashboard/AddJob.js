import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import { FormRow, FormSelect } from "../../components";
import {
  handleChange,
  handleSelectChange,
  clear,
  createJob,
  editJob,
} from "../../features/job/JobSlice";
const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position.value || !company.value || !jobLocation.value) {
      toast.error("please fill out all the fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          id: editJobId,
          data: {
            position: position.value,
            company: company.value,
            jobLocation: jobLocation.value,
            status,
            jobType,
          },
        })
      );
      return;
    }
    dispatch(
      createJob({
        position: position.value,
        company: company.value,
        jobLocation: jobLocation.value,
        status,
        jobType,
      })
    );
  };

  const handleInput = (e) => {
    if (!e.target.value) {
      dispatch(
        handleChange({
          name: e.target.name,
          value: e.target.value,
          valid: false,
        })
      );
    } else {
      dispatch(
        handleChange({
          name: e.target.name,
          value: e.target.value,
          valid: true,
        })
      );
    }
  };
  const handleSelect = (e) => {
    dispatch(
      handleSelectChange({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "Edit job" : "Add job"}</h3>
        <div className="form-center">
          <FormRow
            className="form-row"
            name="position"
            type="text"
            value={position.value}
            onChange={handleInput}
            valid={position.valid}
            message="position can not be blank"
          />
          <FormRow
            className="form-row"
            name="company"
            type="text"
            value={company.value}
            onChange={handleInput}
            valid={company.valid}
            message="company can not be blank"
          />
          <FormRow
            className="form-row"
            name="jobLocation"
            type="text"
            value={jobLocation.value}
            onChange={handleInput}
            valid={jobLocation.valid}
            labelText="job location"
            message="location can not be blank"
          />
          <FormSelect
            name="status"
            value={status}
            handleInput={handleSelect}
            options={statusOptions}
          />
          <FormSelect
            name="jobType"
            value={jobType}
            handleInput={handleSelect}
            options={jobTypeOptions}
            labelText="job type"
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clear())}
            >
              {isEditing ? "cancel editing" : "clear"}
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={
                isLoading ||
                !position.valid ||
                !company.valid ||
                !jobLocation.valid
              }
            >
              {isEditing ? "save" : "submit"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: var(--white);
  border-radius: var(--borderRadius);
  width: 100%;
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
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
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: flex-start;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
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

export default AddJob;
