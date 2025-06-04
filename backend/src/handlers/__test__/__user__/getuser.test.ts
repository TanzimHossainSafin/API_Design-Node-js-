import axios from "axios";
import {describe,it,expect} from "vitest";
describe("/user/getuser",()=>{
    it("It should be able to get a user by email",async()=>{
        const result= await axios.get("http://localhost:3000/app/v1/api/user/getuser", {
            params: { email: "forloop@gmail.com" }
          });
        expect(result.status).toBe(200);
        expect(result.data.user).toMatchObject({
            id:expect.any(String),
            username:"forloop",
            email:"forloop@gmail.com"
        })
    });
})
