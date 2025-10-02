'use client';


import { useState } from 'react';
import { UseRegister } from '@/hooks/UseRegisterUser';
import { signOutFn } from '@/actions/sign-out';

export function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    
    
    const HandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await UseRegister({ username, email, password });
    };

    

    return (
        <>
            <form
                onSubmit={HandleSubmit}
                className="w-full max-w-sm mx-auto mt-10 p-6 bg-neutral-900 rounded-2xl shadow-lg flex flex-col gap-4"
            >
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <button
                    type="submit"
                    className="w-full py-2 mt-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
                >
                    Submit
                </button>
            </form>
            {/* <button onClick={handleSignOut} >LogOut</button> */}
        </>
    );
}

