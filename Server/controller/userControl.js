const User = require('../model/User')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const { username, address, email, password, dob, phone, gender } = req.body;
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.json({ msg: "Email already exists", status: 400 });
        }

        const profileImage = req.files?.profile_image?.[0]?.filename || null;
        const image = req.files?.image?.[0]?.filename;

        if (!image) {
            return res.json({msg:'ID photo is requires',status:400});
        }

        const data = new User({
            username,
            address,
            email,
            password,
            dob,
            phone,
            gender,
            profile_image:profileImage,
            image:image
        });
        await data.save();
        res.json({ msg: "User registered successfully", status: 200 });
    } catch (err) {
        console.log(err);
        res.json({ msg: "Server error. Please try again later.", status: 500 });
    }
}

const loginAdminUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email == process.env.AdminEmail && password == process.env.AdminPassword) {
            const token = jwt.sign({ email, role: "admin" }, process.env.jwtSecretkey, { expiresIn: "1h" })
            res.json({ msg: "Admin login successfull", status: 200, token, role: "admin" })
        }
        else {
            const user = await User.findOne({ email })
            if (user) {
                if (user.password === password) {
                    if (!user.status) {
                        return res.json({ msg: "Account is inactive. Contact admin.", status: 400 })
                    }
                    const token = jwt.sign({ id: user._id, role: user.role }, process.env.jwtSecretkey, { expiresIn: "1h" })
                    res.json({ msg: "User login successfull", status: 200, token, role: "user" })
                }
                else {
                    res.json({ msg: "Invaild Password", status: 400 })
                }
            }
            else {
                res.json({ msg: "Invaild User", status: 400 })
            }
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "Server error. Please try again later.", status: 500 })
    }
}


module.exports = { registerUser, loginAdminUser };

