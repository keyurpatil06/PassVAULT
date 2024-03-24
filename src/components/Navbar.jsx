import React from 'react'

const Navbar = () => {
    return (
        <nav className="flex justify-around items-center bg-black text-zinc-200 py-3">
            <span className="border-2 border-zinc-300 px-2 py-1 text-xl font-bold">
                <span>
                    <span className="text-gray-400">&lt;/</span>
                    PassVAULT
                    <span className="text-gray-400">&gt;</span>
                </span>
            </span>
            <button className="flex justify-center items-center bg-gray-800 text-white rounded-lg cursor-pointer ring-white ring-2">
                <img className="invert" src="src/assets/github.svg" alt="github logo" />
                <a className="pr-2 font-bold">GitHub</a>
            </button>
        </nav>
    )
}

export default Navbar
