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

const userViewProfile=async(req,res)=>{
    try {
        const id = req.user.id;
        // console.log(id)
        const user= await User.findById(id);
        if (!user) {
            return res.json({msg:'User Not Found!', status:400})
        }
        res.json(user);
    } catch (err) {
        console.log('Server Error',err)
    }
}

const userProfilebyid=async(req,res)=>{
    try {
        const id=req.headers.id;
        const user= await User.findById(id);
        if (!user) {
            return res.json({msg:'User Not Found!', status:400})
        }
        res.json(user);
    } catch (err) {
        console.log('Server Error',err)
        res.json({msg:'Server Error', status:500})
    }
}

const userEditProfile=async(req,res)=>{
    try {
        const id=req.headers.id;
        // console.log(id)
        if (!id) {
            return res.json({msg:'ID Not Found!', status:400})
        }
        const user= await User.findById(id);
        if (!user) {
            return res.json({msg:'User Not Found!', status:400})
        }
        const {
            username,
            address,
            password,
            dob,
            phone,
            gender,
        } = req.body;
        const profileImage=req.files?.profile_image?.[0]?.filename || user.profile_image;
        const Image=req.files?.image?.[0]?.filename || user.image;

        if (!Image) {
            return res.json({msg:'ID Photo Required', status:400})
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
        {
            username,
            address,
            password,
            dob,
            phone,
            gender,
            profile_image:profileImage,
            image:Image
        },
        { new: true }
    )
        if (!updatedUser) {
            return res.json({msg:'Updating Error', status:400})
        }
        res.json({msg:'Profile Updated Successfully', status:200, user:updatedUser})

    } catch (err) {
        console.log('Server Error',err)
        res.json({msg:'Server Error', status:500})
    }
}


module.exports = { userEditProfile, userProfilebyid, userViewProfile, registerUser, loginAdminUser };

