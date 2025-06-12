const Package = require('../model/Package');
const User = require('../model/User')
const jwt = require('jsonwebtoken');
const Vehicle = require('../model/Vehicle');
const Booking = require('../model/Booking');
const Payment = require('../model/Payment');

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
            return res.json({ msg: 'ID photo is required', status: 400 });
        }

        const data = new User({
            username,
            address,
            email,
            password,
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
        const user = await User.findById(id);
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

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                username,
                address,
                password,
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

module.exports = { userCancelBooking, userViewPayment, userPayment, userBookingForPayment, userConfirmPackage, userViewBookings, userBookPackage, userSelectPackage, userViewPackages, userEditProfile, userProfilebyid, userViewProfile, registerUser, loginAdminUser };

