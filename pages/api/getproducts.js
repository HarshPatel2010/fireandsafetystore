import  Product from "../../models/Product";
import connectdb from "../../middleware/mongoose";

const handler = async (req,res)=>{
    let products = await Product.find();
    let panel = {};
    for (let item of products){
            if(item.title in panel){
                console.log(panel,"pnL")
                if( !panel[item.title].color.includes(item.color) && item.availableQty>0 ){
                    panel[item.title].color.push(item.color);
                }
                if( !panel[item.title].size.includes(item.size) &&  item.availableQty > 0){
                    panel[item.title].size.push(item.size);
                }

            }else{
                console.log(panel,"pnL ESl")
                panel[item.title]=JSON.parse(JSON.stringify(item));
                if(item.availableQty > 0 ){
                    panel[item.title].color=[item.color];
                    panel[item.title].size = [item.size];
                }
               
                    // panel[item.title].color=[item.color];
                    // panel[item.title].size = [item.size];
            
            }
    }
    res.status(200).json({panel})
}
export default connectdb(handler)