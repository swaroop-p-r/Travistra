const User = require('../model/User')
const Package = require('../model/Package')
const path = require('path')
const fs = require('fs').promises

const adminViewUser = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        console.log(err)
    }
}

const adminDeleteUser = async (req, res) => {
    try {
        const id = req.headers.userid
        // console.log("backendid:",id)
        const deletedUser = await User.findByIdAndDelete({ _id: id })
        if (deletedUser) {
            res.json({ msg: "User Deleted", status: 200 })
        } else {
            res.json({ msg: "User Not Deleted!", status: 400 })
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "Server Error", status: 500 })
    }
}

const adminToggleUserStatus = async (req, res) => {
    const id = req.headers.userid
    // console.log("backend status:",id)
    try {
        // const id=req.headers.userid

        const user = await User.findById({ _id: id })
        if (!user) {
            return res.json({ msg: "User not found", status: 400 })
        }
        user.status = !user.status
        await user.save()
        res.json({
            msg: `User is now ${user.status ? "Active" : "Deactive"}`,
            status: 200,
            status: user.status
        })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Server Error", status: 500 })
    }
}

const adminAddPackage = async (req, res) => {
    try {
        const {
            package_name,
            destination,
            duration,
            price,
            seats,
            total_seats,
            status
        } = req.body;

        // Get itinerary array
        let itinerary = [];
        if (Array.isArray(req.body.itinerary)) {
            itinerary = req.body.itinerary;
        } else if (typeof req.body.itinerary === 'string') {
            itinerary = [req.body.itinerary];
        }

        // Collect image filenames from multer
        const imageFiles = req.files.map(file => file.filename);

        // Create and save new package
        const newPackage = new Package({
            package_name,
            destination,
            duration,
            price,
            seats,
            total_seats,
            status,
            itinerary,
            images: imageFiles
        });

        await newPackage.save();
        res.status(200).json({ msg: 'Package created successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Something went wrong.' });
    }
}

const adminViewPackage = async (req, res) => {
    try {
        const package = await Package.find()
        res.json(package)
    } catch (err) {
        console.log(err)
        res.json({ msg: 'Server Error', status: 500 })
    }
}

const adminTogglePackageStatus = async (req, res) => {
    const id = req.headers.userid
    // console.log("backend status:",id)
    try {
        // const id=req.headers.userid

        const package = await Package.findById({ _id: id })
        if (!package) {
            return res.json({ msg: "Package not found", status: 400 })
        }
        package.status = package.status === 'Active' ? 'Inactive' : 'Active'
        await package.save()
        res.json({
            msg: `Package is now ${package.status}`,
            status: 200,
            status: package.status
        })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Server Error", status: 500 })
    }
}

const adminDeletePackage = async (req, res) => {
    try {
        const id = req.headers.userid

        const packageToDelete = await Package.findById({ _id: id })
        if (!packageToDelete) {
            return res.json({ msg: "Package not Found!", status: 400 })
        }
        const imagePaths = (packageToDelete.images || []).map(imageName =>
            path.join(__dirname, '..', 'uploads', imageName)
        );
        await Package.findByIdAndDelete(id);
        for (const imagePath of imagePaths) {
            try {
                await fs.unlink(imagePath)
            } catch (err) {
                console.log(`Failed to delete image file: ${imagePath}`, err)
                return res.json({ msg: `Cannot access image file: ${imagePath}\nPacakge Deleted`, status: 500 })
            }
        }

        res.json({ msg: "Package deleted successfully", status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Server Error", status: 500 })
    }
}

// const adminDeletePackage = async (req, res) => {
//     try {
//         const id = req.headers.userid
//         const deletedPackage = await Package.findByIdAndDelete(id)
//         if (deletedPackage) {
//             res.json({ msg: "Package Deleted", status: 200 })
//         } else {
//             res.json({ msg: "Package Not Deleted!", status: 400 })
//         }
//     } catch (err) {
//         console.log(err)
//         res.json({ msg: "Server Error", status: 500 })
//     }
// }

const adminViewPackageById = async (req, res) => {
    try {
        const id = req.params.id
        const package = await Package.findById(id)
        if (!package) {
            return res.json({ msg: "Package Not Found", status: 400 })
        }
        res.json(package)
    } catch (err) {
        console.log(err)
        res.json({ msg: "Server Error", status: 500 })
    }
}

const adminUpdatePackage = async (req, res) => {
    try {
        const id = req.headers.userid;
        if (!id) {
            return res.json({ status: 400, msg: 'Missing package ID in headers' });
        }

        const {
            package_name,
            destination,
            duration,
            price,
            seats,
            total_seats
        } = req.body;

        console.log("Full req.body:", req.body);

        let itinerary = req.body.itinerary
        console.log("Received itinerary:", itinerary);

        if (!itinerary) {
            itinerary = [];
        } else if (!Array.isArray(itinerary)) {
            itinerary = [itinerary];
        }

        const newImages = req.files.map(file => file.filename);

        const pkg = await Package.findById(id);
        if (!pkg) {
            return res.json({ status: 404, msg: 'Package not found' });
        }

        pkg.package_name = package_name;
        pkg.destination = destination;
        pkg.duration = duration;
        pkg.price = price;
        pkg.seats = seats;
        pkg.total_seats = total_seats;
        pkg.itinerary = itinerary;

        if (newImages.length > 0 && pkg.images && pkg.images.length > 0) {
            for (const img of pkg.images){
                const imgPath = path.join(__dirname,'..','uploads',img)
                try {
                    await fs.unlink(imgPath)
                } catch (err) {
                    console.log(`Deletion Failed ${imgPath}`,err)
                }
            }
            pkg.images=newImages
        }

        await pkg.save();
        res.json({ status: 200, msg: 'Package updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, msg: 'Server error' });
    }
};



module.exports = { adminUpdatePackage, adminViewPackageById, adminDeletePackage, adminTogglePackageStatus, adminViewPackage, adminAddPackage, adminViewUser, adminDeleteUser, adminToggleUserStatus }