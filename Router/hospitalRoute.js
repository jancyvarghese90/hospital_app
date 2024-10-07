const express=require('express')
const router=express.Router()
const fs=require('fs')


//utility function for reading from json file

const loadHospitalData=()=>{
    try{
const dataBuffer=fs.readFileSync('hospitalData.json')
dataJSON=dataBuffer.toString()
return JSON.parse(dataJSON)
    }
    catch(error)
    {
console.log(error)
    }

}
//utility function for writing into JSON file

const saveHospitalData=(Data)=>{
try{
const dataJSON=JSON.stringify(Data,null,2)
fs.writeFileSync('hospitalData.json',dataJSON)
}
catch(error){
    console.log(error)
}
}
//load all data
router.get('/',(req,res)=>{
    const datas=loadHospitalData()
    res.send(datas)
})



//add a new data
router.post('/',(req,res)=>{
    //fetch existing data
    try{
const datas=loadHospitalData()
const newData={
    id:datas.length+1,
    name:req.body.name,
    hospital_location:req.body.hospital_location,
    patient_count:req.body.patient_count
   
}
datas.push(newData)
saveHospitalData(datas)
res.status(210).send(newData)
    }
    catch(error){
       res.status(400).send(error)

    }
})
//update by specific id
router.patch('/:id', (req,res)=>{
    try{
const datas=loadHospitalData()
const data=datas.find(i=>i.id===parseInt(req.params.id))
if(!data){
    return res.status(404).send({error:'Data not found'})
}
data.name=req.body.name||data.name
data.hospital_location=req.body.hospital_location||data.hospital_location
data.patient_count=req.body.patient_count||data.patient_count
saveHospitalData(datas)
res.status(200).send(data)

    }
    catch(error){
        res.status(400).send(error)
    }
})

//delete by id
router.delete('/:id',(req,res)=>{
    try{
let datas=loadHospitalData()
const index=datas.findIndex(i=>i.id==parseInt(req.params.id))
if(index==-1){
    return res.status(404).send({error:'Data not found'})
}   
datas.splice(index,1)
saveHospitalData(datas)
res.send({message:'data deleted'})
}
    catch(error){
        res.status(400).send(error)

    }
})




















module.exports=router;