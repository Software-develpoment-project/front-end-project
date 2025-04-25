import { BookOpen, Bell, User, ChevronDown } from 'lucide-react';
import DashboardSwitcher from './DashboardSwitcher';

function Header({ activeTab, setActiveTab }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-container">
            <BookOpen className="text-indigo-600" size={28} />
            <span className="logo-text">EduBoard</span>
          </div>
          
          <DashboardSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="user-menu">
            <button className="hidden md:flex items-center text-gray-600 hover:text-gray-800">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="user-avatar">
                <User size={18} />
              </div>
              <span className="user-name">John Doe</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;