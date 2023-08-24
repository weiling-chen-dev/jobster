import { styled } from "styled-components";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "./index";
import { useEffect } from "react";
import { getJobs } from "../features/allJobs/AllJobsSlice";
import PageButtonContainer from "./PageButtonContainer";

const JobsContainer = () => {
  const {
    isLoading,
    jobs,
    totalJobs,
    page,
    sort,
    search,
    searchStats,
    searchType,
    numOfPages,
  } = useSelector((store) => store.allJobs);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobs());
    // eslint-disable-next-line
  }, [page, sort, search, searchStats, searchType]);
  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    );
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h5>no job to display...</h5>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {`${totalJobs} ${totalJobs > 1 ? "Jobs" : "Job"} found`}
        <span className="page-info">
          {`${page}/${numOfPages} ${numOfPages > 1 ? "Pages" : "Page"}`}
        </span>
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      <PageButtonContainer />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  .page-info {
    color: var(--grey-500);
    font-weight: 100;
  }
  h2 {
    text-transform: none;
  }
  & > h5 {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;
export default JobsContainer;
