import React from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout