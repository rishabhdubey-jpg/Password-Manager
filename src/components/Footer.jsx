import React from 'react'

const Footer = () => {
    return (
        <div className='fixed bottom-0 w-full bg-slate-950/80 backdrop-blur-md border-t border-white/10 text-gray-400 flex flex-col justify-center items-center py-3 z-50'>
            <div className="logo font-bold text-white text-xl mb-1 flex items-center">
                <span className='text-green-500'> &lt;</span>
                <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
            </div>
            
            <div className='flex justify-center items-center text-sm font-medium'> 
                Created with 
                <img className='w-5 mx-2 hover:scale-125 transition-transform duration-300' src="icons/heart.png" alt="heart" /> 
                by Rishabh 
            </div>
        </div>
    )
}

export default Footer