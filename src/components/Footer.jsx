import { BookOpen, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <BookOpen className="text-indigo-600" size={20} />
            <span className="brand-text">EduBoard</span>
            <p className="copyright">© 2025 EduBoard. All rights reserved.</p>
          </div>
          
          <div className="social-links">
            <a href="#" className="social-link">
              <Github size={20} />
            </a>
            <a href="#" className="social-link">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-link">
              <Linkedin size={20} />
            </a>
            <a href="#" className="social-link">
              <Instagram size={20} />
            </a>
          </div>
          
          <div className="footer-links">
            <a href="#" className="footer-link">Help</a>
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;