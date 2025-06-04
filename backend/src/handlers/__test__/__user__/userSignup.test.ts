import { describe, it, expect } from "vitest";
import axios from 'axios';
describe("/user/signup",()=>{
    it("should be able to create a user",async()=>{
        const result=await axios.post("http://localhost:3000/app/v1/api/user/signup",{
            username:"forloop",
            email:"forloop@gmail.com",
            password:"forloop1234"
        })
        expect(result.status).toBe(200);
        expect(result.data.user).toMatchObject({
            id:expect.any(String),
            username:"forloop",
            email:"forloop@gmail.com",
        })
    },15000)
   
})

