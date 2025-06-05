import {describe,it,expect} from "vitest";
import axios from 'axios';
describe('/restaurant',()=>{
    it("it will delete a restaurant",async()=>{
        const result=await axios.delete("http://localhost:3000/app/v1/restaurant/deleterestaurant/8937e976-02fd-4127-aadb-46d73248ddda",
        {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxYWRjZTc4LTJmZjUtNGMwYy04YWQzLTAxYzRlZTU0YTUwOSIsInVzZXJuYW1lIjoiZm9ybG9vcCIsImlhdCI6MTc0OTA0MDE2M30.f0SD_0hAJiEfpZe-x88W6Rt348_IOmp2osfSYMOiRxQ"
            }
        }
    );
    expect(result.status).toBe(200);
    expect(result.data.message).toBe("restaurant deleted successfully");
    },15000);
})