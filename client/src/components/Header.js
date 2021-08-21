import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, logout } from '../helpers/auth'
import logo from '../assets/images/ShiftMatcher.jpeg'

// Redux
import { useSelector } from 'react-redux'
const Header = ({ history }) => {
  const { users } = useSelector((state) => state.users)

  const handleLogout = (evt) => {
    logout(() => {
      history.push('/signin')
    })
  }

  /***************
   * VIEWS
   **************/
  const showNavigation = () => (
    <nav className='navbar navbar-expand-lg navbar-light py-4'>
      <div className='container-fluid'>
        <img
          src={logo}
          width='100'
          height='100'
          className='d-inline-block align-top'
          alt=''
        />
        <Link
          to='/'
          className='navbar-brand my-md-3 mr-auto text-secondary site-title'
        >
            ShiftMatcher
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarTogglerDemo02'
          aria-controls='navbarTogglerDemo02'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
          <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
            {!isAuthenticated() && (
              <Fragment>
                <li className='nav-item'>
                  <Link to='/' className='nav-link'>
                    <i className='fas fa-home'></i> Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/signin' className='nav-link'>
                    <i className='fas fa-sign-in-alt'></i> Login
                  </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().role === 'Employee' && (
              <Fragment>
                <p className='nav-item p-2'>Welcome</p>
                <li className='nav-item dropdown mr-5'>
                  <p
                    className='nav-link dropdown-toggle'
                    id='navbarDropdown'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Username
                  </p>
                  <div
                    className='dropdown-menu'
                    aria-labelledby='navbarDropdown'
                  >
                    <p className='dropdown-item'>
                      <Link to='/employee/dashboard' className='nav-link'>
                        <i className='fas fa-home'></i> Dashboard
                      </Link>
                    </p>
                    <p className='dropdown-item' href='#'>
                      <Link to='/employee/profile' className='nav-link'>
                        <i className='fas fa-user'></i>  Profile
                      </Link>
                    </p>
                    <div className='dropdown-divider'></div>
                    <p className='dropdown-item' href='#'>
                      {isAuthenticated() && (
                        <Fragment>
                          <li className='nav-item'>
                            <button
                              className='btn btn-link text-secondary text-decoration-none pl-0'
                              onClick={handleLogout}
                            >
                              <i className='fas fa-sign-out-alt'></i> Logout
                            </button>
                          </li>
                        </Fragment>
                      )}
                    </p>
                  </div>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().role === 'Employer' && (
              <Fragment>
                <p className='nav-item p-2'>Welcome</p>
                <li className='nav-item dropdown mr-5'>
                  <p
                    className='nav-link dropdown-toggle'
                    id='navbarDropdown'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Username
                  </p>
                  <div
                    className='dropdown-menu'
                    aria-labelledby='navbarDropdown'
                  >
                    <p className='dropdown-item'>
                      <Link to='/employer/dashboard' className='nav-link'>
                        <i className='fas fa-home'></i> Dashboard
                      </Link>
                    </p>
                    <p className='dropdown-item' href='#'>
                      <Link to='/employer/profile' className='nav-link'>
                        <i className='fas fa-user'></i>  Profile
                      </Link>
                    </p>
                    <div className='dropdown-divider'></div>
                    <p className='dropdown-item' href='#'>
                      {isAuthenticated() && (
                        <Fragment>
                          <li className='nav-item'>
                            <button
                              className='btn btn-link text-secondary text-decoration-none pl-0'
                              onClick={handleLogout}
                            >
                              <i className='fas fa-sign-out-alt'></i> Logout
                            </button>
                          </li>
                        </Fragment>
                      )}
                    </p>
                  </div>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )

  /***************
   * RENDERER
   **************/
  return <header id='header'>{showNavigation()}</header>
}

export default withRouter(Header)
