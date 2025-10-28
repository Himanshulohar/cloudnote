import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = props => {
  // 1. STATE INITIALIZATION: Must be at the top level of the component
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

    const host = import.meta.env.VITE_BACKEND_URL; // 2. useNavigate hook initialized correctly
  const navigate = useNavigate(); // Optional: Redirects if the user is already logged in

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(
        'Token found in localStorage. Redirecting logged-in user to Home.'
      );
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault(); // 3. Password Confirmation Logic and Basic Validation

    if (credentials.password !== credentials.confirmpassword) {
      props.showAlert('Passwords do not match!', 'danger');
      return;
    } // Basic minimum length check (enforced via minLength attribute as well)

    if (credentials.password.length < 5) {
      props.showAlert('Password must be at least 5 characters long.', 'danger');
      return;
    } // Destructure necessary fields for the API call

    const { name, email, password } = credentials; // API Call to create user

    const url = `${host}/api/auth/createuser`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, // 4. Use destructured values from the correct state
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        navigate('/'); // Optional: Show success message
        props.showAlert('Account created successfully', 'success');
      } else {
        props.showAlert(
          'Invalid details provided. Email may already be in use.',
          'danger'
        );
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
      props.showAlert('An unexpected error occurred.', 'danger');
    }
  };

  const onChange = e => {
    // Correctly updates the state object by spreading existing credentials
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    // Applied mt-5 for consistent top margin
    <div className='bg-light py-5 container mt-5 rounded-4'>
      <h2 className='text-center mb-4'>Create an Account to use iNotebook</h2> 
      <div className='row justify-content-center'>
        <div className='col-lg-4 col-md-6 col-10'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Name
              </label>

              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                onChange={onChange}
                required
                value={credentials.name}
                minLength={3}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>

              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                onChange={onChange}
                required
                value={credentials.email}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password (Min 5 chars)
              </label>

              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                onChange={onChange}
                required
                value={credentials.password}
                minLength={5}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='confirmpassword' className='form-label'>
                Confirm Password
              </label>

              <input
                type='password'
                className='form-control'
                id='confirmpassword'
                name='confirmpassword'
                onChange={onChange}
                required
                value={credentials.confirmpassword}
                minLength={5}
              />
            </div>

            <button
              type='submit'
              className='btn btn-primary rounded-pill w-100 mt-2'
              disabled={
                credentials.password.length < 5 ||
                credentials.password !== credentials.confirmpassword
              }
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
