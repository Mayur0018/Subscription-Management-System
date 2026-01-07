import { Router  } from "express";

const subscritionRouter = Router();

subscritionRouter.post("/subscribe",(req,res)=>{
    res.send({title: "GET all subscription"});
})