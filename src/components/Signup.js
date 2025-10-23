import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = props => {
  // Passed props here for future use (like showAlert)
  // 1. STATE INITIALIZATION: Must be at the top level of the component
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const host = 'http://localhost:5000';
  // 2. useNavigate hook initialized correctly (lowercase 'navigate')
  const navigate = useNavigate();

  // Optional: Redirects if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(
        'Token found in localStorage. Redirecting logged-in user to Home.'
      );
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();

    // 3. Password Confirmation Logic and Basic Validation
    if (credentials.password !== credentials.confirmpassword) {
      console.error('Passwords do not match!');
      // TODO: Replace with a proper alert/notification system (e.g., using props.showAlert)
      return;
    }

    // Basic minimum length check (optional but good practice)
    if (credentials.password.length < 5) {
      console.error('Password must be at least 5 characters long.');
      return;
    }

    // Destructure necessary fields for the API call
    const { name, email, password } = credentials;

    // API Call to create user
    const url = `${host}/api/auth/createuser`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 4. Use destructured values from the correct state
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        navigate('/');
        // Optional: Show success message
        props.showAlert('Account created successfully', 'success');
        console.log('Account created successfully!');
      } else {
        props.showAlert('Invalid details provided', 'danger');
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
    }
  };

  const onChange = e => {
    // Correctly updates the state object by spreading existing credentials
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container' style={{ marginTop: '50px' }}>
      <h2 className='text-center mb-4'>Create an Account to use iNotebook</h2>
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
            Email address
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
          <div id='emailHelp' className='form-text'>
            We'll never share your email with anyone else.
          </div>
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
        <button type='submit' className='btn btn-primary'>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
