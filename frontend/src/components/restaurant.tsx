import axios from 'axios';
import {useState} from 'react';
export default function Restaurant() {
    const [rest,setRest]=useState('');
    const [status,setStatus]=useState('');
    const [loading,setLoading]=useState(false);
    const restaurant=async()=>{
        setLoading(true);
        try{
            const rest_data=await axios.get("http://localhost:3000/app/v1/restaurant/usergetrestaurantreviews",
                {headers:{
                    Authorization:localStorage.getItem("token")
                }
            }
               )
               if(!rest_data){
                return setStatus("You are not Authorized!")
               }
               setRest(JSON.stringify(rest_data.data.restaurant));

        }catch(error){
            setStatus(error instanceof Error ? error.message : String(error));
        }finally{
            setLoading(false);
        }
       
    }
    return (
        <>
        <div>Restaurant {status}</div>
        {loading ? <div>Loading...</div> : <button className='bg-blue-300 p-2 rounded cursor-pointer ' onClick={restaurant}>Get restaurant</button>}
         <div>
            <p>here are restaurants:{rest}</p>
         </div>
        </>
        
    )
}
