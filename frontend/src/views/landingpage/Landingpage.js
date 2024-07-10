import React from 'react';
import { Link } from 'react-router-dom';
import './Landingpage.css';
function Land() {
  return (
    <div>
        <div className="landing-container">
    <h1>Courier Management System</h1>
    <div className="buttons">
      <Link to="/home" className="btn">Courier Management System</Link>
      {/* <Link to="/registion" className="btn">User</Link> */}
      <Link to="/login" className="btn">Login</Link>
    </div>
  </div>
  </div>
  )
}

export default Land