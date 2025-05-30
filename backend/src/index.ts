import * as dotenv from 'dotenv'
dotenv.config()
const PORT=process.env.PORT
import app from './server'
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});