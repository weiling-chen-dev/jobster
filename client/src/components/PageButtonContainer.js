import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { handlePage } from "../features/allJobs/AllJobsSlice";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const PageButtonContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const pageArray = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  const dispatch = useDispatch();
  const handleNextPage = () => {
    dispatch(handlePage(page === numOfPages ? 1 : page + 1));
  };
  const handlePrevPage = () => {
    dispatch(handlePage(page === 1 ? numOfPages : page - 1));
  };

  return (
    <Wrapper>
      <button
        type="button"
        className="btn"
        onClick={handlePrevPage}
        disabled={numOfPages === 1}
      >
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="page-btn-container">
        {pageArray.map((item) => {
          return (
            <button
              key={item}
              type="button"
              className={page === item ? "active pageBtn" : "pageBtn"}
              disabled={page === item}
              onClick={() => dispatch(handlePage(item))}
            >
              {item}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="btn"
        onClick={handleNextPage}
        disabled={numOfPages === 1}
      >
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;

  .page-btn-container {
    background-color: var(--primary-100);
    border-radius: var(--borderRadius);
  }
  .pageBtn {
    background-color: transparent;
    border: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    transition: var(--transition);
    border-radius: var(--borderRadius);
    cursor: pointer;
  }
  .pageBtn:hover {
    background-color: var(--white);
  }
  .active {
    background: var(--grey-200);
    color: var(--white);
  }
  .active:hover {
    background: var(--grey-200);
    color: var(--white);
    cursor: default;
  }

  .btn {
    background-color: var(--white);
    color: var(--primary-500);
    width: 100px;
    height: 40px;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: none;
  }
  .btn:hover {
    background-color: var(--primary-500);
    color: var(--white);
  }
  .btn:disabled {
    background-color: var(--grey-500);
    color: var(--white);
  }
`;

export default PageButtonContainer;
