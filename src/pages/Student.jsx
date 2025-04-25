function StudentDashboard() {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Student Dashboard</h1>
        <p className="dashboard-subtitle">Student view is under development.</p>
      </div>
      
      <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Student Dashboard coming soon</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            Back to Teacher View
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;