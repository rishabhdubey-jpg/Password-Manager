import { useState } from 'react' 
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() { 
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-green-500 selection:text-white flex flex-col">
        <Navbar /> 
        {/* Modern dark grid background */}
        <div className="flex-grow bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
           <Manager/> 
        </div>
       <Footer/>
    </div>
  )
}

export default App