import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('🦄 Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const showPassword = () => {
        if (ref.current.src.includes("src/assets/hide.png")) {
            passwordRef.current.type = "password"
            ref.current.src = "src/assets/eye.png"
        } else {
            passwordRef.current.type = "text"
            ref.current.src = "src/assets/hide.png"
        }
    }

    const savePassword = () => {
        if (form.username.length > 3 && form.site.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setForm({ site: "", username: "", password: "" })

            toast('🦄 Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('🦄 Error: Password not saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deletePassword = (id) => {
        let confirmDelete = confirm("Do you really want to delete this password?")
        if (confirmDelete) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            toast('🦄 Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce" />
            {/* Same as */}
            <ToastContainer />

            <div className="bg-gray-800 mx-auto pb-6">
                <div className="flexBox gap-0 flex-col py-3">
                    <h1 className="text-2xl text-white font-bold">
                        <span>
                            <span className="text-gray-400">&lt;/</span>
                            PassVAULT
                            <span className="text-gray-400">&gt;</span>
                        </span>
                    </h1>
                    <p className="text-white text-xl">You own Password Manager</p>
                </div>
                <div className="inputs-box flex flex-col w-3/4 mx-auto px-5 py-3 bg-gray-600 rounded-3xl">
                    <div className="flex justify-between">
                        <input value={form.site} onChange={handleChange} type="text" name="site" id="site" placeholder="Website Name" className="inputStyle w-1/2 mr-1.5" />
                        <input value={form.username} onChange={handleChange} type="text" name="username" id="username" placeholder="Userame" className="inputStyle w-1/2 ml-1.5" />
                    </div>
                    <div className="relative">
                        <input ref={passwordRef} value={form.password} onChange={handleChange} type="password" name="password" id="password" placeholder="Password" className="inputStyle w-full" />
                        <span className="absolute top-2 right-0" onClick={showPassword}>
                            <img ref={ref} src="src/assets/eye.png" className="p-2 cursor-pointer" />
                        </span>
                    </div>
                    <button onClick={savePassword} className="flexBox gap-0 bg-zinc-100 text-black px-3 py-2 mx-auto mt-2 border-0 font-bold rounded-xl w-fit">
                        <img src="https://img.icons8.com/ios-glyphs/30/add--v1.png" alt="add--v1" />
                        <span className="mx-1 text-lg">Save Password</span>
                    </button>
                </div>
            </div >

            <div className="passwords bg-gray-700 md:p-6">
                <h2 className="font-bold text-3xl text-center py-6 md:pt-0  text-white">Your Passwords</h2>
                {passwordArray.length === 0 && <div className="text-white text-2xl font-bold underline text-center">No passwords to show</div>}

                {passwordArray.length !== 0 && <table className="mx-auto table-auto md:w-full text-white rounded-2xl overflow-hidden">
                    <thead className="bg-slate-800 border-2 border-black">
                        <tr>
                            <th className="py-2 text-xl">Site</th>
                            <th className="py-2 text-xl">Username</th>
                            <th className="py-2 text-xl">Password</th>
                            <th className="py-2 text-xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-500">
                        {passwordArray.map((item, index) => {
                            return <tr key={index}>
                                <td className="table-border">
                                    <div className="flexBox">
                                        <a href={item.site} target="_blank">{item.site}</a>
                                        <div className="copy-button mt-1 cursor-pointer" onClick={() => { copyText(item.site) }}>
                                            <img src="https://img.icons8.com/ios-glyphs/30/copy.png" alt="copy" />
                                        </div>
                                    </div>
                                </td>
                                <td className="table-border">
                                    <div className="flexBox">
                                        <span>{item.username}</span>
                                        <div className="copy-button mt-1 cursor-pointer" onClick={() => { copyText(item.username) }}>
                                            <img src="https://img.icons8.com/ios-glyphs/30/copy.png" alt="copy" />
                                        </div>
                                    </div>
                                </td>
                                <td className="table-border">
                                    <div className="flexBox">
                                        <span>{"*".repeat(item.password.length)}</span>
                                        <div className="copy-button mt-1 cursor-pointer" onClick={() => { copyText(item.password) }}>
                                            <img src="https://img.icons8.com/ios-glyphs/30/copy.png" alt="copy" />
                                        </div>
                                    </div>
                                </td>
                                <td className="table-border">
                                    <div className="flexBox">
                                        <span className="cursor-pointer mr-0.5" onClick={() => { editPassword(item.id) }}>
                                            <img src="https://img.icons8.com/ios-glyphs/30/edit--v1.png" alt="create-new" />
                                        </span>
                                        <span className="cursor-pointer ml-0.5" onClick={() => { deletePassword(item.id) }}>
                                            <img src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash" />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>}
            </div>
        </>
    )
}

export default Manager
