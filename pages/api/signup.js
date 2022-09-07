import User from "../../models/User";
import connectdb from "../../middleware/mongoose";
//Eyncryption
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {

    if (req.method === "POST") {
        const { name, email } = req.body
        let p = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, "Harsh").toString() })
        await p.save();
        res.status(200).json({ success: true, p: p });
    } else {
        res.status(400).json({success:false, error: "This method is not allowed" });
    }

}
export default connectdb(handler)

