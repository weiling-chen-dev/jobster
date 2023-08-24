import img from "../assets/images/not-found.svg";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="page not found" />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }
  h3 {
    margin-bottom: 0%.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0%.5rem;
    color: var(--grey-500);
  }

  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

export default Error;
