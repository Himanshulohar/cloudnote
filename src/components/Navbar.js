import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// Assuming showAlert is passed down as a prop from App.js for the Logout alert
const Navbar = props => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const host = process.env.REACT_APP_BACKEND_URL;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    if (props.showAlert) {
      props.showAlert('Logged out successfully', 'success');
    }
  };

  const getUserName = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch user data');
      setUserName('User');
      return;
    }

    const json = await response.json();
    if (json.name) {
      setUserName(json.name);
    } else if (json.user && json.user.name) {
      setUserName(json.user.name);
    } else if (json.email) {
      setUserName(json.email.split('@')[0]);
    } else {
      setUserName('User');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserName();
    } else {
      setUserName('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem('token')]);

  let location = useLocation();

  return (
    <nav
      className='navbar fixed-top navbar-expand-lg border-bottom border-secondary bg-white'
      style={{ maxWidth: '75%', margin: '0 auto' }}
    >
      <div className='container-fluid'>
        {/* Toggler visible on small screens */}
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        {/* Brand: centered on small screens, hidden on lg */}
        <Link className='navbar-brand mx-auto d-lg-none text-center' to='/'>
          <i className='fa-solid fa-book me-2'></i>CloudNote
        </Link>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                className={`nav-link ${
                  location.pathname === '/' ? 'active' : ''
                }`}
                aria-current='page'
                to='/'
              >
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className={`nav-link ${
                  location.pathname === '/about' ? 'active' : ''
                }`}
                to='/about'
              >
                About
              </Link>
            </li>
          </ul>

          {/* Mobile collapsed area: show profile/logout inside collapse */}
          {localStorage.getItem('token') ? (
            <div className='d-lg-none w-100 mt-2 border-top pt-2'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                  <i className='fa-regular fa-user me-2'></i>
                  <strong>{userName || 'User'}</strong>
                </div>
                <button
                  className='btn btn-sm btn-outline-secondary'
                  onClick={handleLogout}
                >
                  <i className='fas fa-sign-out-alt me-1'></i> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className='d-lg-none w-100 mt-2'>
              <div className='d-flex justify-content-center gap-2'>
                <Link to='/login' className='btn btn-outline-secondary btn-sm'>
                  Login
                </Link>
                <Link to='/signup' className='btn btn-outline-secondary btn-sm'>
                  Signup
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Brand for large screens (left) */}
        <Link className='navbar-brand d-none d-lg-block' to='/'>
          <i className='fa-solid fa-book me-2'></i>CloudNote
        </Link>

        {/* Large screens: show user dropdown to the right */}
        {localStorage.getItem('token') ? (
          <div className='d-none d-lg-flex align-items-center ms-3'>
            <div className='dropdown'>
              <a
                className='nav-link dropdown-toggle d-flex align-items-center'
                href='#'
                role='button'
                id='userDropdown'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <i className='fa-regular fa-user me-2'></i>
                <span className='badge text-bg-secondary'>
                  {userName || 'Loading...'}
                </span>
              </a>
              <ul
                className='dropdown-menu dropdown-menu-end'
                aria-labelledby='userDropdown'
              >
                <li>
                  <button className='dropdown-item' onClick={handleLogout}>
                    <i className='fas fa-sign-out-alt me-2'></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className='d-none d-lg-flex ms-3'>
            <Link to='/login' className='btn btn-outline-secondary mx-2'>
              Login
            </Link>
            <Link to='/signup' className='btn btn-outline-secondary mx-2'>
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
