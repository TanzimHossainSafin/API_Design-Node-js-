import {useRef,useState} from 'react';
import axios from'axios';
import futureImg from '../assets/future.png';
import { useNavigate } from "react-router-dom";
export default function Signup() {
    const usernameRef=useRef<HTMLInputElement>(null);
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const [status,setStatus]=useState('');
    const navigate = useNavigate();
    const submitbutton=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const user=await axios.post("http://localhost:3000/app/v1/api/user/signup",
                {
                    username:usernameRef.current?.value,
                    email:emailRef.current?.value,
                    password:passwordRef.current?.value,
                }
            );
           
            if(!user){
                return setStatus("Failed To submit");
            }
            
          setStatus("Successfully submitted");
          navigate("/login");
           
        }catch(error){
            return setStatus(error instanceof Error ? error.message : String(error));
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center text-black bg-gray-50">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex overflow-hidden">
                {/* Left: Signup Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create your account</h2>
                    <p className="text-gray-500 mb-6">Sign up to get started!</p>
                    <form onSubmit={submitbutton} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Username</label>
                            <input type="text" ref={usernameRef} placeholder="Your username" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Email</label>
                            <input type="email" ref={emailRef} placeholder="abc@gmail.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Password</label>
                            <input type="password" ref={passwordRef} placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition cursor-pointer">Sign up</button>
                    </form>
                   <div className="mt-4 text-sm text-gray-500">
                        Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                    </div>
                    <div className="mt-2 text-sm text-red-500 min-h-[24px]">{status}</div>
                </div>
               
                <div className="hidden md:block md:w-1/2 bg-gray-100 h-full">
                  <img
                    src={futureImg}
                    alt="Signup Illustration"
                    className="w-full h-full object-cover rounded-r-2xl shadow-lg border-l-2 border-blue-500"
                  />
                </div>
            </div>
        </div>
    )
}
