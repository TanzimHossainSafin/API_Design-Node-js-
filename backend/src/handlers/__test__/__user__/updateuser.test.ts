import {describe,it,expect} from "vitest";
import axios from "axios";
import bcrypt from "bcrypt";
describe('/user/updateUser',()=>{
    it("it's expected to update a user profile",async()=>{
        const password="forloop4321";
        const result=await axios.put('http://localhost:3000/app/v1/api/user/updateuser',{
            username:"forloop",
            email:"forloop@gmail.com",
            password
        });
        expect(result.status).toBe(200);
        const hashedPassword = result.data.updatedUser.password;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        expect(isMatch).toBe(true);
        expect(result.data.updatedUser.email).toBe("forloop@gmail.com");
    },15000);
});