import React, { useEffect } from 'react'

// Components
import EmployeeHeader from './EmployeeHeader'
import EmployeeJobModal from './EmployeeJobModal'
import EmployeeBody from './EmployeeBody'

// Redux
import { useDispatch } from 'react-redux'
import { getCategories } from '../redux/actions/categoryActions'
import { getJobs } from '../redux/actions/jobActions'

const EmployeeDashboard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getCategories())
    }, [dispatch])
    useEffect(() => {
      dispatch(getJobs())
    }, [dispatch])
  
    return (
      <section>
        <EmployeeHeader />
        <EmployeeJobModal />
        <EmployeeBody />
      </section>
    )
}

export default EmployeeDashboard;