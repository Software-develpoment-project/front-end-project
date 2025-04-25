import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TeacherDashboard from './pages/Teacher';
import StudentDashboard from './pages/Student';

export default function App() {
  const [activeTab, setActiveTab] = useState('teacher');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow px-4 md:px-8 py-6">
        {activeTab === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
      </main>
      <Footer />
    </div>
  );
}