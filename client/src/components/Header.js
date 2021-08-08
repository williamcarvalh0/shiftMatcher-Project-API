import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, logout } from '../helpers/auth'
import logo from '../assets/images/ShiftMatcher.jpeg'

const Header = ({ history }) => {
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
          class='d-inline-block align-top'
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
                <li className='nav-item'>
                  <Link to='/user/dashboard' className='nav-link'>
                    <i className='fas fa-home'></i> Dashboard
                  </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().role === 'Employer' && (
              <Fragment>
                <p class='nav-item p-2'>Welcome</p>
                <li class='nav-item dropdown mr-5'>
                  <a
                    class='nav-link dropdown-toggle'
                    href='#'
                    id='navbarDropdown'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Username
                  </a>
                  <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <a class='dropdown-item'>
                      <Link to='/employer/dashboard' className='nav-link'>
                        <i class='fas fa-home'></i> Dashboard
                      </Link>
                    </a>
                    <a class='dropdown-item' href='#'>
                      <Link to='/employer/profile' className='nav-link'>
                        <i class='fas fa-user'></i>  Profile
                      </Link>
                    </a>
                    <div class='dropdown-divider'></div>
                    <a class='dropdown-item' href='#'>
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
                    </a>
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
