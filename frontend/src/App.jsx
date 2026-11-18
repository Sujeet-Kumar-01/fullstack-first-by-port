import Visions from './components/Visions';
import ContactForm from './components/ContactForm';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">FullstackDev.</div>
        <span className="nav-tag">Live System</span>
      </nav>

      <header className="hero">
        <span className="badge">Next-Gen Architecture</span>
        <h1>
          Engineering <span className="gradient-text">Modern Web Systems</span>
        </h1>
        <p className="bio">
          Connecting React client interfaces with Node/Express APIs and persistent MongoDB storage.
        </p>
      </header>

      <main className="main-content">
        <Visions />
        <ContactForm />
      </main>
    </div>
  );
}