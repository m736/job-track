import { useAppSelector } from "../../app/hooks";
import {
  selectTotalApplications,
  selectInterviewCount,
  selectOfferCount,
  selectRejectedCount,
} from "./dashboardSelectors";
import './Dashboard.css'
function Dashboard() {
  const total = useAppSelector(selectTotalApplications);
  const interviews = useAppSelector(selectInterviewCount);
  const offers = useAppSelector(selectOfferCount);
  const rejected = useAppSelector(selectRejectedCount);

  return (
    <section className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Applications</h3>
          <p>{total}</p>
        </div>

        <div className="dashboard-card">
          <h3>Interviews</h3>
          <p>{interviews}</p>
        </div>

        <div className="dashboard-card">
          <h3>Offers</h3>
          <p>{offers}</p>
        </div>

        <div className="dashboard-card">
          <h3>Rejected</h3>
          <p>{rejected}</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
