import axios from 'axios';
import {describe,it,expect} from "vitest";
describe('/user/signin',()=>{
    it("It should be able to login to a user and return a jwt tokrn",async()=>{
       const result=await axios.post("http://localhost:3000/app/v1/api/user/login",{
        email:"forloop@gmail.com",
        password:"forloop1234",
       });
       console.log(result.status);
       expect(result.status).toBe(200);
       expect(result.data.user).toMatchObject({
         id:expect.any(String),
         username:"forloop",
         email:"forloop@gmail.com",
       })
       expect(result.data.token).toEqual(expect.any(String));
    });
})