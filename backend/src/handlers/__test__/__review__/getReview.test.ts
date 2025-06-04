import {describe,it,expect} from "vitest";
import axios from 'axios';
describe('/review/customer',()=>{
    it("it will create a review of a customer about a specific restaturant",async()=>{
        const result=await axios.get("http://localhost:3000/app/v1/review/getreview",
        {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxYWRjZTc4LTJmZjUtNGMwYy04YWQzLTAxYzRlZTU0YTUwOSIsInVzZXJuYW1lIjoiZm9ybG9vcCIsImlhdCI6MTc0OTA0MDE2M30.f0SD_0hAJiEfpZe-x88W6Rt348_IOmp2osfSYMOiRxQ"
            }
        }
);
        expect(result.status).toBe(200);
        expect(result.data.review.length).toBeGreaterThan(0);  
    },15000);
})