import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch, } from 'react-redux'
import { getUser } from '../redux/actions/userActions'

const Profile = ({ match }) => {

  /****************************
   * PARAMS
   ***************************/
   const userId = match.params.userId

    /****************************
   * REDUX GLOBAL STATE PROPERTIES
   ***************************/
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.users)

    /****************************
   * COMPONENT STATE PROPERTIES
   ***************************/
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [createdAt, setCreatedAt] = useState('')

     /****************************
   * LIFECYCLE METHODS
   ***************************/
  useEffect(() => {
    if (!user) {
      dispatch(getUser(userId))
    } else {
      setUsername(user.username)
      setEmail(user.email)
      setCreatedAt(user.createdAt)
    }
  }, [dispatch, userId, user])

  return (
    <Fragment>
      <h2 className='mt-5 ml-5'>My Profile</h2>
      <div className='row justify-content-around mt-5 user-info'>
        <div className='col-12 col-md-3'>
          <figure className='avatar avatar-profile'>
            <img className='rounded-circle img-fluid' src='' alt='' />
          </figure>
          <Link
            to='/me/update'
            id='edit_profile'
            className='btn btn-primary btn-block my-5'
          >
            Edit Profile
          </Link>
        </div>

        <div className='col-12 col-md-5'>
          
          <h4>Full Name</h4>
          {username && user.username && (
          <p>{user.username}</p>
          )}
          <h4>Email Address</h4>
          {email && user.email && (
          <p>{user.email}</p>
          )}

          <h4>Joined on</h4>
          {createdAt && user.createdAt && (
          <p>{String(user.createdAt).substring(0, 10)}</p>
)}
          <Link
            to='/password/update'
            className='btn btn-primary btn-block mt-3'
          >
            Change Password
          </Link>
        </div>
      </div>
    </Fragment>
  )
}

export default Profile
