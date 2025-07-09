const Package = require('../model/Package');
const User = require('../model/User')
const jwt = require('jsonwebtoken');
const Vehicle = require('../model/Vehicle');
const Booking = require('../model/Booking');
const Payment = require('../model/Payment');

const Otp = require('../model/OTP');
const { sendMail } = require('../utils/mailer');

const argon2 = require('argon2')

const registerUser = async (req, res) => {
    try {
        const { username, address, email, password, dob, phone, gender } = req.body;
        const existUser = await User.findOne({ email });
        if (email === process.env.AdminEmail) {
            return res.json({ msg: "Email already exists", status: 400 });
        }
        if (existUser) {
            return res.json({ msg: "Email already exists", status: 400 });
        }

        const profileImage = req.files?.profile_image?.[0]?.filename || null;
        const image = req.files?.image?.[0]?.filename;

        if (!image) {
            return res.json({ msg: 'ID photo is required', status: 400 });
        }

        const hashedPassword = await argon2.hash(password);

        const data = new User({
            username,
            address,
            email,
            password: hashedPassword,
            dob,
            phone,
            gender,
            profile_image: profileImage,
            image: image
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
                const isMatch = await argon2.verify(user.password, password);
                if (isMatch) {
                    if (!user.status) {
                        return res.json({ msg: "Account is inactive. Contact admin.", status: 400 })
                    }
                    const token = jwt.sign({ id: user._id, role: user.role }, process.env.jwtSecretkey, { expiresIn: "1h" })
                    res.json({ msg: "User login successfull", status: 200, token, role: "user" })
                }
                else {
                    res.json({ msg: "Invaild Password", status: 401 })
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

const userViewProfile = async (req, res) => {
    try {
        const id = req.user.id;
        // console.log(id)
        const user = await User.findById(id);
        if (!user) {
            return res.json({ msg: 'User Not Found!', status: 400 })
        }
        res.json(user);
    } catch (err) {
        console.log('Server Error', err)
    }
}

const userProfilebyid = async (req, res) => {
    try {
        const id = req.headers.id;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.json({ msg: 'User Not Found!', status: 400 })
        }
        res.json(user);
    } catch (err) {
        console.log('Server Error', err)
        res.json({ msg: 'Server Error', status: 500 })
    }
}

const userEditProfile = async (req, res) => {
    try {
        const id = req.headers.id;
        // console.log(id)
        if (!id) {
            return res.json({ msg: 'ID Not Found!', status: 400 })
        }
        const user = await User.findById(id);
        if (!user) {
            return res.json({ msg: 'User Not Found!', status: 400 })
        }
        const {
            username,
            address,
            password,
            dob,
            phone,
            gender,
        } = req.body;
        const profileImage = req.files?.profile_image?.[0]?.filename || user.profile_image;
        const Image = req.files?.image?.[0]?.filename || user.image;

        if (!Image) {
            return res.json({ msg: 'ID Photo Required', status: 400 })
        }

        let hashedPassword = user.password;
        if (password && password.trim() !== '') {
            hashedPassword = await argon2.hash(password);
        }
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                username,
                address,
                password: hashedPassword,
                dob,
                phone,
                gender,
                profile_image: profileImage,
                image: Image
            },
            { new: true }
        )
        if (!updatedUser) {
            return res.json({ msg: 'Updating Error', status: 400 })
        }
        res.json({ msg: 'Profile Updated Successfully', status: 200, user: updatedUser })

    } catch (err) {
        console.log('Server Error', err)
        res.json({ msg: 'Server Error', status: 500 })
    }
}

const userViewPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (err) {
        console.log('Server Error', err)
    }
}

const userSelectPackage = async (req, res) => {
    try {
        const id = req.headers.id;
        // console.log(id)
        const package = await Package.findById(id)
        res.json(package);
    } catch (err) {
        console.log('Server Error', err)
    }
}

const userBookPackage = async (req, res) => {
    try {
        const userid = req.user.id;
        const packageid = req.headers.packageid;
        const { bookingDate, bookingTime } = req.body
        // console.log('BookedDate:',bookingDate);
        // console.log('BookedTime:',bookingTime);
        // console.log('UserId:',userid);
        // console.log('PackageId:',packageid);


        if (!bookingDate || !bookingTime) {
            return res.json({ msg: 'Please pick Date & Time', status: 400 })
        }


        const booking = new Booking({
            user: userid,
            package: packageid,
            status: 'Processing',
            paymentStatus: 'Pending',
            bookingDate,
            bookingTime,
        });
        await booking.save();
        res.json({ msg: 'Packge Booked', status: 200 });
    } catch (err) {
        console.log('Server Error', err);
        res.json({ msg: 'Server Error', status: 500 });
    }
}

const userViewBookings = async (req, res) => {
    try {
        const id = req.user.id;
        // console.log('userViewBookings:',id)
        const booking = await Booking.find({ user: id })
            .populate('package')
            .populate('vehicle')
        res.json(booking);
    } catch (err) {
        console.log('Server Error', err)
        res.json({ msg: 'Server Error', status: 500 });
    }
}

// const userViewAssignedVehicle=async (req,res) => {
//     try {
//         const vehicle = await Vehicle.findById(req.headers.vehicleid);
//         if (!vehicle) {
//             return res.json({ message: 'Vehicle not found', status:400 });
//         }
//         res.json(vehicle);
//     } catch (err) {
//         console.log('Server Error',err)
//         res.json({msg:'Server Error', status:500});
//     }
// }

const userConfirmPackage = async (req, res) => {
    try {
        const bookingid = req.headers.bookingid;
        const userid = req.user.id;
        // console.log('bookingid:',bookingid);
        // console.log('userid:',userid);
        const booking = await Booking.findByIdAndUpdate(bookingid,
            {
                status: 'Confirm',
            },
            { new: true }
        )
        // console.log(booking)
        if (!booking) {
            return res.json({ msg: 'Package Confirmation Error', status: 400 })
        } else if (booking.status === 'Confirm') {
            return res.json({ msg: 'Package Confirmed', status: 200 });
        } else {
            res.json({ msg: 'Package Status Updation Error', status: 400 })
        }
    } catch (err) {
        console.log('Server Error', err)
        res.json({ msg: 'Server Error' })
    }
}

const userBookingForPayment = async (req, res) => {
    try {
        const id = req.headers.id;
        // console.log('userBookingForPaymentID',id);
        const booking = await Booking.findById(id)
            .populate('package')
            .populate('vehicle')
            .populate('user')
        res.json(booking);
    } catch (err) {
        console.log('Server Error', err)
        res.json({ msg: 'Error Viewing Booking Details', status: 500 })
    }
}

const userPayment = async (req, res) => {
    try {
        const userid = req.headers.userid;
        const bookingid = req.headers.bookingid;
        const { amount, paymentMethod, paymentDetails } = req.body;
        // console.log('userPaymentuserid',userid);
        // console.log('userPaymentBid',bookingid);
        const checkBooking = await Booking.findById(bookingid);
        if (!checkBooking) {
            return res.json({ status: 404, msg: 'Booking not found' });
        }

        if (checkBooking.paymentStatus === 'Paid') {
            return res.json({ status: 400, msg: 'Payment already completed' });
        }


        const booking = await Booking.findByIdAndUpdate(bookingid,
            {
                paymentStatus: 'Paid',
            },
            { new: true }
        )

        const payment = new Payment({
            booking: bookingid,
            user: userid,
            amount,
            method: paymentMethod,
            paymentDetails: {
                upiId: paymentMethod === 'UPI' ? paymentDetails.upiId : undefined,
                cardNumber: paymentMethod === 'CARD' ? `**** **** **** ${paymentDetails.cardNumber.slice(-4)}` : undefined,
                expiry: paymentMethod === 'CARD' ? paymentDetails.expiry : undefined,
                bankName: paymentMethod === 'NETBANKING' ? paymentDetails.bankName : undefined
            }
        })
        await payment.save();
        return res.json({ status: 200, msg: 'Payment successful' });
    } catch (err) {
        console.log('Server Error', err)
        res.json({ msg: 'Payment Server Error', status: 500 })
    }
}

const userViewPayment = async (req, res) => {
    try {
        const bookingid = req.headers.bookingid;
        // console.log('userViewPaymentBid:',bookingid);
        const payment = await Payment.find({ booking: bookingid })
        // console.log(payment)
        if (!payment) {
            return res.json({ msg: 'Payment not Found!', status: 404 })
        }
        res.json(payment)
    } catch (err) {
        console.log('Server Error of userViewPayment', err)
        res.json({ msg: 'Server Error of View Payment', status: 500 })
    }
}

const userCancelBooking = async (req, res) => {
    try {
        const bookingid = req.headers.bookingid;
        // console.log('userCancelBookingBid:', bookingid)
        const booking = await Booking.findByIdAndUpdate(bookingid,
            {
                status: 'Cancelled',
            },
            { new: true }
        )
        if (!booking) {
            return res.json({ msg: 'Booking Status Cancellation Error', status: 400 })
        }
        if (booking.status === 'Cancelled') {
            return res.json({ msg: 'Booking Cancellation Confirmed', status: 200 })
        }
        res.json({ msg: 'Booking Status Cancellation Error', status: 400 });
    } catch (err) {
        console.log('Server Error of userCancelBooking', err)
        res.json({ msg: 'Server Error of Cancel Payment', status: 500 })
    }
}

const userHomeDetails = async (req, res) => {
    try {
        const userid = req.user.id;
        // console.log('userId:',userid)

        const user = await User.findById(userid);

        const username = user.username;
        const userProfilePhoto = user.profile_image;
        const userEmail = user.email;
        const userPhone = user.phone;
        const userStatus = user.status;
        // console.log(user)
        // console.log(userStatus)


        const totalUsers = await User.countDocuments();

        const totalBookings = await Booking.countDocuments({ user: userid });
        const confirmedBooking = await Booking.countDocuments({ user: userid, status: 'Confirm' });
        const cancelledBooking = await Booking.countDocuments({ user: userid, status: { $in: ['Cancelled', 'Admin Cancelled'] } });

        const totalPayment = await Payment.countDocuments({ user: userid });

        const totalVehicle = await Vehicle.countDocuments();
        const totalTraveller = await Vehicle.countDocuments({ type: 'Traveller' })
        const totalBus = await Vehicle.countDocuments({ type: 'Bus' })
        const totalCar = await Vehicle.countDocuments({ type: 'Car' })
        const totalJeep = await Vehicle.countDocuments({ type: 'Jeep' })

        const totalPackage = await Package.countDocuments();

        res.json({
            status: 200,

            username,
            userProfilePhoto,
            userEmail,
            userPhone,
            userStatus,

            totalUsers,

            totalBookings,
            confirmedBooking,
            cancelledBooking,

            totalPayment,

            totalVehicle,
            totalTraveller,
            totalBus,
            totalCar,
            totalJeep,

            totalPackage,

        });
    } catch (err) {
        console.log('Dashboard Server Error', err)
        res.status(500).json({ status: 500, msg: "Dashboard fetch failed", error: err.message });
    }
}

const sendOTP = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ msg: "Email not registered", status: 404 })
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to database (will expire automatically)
    await Otp.create({ email, otp });

    await sendMail(
        email,
        "Travistra Password Reset OTP",
        `Hello,

        We received a request to reset your password for your Travistra account.

        Your OTP is: ${otp}

        If you didn't request this, please ignore this email.

        Thanks,
        Travistra Team`,
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #2c3e50;">Travistra Password Reset</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password for your <strong>Travistra</strong> account.</p>
        <p>Your OTP is:</p>
        <p style="font-size: 24px; font-weight: bold; color: #e74c3c;">${otp}</p>
        <p>This OTP is valid for a limited time.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <br>
        <p>Thanks,<br>The Travistra Team</p>
        </div>
        `
    );


    res.json({ msg: "OTP sent to your email", status: 200 });
};

const passwordReset = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const record = await Otp.findOne({ email, otp }).sort({ createdAt: -1 });

    if (record) {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ msg: "User not found", status: 400 });
        }
        // if (!user.status) {
        //     return res.json({ msg: "Account is inactive", status: 400 });
        // }

        const hashedPassword = await argon2.hash(newPassword);

        user.password = hashedPassword;
        await user.save();

        await Otp.deleteMany({ email });  // Remove used OTP(s) (optional but recommended)

        res.json({ msg: "New Password Updated", status: 200 });
    } else {
        res.json({ msg: "Invalid or expired OTP, try later", status: 401 });
    }
};

module.exports = { passwordReset, sendOTP, userHomeDetails, userCancelBooking, userViewPayment, userPayment, userBookingForPayment, userConfirmPackage, userViewBookings, userBookPackage, userSelectPackage, userViewPackages, userEditProfile, userProfilebyid, userViewProfile, registerUser, loginAdminUser };


