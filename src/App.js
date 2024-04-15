import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap
import Help from './Help';
import Profile from './Profile';
import Game from './Game';

// add react-bootstrap for phase2

function App() {
  return (
    <BrowserRouter>
      <div>
      <Navbar bg="dark" data-bs-theme="dark" style={{ marginBottom: '20px' }}>
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/help">Help</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        
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
