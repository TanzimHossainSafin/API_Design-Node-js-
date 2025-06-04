import { describe, it, expect } from "vitest";
import axios from "axios";

describe('/review/customer', () => {
    it("should find a specific restaurant for the user", async () => {
        const result = await axios.get("http://localhost:3000/app/v1/restaurant/usergetrestaurantreviews", {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxYWRjZTc4LTJmZjUtNGMwYy04YWQzLTAxYzRlZTU0YTUwOSIsInVzZXJuYW1lIjoiZm9ybG9vcCIsImlhdCI6MTc0OTA0MDE2M30.f0SD_0hAJiEfpZe-x88W6Rt348_IOmp2osfSYMOiRxQ"
            }
        });
        const found = result.data.restaurant.find(r => r.name === "test restaurant");
        expect(found).toBeDefined();
        expect(found.restaurant_visited_by_user.username).toBe("forloop");
        expect(found.restaurant_visited_by_user.email).toBe("forloop@gmail.com");
    }, 15000);
});