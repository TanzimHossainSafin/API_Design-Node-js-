import {describe,it,expect} from "vitest";
import axios from 'axios';
describe('/review/customer',()=>{
    it("it will create a review of a customer about a specific restaturant",async()=>{
        const result=await axios.post("http://localhost:3000/app/v1/review/customer",{
            customerId:1,
            restaurantId:1,
            rating:5,
            comment:"This is a test comment"
        })
    })
})