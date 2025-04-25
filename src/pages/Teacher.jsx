import { Users, Calendar, BookOpen, BarChart2 } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';

function TeacherDashboard() {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Teacher Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back, John! Here's what's happening today.</p>
      </div>
      
      <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Total Students" 
          value="248" 
          icon={<Users size={24} style={{ color: '#3b82f6' }} />}
          color="bg-blue-50"
        />
        <DashboardCard 
          title="Classes Today" 
          value="4" 
          icon={<Calendar size={24} style={{ color: '#10b981' }} />}
          color="bg-green-50"
        />
        <DashboardCard 
          title="Assignments" 
          value="12" 
          icon={<BookOpen size={24} style={{ color: '#f59e0b' }} />}
          color="bg-amber-50"
        />
        <DashboardCard 
          title="Avg. Performance" 
          value="87%" 
          icon={<BarChart2 size={24} style={{ color: '#8b5cf6' }} />}
          color="bg-purple-50"
        />
      </div>
      
      <div className="grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Schedule</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { time: '09:00 - 10:30', title: 'Mathematics 101', students: '32 students', color: 'bg-blue-100 text-blue-800' },
              { time: '11:00 - 12:30', title: 'Science Lab', students: '28 students', color: 'bg-green-100 text-green-800' },
              { time: '14:00 - 15:30', title: 'History', students: '30 students', color: 'bg-amber-100 text-amber-800' },
              { time: '16:00 - 17:30', title: 'English Literature', students: '26 students', color: 'bg-purple-100 text-purple-800' }
            ].map((item, index) => (
              <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-24 text-sm text-gray-500">{item.time}</div>
                <div className="flex-1 ml-4">
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.students}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${item.color}`}>
                  {index === 0 ? 'In Progress' : 'Upcoming'}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Messages</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Sarah Johnson', message: 'When is the next quiz scheduled?', time: '10 mins ago' },
              { name: 'Michael Chen', message: 'I submitted my assignment', time: '1 hour ago' },
              { name: 'Emma Davis', message: 'Can we discuss the project?', time: '3 hours ago' }
            ].map((item, index) => (
              <div key={index} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                  {item.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.message}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 bg-gray-50 text-indigo-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
              Reply to Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;