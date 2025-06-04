import {describe,it,expect} from "vitest";
import axios from 'axios';
describe('/user/deleteuser',()=>{
    it("it will delete a user based on email address",async()=>{
        const result=await axios.delete("http://localhost:3000/app/v1/api/user/deleteuser",
            {params:{email:"forloop@gmail.com"}}
        );
        expect(result.status).toBe(200);
        expect(result.data.message).toBe("User deleted successfully");
        expect(result.data.user).toMatchObject({
            id:expect.any(String),
            username:"forloop",
            email:"forloop@gmail.com"
        });
    });
});