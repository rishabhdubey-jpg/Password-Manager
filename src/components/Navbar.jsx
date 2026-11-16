import React from 'react'

const Navbar = () => {
    return (
        <nav className='sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 text-white'>
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4 h-16">
                
                <div className="logo font-bold text-2xl tracking-tight cursor-pointer hover:scale-105 transition-transform">
                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </div>
                
                <button className='group text-white bg-white/5 hover:bg-green-500 hover:text-slate-900 rounded-full flex justify-between items-center ring-1 ring-white/20 hover:ring-green-500 transition-all duration-300 shadow-[0_0_0_rgba(34,197,94,0)] hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] px-4 py-1.5'> 
                    {/* The invert class is removed on hover by styling the group */}
                    <img className='w-7 p-1 invert group-hover:invert-0 transition-all duration-300' src="/icons/github.svg" alt="github logo" />
                    <span className='font-semibold px-2 text-sm'>GitHub</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar