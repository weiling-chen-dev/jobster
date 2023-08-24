import { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { BarChartComponent, AreaChartComponent } from "./index";

const ChartContainer = () => {
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);
  const [showBarChart, setShowBarChart] = useState(true);

  return (
    <Wrapper>
      <h4 className="title">Monthly Applications</h4>
      <button type="button" onClick={() => setShowBarChart(!showBarChart)}>
        {showBarChart ? "Display Area Chart" : "Display Bar Chart"}
      </button>
      {showBarChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  .title {
    margin-bottom: 1rem;
  }
  button {
    border: transparent;
    background-color: transparent;
    color: var(--primary-500);
    font-size: 1.25rem;
    margin-top: 0;
  }
`;
export default ChartContainer;
