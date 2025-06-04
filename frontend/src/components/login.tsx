import {useRef,useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Login() {
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const [status,setStatus]=useState('');
    const navigate = useNavigate();
    const submithandel = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await axios.post("http://localhost:3000/app/v1/api/user/login", {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            });
            if (!user) {
                return setStatus("Sorry failed login try again!");
            }
            if(user.data && user.data.token){
                localStorage.setItem("token",`Bearer ${user.data.token}`);
                setStatus("Login Successfully!");
                navigate("/");
                return;
            }
            return setStatus('Sorry you are not authorized!')
            
        } catch (error) {
            return setStatus(error instanceof Error ? error.message : String(error));
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center text-black bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-500 mb-6">Login to your account</p>
                <form onSubmit={submithandel} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Email</label>
                        <input type="email" ref={emailRef} placeholder="abc@gmail.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Password</label>
                        <input type="password" ref={passwordRef} placeholder="Your password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition cursor-pointer" type="submit">Login</button>
                </form>
                <div className="mt-4 text-sm text-gray-500">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </div>
                <div className="mt-2 text-sm text-red-500 min-h-[24px]">{status}</div>
            </div>
        </div>
    )
}
