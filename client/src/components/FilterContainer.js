import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import FormRow from "./FormRow";
import FormSelect from "./FormSelect";
import {
  handleFilterChange,
  clearFilters,
} from "../features/allJobs/AllJobsSlice";

import { useMemo, useState } from "react";

const FilterContainer = () => {
  const dispatch = useDispatch();
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const debounceSearch = () => {
    let timeoutId;
    return (e) => {
      setLocalSearchTerm(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(handleFilterChange({ name: "search", value: e.target.value }));
      }, 600);
    };
  };

  const optimizedDebounce = useMemo(() => debounceSearch(), []);

  const { isLoading, searchStats, searchType, sort, sortOptions } = useSelector(
    (store) => store.allJobs
  );
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const handleChange = (e) => {
    dispatch(
      handleFilterChange({ name: e.target.name, value: e.target.value })
    );
  };

  const handleClear = () => {
    dispatch(clearFilters());
    setLocalSearchTerm("");
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>Search form</h4>
        <div className="form-content">
          <FormRow
            name="search"
            type="text"
            value={localSearchTerm}
            onChange={optimizedDebounce}
            valid={true}
            message=""
          />
          <FormSelect
            name="searchStats"
            value={searchStats}
            handleInput={handleChange}
            options={["all", ...statusOptions]}
            labelText="status"
          />
          <FormSelect
            name="searchType"
            value={searchType}
            handleInput={handleChange}
            options={["all", ...jobTypeOptions]}
            labelText="type"
          />
          <FormSelect
            name="sort"
            value={sort}
            handleInput={handleChange}
            options={sortOptions}
          />
          <button
            disabled={isLoading}
            type="button"
            className="btn btn-danger btn-block"
            onClick={handleClear}
          >
            Clear FIlters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }

  .form-content {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }

  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: center;
    margin-top: 1rem;
  }

  @media (min-width: 768px) {
    .form-content {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-content {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;
export default FilterContainer;
