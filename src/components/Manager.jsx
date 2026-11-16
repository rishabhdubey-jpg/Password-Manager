import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("https://passop-backend-n1bd.onrender.com/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }
    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        } else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            // Fix 1: Only send a DELETE request if we are editing an existing password (form.id exists)
            if (form.id) {
                await fetch("https://passop-backend-n1bd.onrender.com/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
            }

            // Fix 2: Generate the ID once so the screen and database match perfectly
            const currentId = form.id || uuidv4();
            const newPassword = { ...form, id: currentId };

            setPasswordArray([...passwordArray, newPassword])
            await fetch("https://passop-backend-n1bd.onrender.com/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newPassword) })

            // Clear the form
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        }
        else {
            toast.error('Error: Minimum 3 characters required!', { theme: "dark" });
        }
    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))

            await fetch("https://passop-backend-n1bd.onrender.com/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const editPassword = (id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer />
            {/* Glowing background blob */}
            <div className="absolute left-1/2 top-20 -z-10 -translate-x-1/2 h-[400px] w-[80%] max-w-[600px] rounded-full bg-green-500/20 blur-[120px]"></div>

            {/* Removed min-h-[88.2vh] and added pb-24 so content doesn't hide behind the new fixed footer */}
            {/* Increased bottom padding to pb-32 to fully clear the fixed footer */}
            <div className="p-4 md:p-8 md:mycontainer pb-32">
                <h1 className='text-4xl md:text-5xl font-extrabold text-center tracking-tight'>
                    <span className='text-green-500'>&lt;</span>
                    <span className='text-white'>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-gray-400 text-lg text-center mt-2'>Secure, stylish, and entirely yours.</p>

                {/* Glassmorphism Form Card */}
                <div className="flex flex-col p-6 mt-10 md:mt-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl shadow-green-900/20 gap-6 max-w-4xl mx-auto">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL (e.g., https://google.com)' className='rounded-xl border border-white/20 bg-transparent text-white placeholder:text-gray-500 w-full p-3 px-5 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all' type="text" name="site" id="site" />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-6">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-xl border border-white/20 bg-transparent text-white placeholder:text-gray-500 w-full p-3 px-5 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all' type="text" name="username" id="username" />

                        <div className="relative w-full">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-xl border border-white/20 bg-transparent text-white placeholder:text-gray-500 w-full p-3 px-5 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all' type="password" name="password" id="password" />
                            <span className='absolute right-[10px] top-[10px] cursor-pointer hover:scale-110 transition-transform' onClick={showPassword}>
                                {/* Inverted the eye icon for dark mode */}
                                <img ref={ref} className='p-1 invert opacity-70 hover:opacity-100' width={28} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-500 hover:bg-green-400 text-slate-900 font-semibold rounded-xl px-8 py-3 w-fit transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover" colors="primary:#0f172a"></lord-icon>
                        Save Password
                    </button>
                </div>

                {/* Added mb-24 to force a large empty gap below the table so it clears the fixed footer */}
                <div className="passwords max-w-5xl mx-auto mt-12 mb-24">
                    <h2 className='font-bold text-2xl py-4 text-white'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-gray-400 text-center py-10 bg-white/5 rounded-xl border border-white/10'>No passwords saved yet.</div>}

                    {passwordArray.length !== 0 && (
                        <div className="overflow-x-auto rounded-xl border border-white/10 shadow-lg">                            <table className="table-auto w-full text-left overflow-hidden">
                            {/* Sticky header so it stays visible while scrolling */}
                            <thead className='sticky top-0 z-10 bg-slate-900/90 backdrop-blur-md text-green-400 border-b border-white/10'>
                                <tr>
                                    <th className='py-4 px-6 font-medium tracking-wider'>Website</th>
                                    <th className='py-4 px-6 font-medium tracking-wider'>Username</th>
                                    <th className='py-4 px-6 font-medium tracking-wider'>Password</th>
                                    <th className='py-4 px-6 font-medium tracking-wider text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white/5 divide-y divide-white/5'>
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index} className='hover:bg-white/10 transition-colors'>
                                            <td className='py-4 px-6 text-gray-300'>
                                                <div className='flex items-center gap-3'>
                                                    <a href={item.site} target='_blank' rel="noreferrer" className='hover:text-green-400 transition-colors truncate max-w-[150px]'>{item.site}</a>
                                                    <div className='cursor-pointer opacity-50 hover:opacity-100 transition-opacity' onClick={() => { copyText(item.site) }}>
                                                        <lord-icon style={{ "width": "20px", "height": "20px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" colors="primary:#fff"></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-4 px-6 text-gray-300'>
                                                <div className='flex items-center gap-3'>
                                                    <span className='truncate max-w-[150px]'>{item.username}</span>
                                                    <div className='cursor-pointer opacity-50 hover:opacity-100 transition-opacity' onClick={() => { copyText(item.username) }}>
                                                        <lord-icon style={{ "width": "20px", "height": "20px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" colors="primary:#fff"></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-4 px-6 text-gray-300'>
                                                <div className='flex items-center gap-3'>
                                                    <span>{"*".repeat(item.password.length)}</span>
                                                    <div className='cursor-pointer opacity-50 hover:opacity-100 transition-opacity' onClick={() => { copyText(item.password) }}>
                                                        <lord-icon style={{ "width": "20px", "height": "20px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" colors="primary:#fff"></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-4 px-6'>
                                                <div className='flex justify-center gap-4'>
                                                    <span className='cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition-all' onClick={() => { editPassword(item.id) }}>
                                                        <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" colors="primary:#22c55e" style={{ "width": "22px", "height": "22px" }}></lord-icon>
                                                    </span>
                                                    <span className='cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition-all' onClick={() => { deletePassword(item.id) }}>
                                                        <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" colors="primary:#ef4444" style={{ "width": "22px", "height": "22px" }}></lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        </div>
                    )}
                </div>
            </div >
        </>
    )
}

export default Manager