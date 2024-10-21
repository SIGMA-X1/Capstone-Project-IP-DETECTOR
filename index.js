import express from "express";
import bodyParser from "body-parser";
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const port=3000;
const data=[];
app.use(express.static("public"));
app.get("/",async(req,res)=>{
    try{
        const response=await fetch("https://ipinfo.io/json?token=8733a70279a0b7");
        const result= await response.json();
        data.push(result);
        res.render("main.ejs",{
        result:result
        });
    }catch(error){
         console.log(error);
    }

});
app.get("/about",(req,res)=>{
    res.render("about.ejs");
});
app.post("/search",async (req,res)=>{
    while(data.length>0){
        let a=data.pop();   
    }
    console.log(req.body["ipaddress"]);
    try{
        const response=await fetch(`https://ipinfo.io/${req.body["ipaddress"]}?token=8733a70279a0b7`);
        const result=await response.json();
        data.push(result);
        res.render("main.ejs",{
            result:result
            });

    }catch(error){
        console.log(error);
    }
});
app.get("/location",async(req,res)=>{
    try{
        const result=data[0];
        const location=result.loc;
        console.log(location);
         res.redirect(`https://www.google.com/maps/search/?api=1&query=${location}`);
    }catch(error){
          console.log('error');
    }

});
app.get("/header",(req,res)=>{
    res.render("partials/header.ejs");
});
app.listen(port,()=>{
   console.log(`Server running at port no ${port}`);
});
