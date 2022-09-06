import User from "../../models/User";
import connectdb from "../../middleware/mongoose";
var jwt = require('jsonwebtoken');

//Eyncryption
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {

    if (req.method === "POST") {

        let user = await User.findOne({ "email": req.body.email });

        if (user) {
            // Decrypt
            const bytes = CryptoJS.AES.decrypt(user.password, 'Harsh');
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.email === user.email && req.body.password ===originalText) {
                const token = jwt.sign({  email: user.email, name: user.name }, 'harsh',{expiresIn:"2d"});
                res.status(200).json({token,success: true})
            } else {
                res.status(400).json({ success: false, error: "Invalid Credentials" })
            }
        } else {
            res.status(400).json({ success: false, error: "user doesnot exist" })
        }


    } else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}
export default connectdb(handler)

