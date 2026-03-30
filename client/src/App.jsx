import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewNails from './pages/ViewNails'
import EditNails from './pages/EditNails'
import CreateNails from './pages/CreateNails'
import NailDetails from './pages/NailDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateNails title='Nailgram | Customize' />
    },
    {
      path:'/customnails',
      element: <ViewNails title='Nailgram | Custom Nails' />
    },
    {
      path: '/customnails/:id',
      element: <NailDetails title='Nailgram | View' />
    },
    {
      path: '/edit/:id',
      element: <EditNails title='Nailgram | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App