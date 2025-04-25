function DashboardSwitcher({ activeTab, setActiveTab }) {
  return (
    <div className="flex bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => setActiveTab('teacher')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
          activeTab === 'teacher' 
            ? 'bg-white text-indigo-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Teacher Dashboard
      </button>
      <button
        onClick={() => setActiveTab('student')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
          activeTab === 'student' 
            ? 'bg-white text-indigo-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Student Dashboard
      </button>
    </div>
  );
}

export default DashboardSwitcher;