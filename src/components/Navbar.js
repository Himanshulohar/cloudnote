import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

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

    const json = await response.json(); // Simplified user name fallback logic
    const fetchedName =
      json.name ||
      (json.user && json.user.name) ||
      (json.email && json.email.split('@')[0]);
    setUserName(fetchedName || 'User');
  }; // Re-run when token changes

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserName();
    } else {
      setUserName('');
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem('token')]);

  let location = useLocation();

  return (
    <nav
      className='navbar fixed-top navbar-expand-lg border-bottom border-secondary bg-white'
      style={{ maxWidth: '75%', margin: '0 auto' }}
    >
      <div className='container-fluid d-flex justify-content-between'>
        <Link className='navbar-brand mx-auto order-first order-lg-0' to='/'>
          <i className='fa-solid fa-book me-2'></i>CloudNote
        </Link>
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

          {localStorage.getItem('token') ? (
            // TRUE (Logged In): Show Dropdown Menu for User and Logout
            <div className='d-flex align-items-center'>
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
            // FALSE (Logged Out): Show Login/Signup Links
            // Use a Fragment to wrap the two adjacent <Link> elements
            <>
              <Link
                to='/login'
                role='button'
                className='btn btn-outline-secondary mx-2 mt-2 mt-lg-0'
              >
                Login
              </Link>

              <Link
                to='/signup'
                role='button'
                className='btn btn-outline-secondary mx-2 mb-2 mb-lg-0'
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
