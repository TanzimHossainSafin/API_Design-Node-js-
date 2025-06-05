import {describe,it,expect} from "vitest";
import axios from 'axios';
describe('/review/customer',()=>{
    it("it will delete a review of a customer about a specific restaurant",async()=>{
        const result=await axios.delete("http://localhost:3000/app/v1/review/deletereview/cbaea5e8-793d-425f-8f6e-acce16f9cb5e",
        {
         headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxYWRjZTc4LTJmZjUtNGMwYy04YWQzLTAxYzRlZTU0YTUwOSIsInVzZXJuYW1lIjoiZm9ybG9vcCIsImlhdCI6MTc0OTA0MDE2M30.f0SD_0hAJiEfpZe-x88W6Rt348_IOmp2osfSYMOiRxQ"
            }
        }
    );
    expect(result.status).toBe(200);
    expect(result.data.message).toBe("review deleted successfully");
    },15000);
})