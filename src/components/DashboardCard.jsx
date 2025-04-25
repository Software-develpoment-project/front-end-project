function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="dashboard-card">
      <div className="card-content">
        <div>
          <p className="card-text">{title}</p>
          <p className="card-value">{value}</p>
        </div>
        <div className={`card-icon-container ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;