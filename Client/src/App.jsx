import React from 'react'
import AppRoutes from './Router/AppRoutes'

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0e0e0e] text-black dark:text-white transition-all">
      <AppRoutes />
    </div>
  )
}

export default App
