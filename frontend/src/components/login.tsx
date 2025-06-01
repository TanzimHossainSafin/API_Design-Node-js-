import {useRef,useState} from 'react';
import axios from 'axios';
export default function Login() {
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const [status,setStatus]=useState('');
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
                return setStatus("Login Successfully!");
            }
            return setStatus('Sorry you are not authorized!')
            
        } catch (error) {
            return setStatus(error instanceof Error ? error.message : String(error));
        }
    }
    
    return (
        <div>
            <h1>Login Form</h1>
            <form onSubmit={submithandel}>
                <input type="email" ref={emailRef} placeholder="abc@gmail.com" />
                <input type="password" ref={passwordRef} placeholder="password" />
                <button type="submit">login</button>
            </form>
            <div>The status is : {status}</div>
            </div>
    )
}
