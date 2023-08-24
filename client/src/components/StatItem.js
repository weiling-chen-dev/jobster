import { styled } from "styled-components";

const StatItem = ({ title, count, icon, color, bgc }) => {
  return (
    <Wrapper color={color} bgc={bgc}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="stat">{title}</h5>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  padding: 2rem;
  background-color: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
  }
  .icon {
    width: 70px;
    height: 60px;
    background-color: ${(props) => props.bgc};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
  .stat {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    margin-top: 1rem;
    text-align: left;
  }
`;
export default StatItem;
