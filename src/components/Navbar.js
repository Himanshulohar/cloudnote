import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const Navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    Navigate('/login');
  };
  let location = useLocation();

  return (
    <nav
      className='navbar  fixed-top navbar-expand-lg border-bottom border-secondary '
      //style={{ maxWidth: '75%', margin: '0 auto' }}
    >
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          CloudNote
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
            // TRUE (Logged In): Show Logout Button
            <button onClick={handleLogout} className='btn btn-primary'>
              Logout
            </button>
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
