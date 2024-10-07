const express=require('express')
const app=express()
require('dotenv').config();
var morgan=require('morgan')

 const hospital_route=require('./Router/hospitalRoute')


 app.use(express.json())
 app.use('/hospitalData',hospital_route)
app.get('/',(req,res)=>{
    res.send('From hospital data API')
})

app.listen(process.env.port,()=>{
    console.log(`server is running on port 4000`)
})