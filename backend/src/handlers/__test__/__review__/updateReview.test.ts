import {describe,it,expect} from "vitest";
import axios from 'axios';
describe('/review/customer',()=>{
    it("it will update a review of a customer about a specific restaurant",async()=>{
        const result=await axios.put(
            "http://localhost:3000/app/v1/review/updatereview/935cb76c-14ea-4acc-8d03-f4818e0682f5",
            { comment: "Edited comment from cursor" },
            {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxYWRjZTc4LTJmZjUtNGMwYy04YWQzLTAxYzRlZTU0YTUwOSIsInVzZXJuYW1lIjoiZm9ybG9vcCIsImlhdCI6MTc0OTEzMzExNn0.708-nqx3y05qS35-jae98YGAvCABo1GQLRjgdt7fT1o"
                }
            }
        );
        expect(result.status).toBe(200);
        expect(result.data.message).toBe("review updated successfully");
    },15000);
})