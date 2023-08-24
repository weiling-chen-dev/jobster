import { useEffect } from "react";
import { ChartContainer, Loading, StatsContainer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../features/allJobs/AllJobsSlice";

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStats());
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <div>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartContainer />}
    </div>
  );
};
export default Stats;
