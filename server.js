import express from "express";

const app = express();

app.get('/',(req,res)=>{
res.send('<h1>Welcome</h1>')
});











const port = 8080;

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})