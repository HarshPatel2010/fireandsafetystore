import  Product from "../../models/Product";
import connectdb from "../../middleware/mongoose";

const handler = async (req,res)=>{
    let products = await Product.find()
    res.status(200).json(products)
}
export default connectdb(handler)