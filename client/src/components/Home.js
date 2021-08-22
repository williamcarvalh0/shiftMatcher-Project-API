import React from 'react'
import logo from '../assets/images/ShiftMatcher.jpeg'

const Home = () => (
  <>
    <div className='container'>
      <h1 className='display-3 text-center mr-auto text-secondary'>Welcome to ShiftMatcher</h1>
      
      
      <div className='text-center'>
        <img src={logo} className='img-fluid rounded mx-auto d-block p-2' alt='' />
      </div>

      <blockquote className='blockquote text-center p-5'>
        <p className='mb-0'>
        We’re here to make hiring a little easier. Let’s give it a try.
        
        </p>
        <footer className='blockquote-footer'>
          William Carvalho <cite title='Source Title'>ShiftMatcher CEO</cite>
        </footer>
      </blockquote>
    </div>
  </>
)

export default Home
