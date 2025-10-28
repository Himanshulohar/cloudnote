import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = props => {
  // State to hold the email and password credentials
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  // Hook for navigation after successful login
  const Navigate = useNavigate();

  // Backend host URL (assuming it's passed or defined here)
  const host = import.meta.env.VITE_BACKEND_URL;

  // Handler for form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // API Call to login endpoint
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the auth token and redirect
      // IMPORTANT: In a production environment, localStorage for tokens is NOT recommended.
      // Use secure HTTP-only cookies instead.
      localStorage.setItem('token', json.authToken);

      props.showAlert('Logged in successfully', 'success');
      Navigate('/');
    } else {
      props.showAlert('Invalid Credentials', 'danger');
    }
  };

  // Handler for updating state when input fields change
  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    // Outer container with top margin
    <div className=' bg-light py-5 container mt-5 rounded-4'>
      <h2 className='text-center mb-4'>Log In to CloudNote</h2>

      {/* Bootstrap Row to center the content horizontally */}
      <div className='row justify-content-center'>
        <div className='col-lg-4 col-md-6 col-10'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email address
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                aria-describedby='emailHelp'
                value={credentials.email}
                onChange={onChange}
                required // Added HTML required attribute for better UX
              />
              <div id='emailHelp' className='form-text'>
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={credentials.password}
                onChange={onChange}
                required // Added HTML required attribute for better UX
                minLength={5} // Ensure minimum password length is enforced locally
              />
            </div>

            <button
              type='submit'
              className='btn btn-primary rounded-pill w-100 mt-2' // Changed button to be rounded-pill and full width (w-100)
              disabled={
                credentials.email.length === 0 ||
                credentials.password.length < 5
              } // Disable if fields are too short
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
