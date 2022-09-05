import User from "../../models/User";
import connectdb from "../../middleware/mongoose";

const handler = async (req,res)=>{

    if(req.method === "POST"){
     let  p = new User(req.body)
     console.log(p)
    await   p.save();
    res.status(200).json({success:"success",p:p})
    }else{
        res.status(400).json({error:"This method is not allowed"})
    }
   
}
export default connectdb(handler)

