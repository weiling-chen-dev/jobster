import { styled } from "styled-components";

const JobInfo = ({ icon, info }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{info}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-400);
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
`;
export default JobInfo;
