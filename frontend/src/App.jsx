import { useState, useEffect } from 'react'
import TodoInput from './Components/todo/TodoInput.jsx'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/home'
import { login, logout } from './Components/Store/counterSlice.js'
import { useDispatch } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './Components/Signup'
import Signin from './Components/Signin'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const _id = sessionStorage.getItem('userId');
    if (_id) {
      dispatch(login());
    }
    else { dispatch(logout()) }
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>
        <Navbar />
        <Home /></div>
    },
    {
      path: "/todo",
      element: <div>
        <Navbar /><TodoInput /></div>

    },
    {
      path: "/signin",
      element: <div> <Navbar /><Signin /></div>
    },
    {
      path: "/signup",
      element: <div> <Navbar />
        <Signup /> </div>
    }


  ])

  return (
    <>
      <div>
        <RouterProvider router={router} />

      </div>
    </>
  )
}

export default App
