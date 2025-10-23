import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// Assuming showAlert is passed down as a prop from App.js for the Logout alert
const Navbar = props => {
  // Corrected the hook variable name to lowercase 'navigate'
  const navigate = useNavigate(); // State to store the fetched user name
  const [userName, setUserName] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Check if showAlert is available before calling it
    if (props.showAlert) {
      props.showAlert('Logged out successfully', 'success');
    }
  }; // Function to fetch user details (name/email)

  const getUserName = async () => {
    // IMPORTANT: Replace with your actual host and user detail endpoint (e.g., /api/auth/getuser)
    const response = await fetch('http://localhost:5000/api/auth/getuser', {
      method: 'POST', // Adjust method if necessary
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });

    if (!response.ok) {
      // Handle error if token is invalid or request fails
      console.error('Failed to fetch user data');
      setUserName('User'); // Default fallback
      return;
    }

    const json = await response.json(); // Assuming the API returns the user object with a 'name' field
    if (json.name) {
      setUserName(json.name);
    } else if (json.user && json.user.name) {
      // Fallback for nested user object structure
      setUserName(json.user.name);
    } else if (json.email) {
      // Fallback to email username if name is missing
      setUserName(json.email.split('@')[0]);
    } else {
      setUserName('User');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserName();
    } else {
      setUserName(''); // Clear username if logged out
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem('token')]); // Re-run when token changes

  let location = useLocation();

  return (
    <nav
      className='navbar fixed-top navbar-expand-lg border-bottom border-secondary '
      style={{ maxWidth: '75%', margin: '0 auto' }}
    >
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
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
                  {/* User Icon */}
                  <i className='fa-regular fa-user me-2'></i>
                  {/* Display the fetched username */}
                  <span className='badge text-bg-secondary'>
                    {userName || 'Loading...'}
                  </span>
                </a>
                {/* Dropdown Menu */}
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
            // Using a Fragment (<>...</>) to wrap the two adjacent <Link> elements
            <>
              <Link
                to='/login'
                role='button'
                className='btn btn-outline-primary mx-2'
              >
                Login
              </Link>

              <Link
                to='/signup'
                role='button'
                className='btn btn-outline-primary mx-2'
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
