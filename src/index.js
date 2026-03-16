import express from 'express';

const app=express();
const port=8080;

app.get('/',(req,res)=>{
    res.send('Live Sports ');
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})