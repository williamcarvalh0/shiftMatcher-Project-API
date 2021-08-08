import React from 'react'
import { BrowserRouter, Switch, Route, } from 'react-router-dom'
import '../assets/css/App.css'
import Header from './Header'
import Home from './Home'
import Signin from './Signin'
import NotFound from './NotFound'
import EmployeeDashboard from './EmployeeDashboard'
import EmployerDashboard from './EmployerDashboard'
import EmployerRoute from './EmployerRoute'
import EmployeeRoute from './EmployeeRoute'
import EmployerEditJob from './EmployerEditJob'
import EmployerProfile from './EmployerProfile'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={Signin} />
          <EmployeeRoute
            exact
            path='/employee/dashboard'
            component={EmployeeDashboard}
          />
          <EmployerRoute
            exact
            path='/employer/dashboard'
            component={EmployerDashboard}
          />
          <EmployerRoute
            exact
            path='/employer/edit/job/:jobId'
            component={EmployerEditJob}
          />
          <EmployerRoute
            exact
            path='/employer/profile'
            component={EmployerProfile}
          />
          <Route component={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
