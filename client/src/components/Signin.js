import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import equals from 'validator/lib/equals'
import { showErrorMsg, showSuccessMsg } from '../helpers/message'
import { showLoading } from '../helpers/loading'
import { signin, signup } from '../api/auth'
import { setAuthentication, isAuthenticated } from '../helpers/auth'
import '../assets/css/App.css'

const Signin = () => {
  let history = useHistory()

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 'Employer') {
      history.push('/admin/dashboard')
    } else if (isAuthenticated() && isAuthenticated().role === 'Employee') {
      history.push('/user/dashboard')
    }
  }, [history])

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    successMsg: false,
    errorMsg: false,
    loading: false,
  })

  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData

  /***************
   * EVENT  HANDLERS
   **************/
  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: '',
      errorMsg: '',
    })
  }

  const handleSubmitLogin = (evt) => {
    evt.preventDefault()

    // client-side validation
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: 'All fields are required',
      })
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: 'Invalid email',
      })
    } else {
      // Success
      const { email, password } = formData
      const data = { email, password }

      setFormData({
        ...formData,
        loading: true,
      })

      signin(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user)

          if (isAuthenticated() && isAuthenticated().role === 'Employer') {
            console.log('Redirect to employer dashboard')
            history.push('/employer/dashboard')
          } else {
            console.log('Redirect to user dashboard')
            history.push('/employee/dashboard')
          }
        })
        .catch((err) => {
          console.log('signin api function error: ', err)
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          })
        })
    }
  }

  const handleSubmitRegister = (evt) => {
    evt.preventDefault()

    // client-side validation
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: 'All fields are required',
      })
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: 'Invalid email',
      })
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: 'Passwords do not match',
      })
    } else {
      // Success
      const { username, email, password } = formData
      const data = { username, email, password }

      setFormData({
        ...formData,
        loading: true,
      })

      signup(data)
        .then((response) => {
          console.log('Axios signup success: ', response)
          setFormData({
            username: '',
            email: '',
            password: '',
            password2: '',
            loading: false,
            successMsg: response.data.successMessage,
          })
        })
        .catch((err) => {
          console.log('Axios signup error: ', err)
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          })
        })
    }
  }

  const signinBtn = () => {
    const container = document.querySelector('.container-main')
    container.classList.add('sign-up-mode')
    setFormData({
      ...formData,
      email: '',
      password: '',
      successMsg: '',
      errorMsg: '',
      loading: false,
    })
  }

  const signupBtn = () => {
    const container = document.querySelector('.container-main')
    container.classList.remove('sign-up-mode')
    setFormData({
      ...formData,
      successMsg: '',
      errorMsg: '',
      username: '',
      email: '',
      password: '',
      password2: '',
      loading: false,
    })
  }
  /***************
   * VIEWS
   **************/
  const showSigninForm = () => (
    <form className='sign-in-form-main' onSubmit={handleSubmitLogin} noValidate>
      {/* email */}
      <h2 className='title-sign-main'>Sign in</h2>
      <div className='input-field-main'>
        <i className='fas fa-envelope'></i>
        <input
          name='email'
          value={email}
          placeholder='Email address'
          type='email'
          onChange={handleChange}
        />
      </div>
      {/* password */}
      <div className='input-field-main'>
        <i className='fas fa-lock'></i>
        <input
          name='password'
          value={password}
          placeholder='Password'
          type='password'
          onChange={handleChange}
        />
      </div>
      {/* messages */}
      {errorMsg && showErrorMsg(errorMsg)}
      {loading && <div className='text-center pb-4'>{showLoading()}</div>}
      {/* signin button */}
      <button type='submit' className='btn-main'>
        Login
      </button>
      <p className='social-text'>Or Sign in with social platforms</p>
      <div className='social-media-main'>
        <p className='social-icon-main'>
          <i className='fab fa-facebook-f'></i>
        </p>
        <p className='social-icon-main'>
          <i className='fab fa-twitter'></i>
        </p>
        <p className='social-icon-main'>
          <i className='fab fa-google'></i>
        </p>
        <p className='social-icon-main'>
          <i className='fab fa-linkedin-in'></i>
        </p>
      </div>
    </form>
  )

  const showSignupForm = () => (
    <form
      className='sign-up-form-main'
      onSubmit={handleSubmitRegister}
      noValidate
    >
      {/* username */}
      <h2 className='title-sign-main'>Sign up</h2>
      <div className='input-field-main'>
        <i className='fas fa-user'></i>
        <input
          name='username'
          value={username}
          placeholder='Username'
          type='text'
          onChange={handleChange}
        />
      </div>
      {/* email */}
      <div className='input-field-main'>
        <i className='fas fa-envelope'></i>
        <input
          name='email'
          value={email}
          placeholder='Email address'
          type='email'
          onChange={handleChange}
        />
      </div>
      {/* password */}
      <div className='input-field-main'>
        <i className='fas fa-lock'></i>
        <input
          name='password'
          value={password}
          placeholder='Create password'
          type='password'
          onChange={handleChange}
        />
      </div>
      {/* password2 */}
      <div className='input-field-main'>
        <i className='fas fa-lock'></i>
        <input
          name='password2'
          value={password2}
          placeholder='Confirm password'
          type='password'
          onChange={handleChange}
        />
      </div>
      {/* message */}
      {successMsg && showSuccessMsg(successMsg)}
      {errorMsg && showErrorMsg(errorMsg)}
      {loading && <div className='text-center pb-4'>{showLoading()}</div>}
      {/* signup button */}
      <button type='submit' className='btn-main'>
        Sign up
      </button>
      <p className='social-text'>Or Sign up with social platforms</p>
      <div className='social-media-main'>
        <p className='social-icon-main'>
          <i className='fab fa-facebook-f'></i>
        </p>
        <p className='social-icon-main'>
          <i className='fab fa-twitter'></i>
        </p>
        <p className='social-icon-main'>
          <i className='fab fa-google'></i>
        </p>
        <p className='social-icon-main'>
          <i className='fab fa-linkedin-in'></i>
        </p>
      </div>
    </form>
  )
  const showPanelsContainer = () => (
    <>
      <div className='panel-main left-panel-main'>
        <div className='content-main'>
          <h3>New here ?</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
            ex ratione. Aliquid!
          </p>
          <button className='btn-main transparent-main' onClick={signinBtn}>
            Sign up
          </button>
        </div>
        <img src='/images/log.svg' className='image' alt='' />
      </div>
      <div className='panel-main right-panel-main'>
        <div className='content-main'>
          <h3>One of us ?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            laboriosam ad deleniti.
          </p>
          <button className='btn-main transparent-main' onClick={signupBtn}>
            Sign in
          </button>
        </div>
        <img src='/images/register.svg' className='image' alt='' />
      </div>
    </>
  )

  /***************
   * RENDERER
   **************/
  return (
    <div className='container-main'>
      <div className='forms-container-main'>
        <div className='signin-signup-main'>
          {showSigninForm()}
          {showSignupForm()}
        </div>
      </div>
      <div className='panels-container-main'>{showPanelsContainer()}</div>
    </div>
  )
}

export default Signin
