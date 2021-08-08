import React, { useEffect } from 'react'

// Components
import EmployerHeader from './EmployerHeader'
import EmployerActionsBtns from './EmployerActionsBtns'
import EmployerCategoryModal from './EmployerCategoryModal'
import EmployerJobModal from './EmployerJobModal'
import EmployerBody from './EmployerBody'

// Redux
import { useDispatch } from 'react-redux'
import { getCategories } from '../redux/actions/categoryActions'
import { getJobs } from '../redux/actions/jobActions'

const EmployerDashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  useEffect(() => {
    dispatch(getJobs())
  }, [dispatch])

  return (
    <section>
      <EmployerHeader />
      <EmployerActionsBtns />
      <EmployerCategoryModal />
      <EmployerJobModal />
      <EmployerBody />
    </section>
  )
}

export default EmployerDashboard
