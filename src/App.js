import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Help from './Help';
import Profile from './Profile';
import Game from './Game';
import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul class="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help">Help</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const NotFound = () => {
  return <h2>Page not found</h2>
}

export default App;
