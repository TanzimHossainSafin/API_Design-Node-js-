import {useRef,useState} from 'react';
import axios from'axios';
export default function Signup() {
    const usernameRef=useRef<HTMLInputElement>(null);
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const [status,setStatus]=useState('');
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
                return setStatus("Failde To submit");
            }
            console.log(user.data);
            return setStatus("Successfully submitted");
        }catch(error){
            return setStatus(error instanceof Error ? error.message : String(error));
        }
    }
    return (
        <div>
            <h1>signup</h1>
            <form onSubmit={submitbutton}>
                <input type="text" ref={usernameRef}placeholder="username" />
                <input type="email" ref={emailRef} placeholder="abc@gmail.com"/>
                <input type="password" ref={passwordRef} placeholder="password" />
                
                <button type="submit">signup</button>
            </form>
           
            <div> 
                This is status:
              {status}
            </div> 
        </div>
    )
}
