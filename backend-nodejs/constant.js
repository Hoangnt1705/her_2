import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./public/uploads/${req.dirName}/`)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now()
        const filename = file.originalname  // name.jpg
        const part = filename.split(".")
        part[part.length - 2] += uniqueSuffix   // name+uniqeSuffix.jpg
        cb(null, part.join("."))
    }
})
export const upload = multer({ storage })

const storageResources = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./public/${req.dirName}/`)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now()
        const filename = file.originalname  // name.jpg
        const part = filename.split(".")
        part[part.length - 2] += uniqueSuffix   // name+uniqeSuffix.jpg
        cb(null, part.join("."))
    }
})
export const uploadResources = multer({ storage: storageResources })

export const SESSION_AGE = 600000 // unit: milisecond
export const JWT_EXPIRED = '7d' 
export const JWT_REFRESH_EXPIRED = '30d'
export const OTP_EXPIRED = 60000 // unit: milisecond

export const VERIFY_OP = {
    email: 'email',
    phone: 'phone'
}

export const CUSTOMER_RANK = {
    GOLD: 'gold',
    UNRANK: 'unrank'
}

export const POSITION = {
    INTERN: 'Intern',
    JUNIOR: 'Junior',
    SENIOR: 'Senior',
    CONTRIBUTOR: 'Contributor'
}

export const STAFF = {
    ADMIN: 'admin',
    DRIVER: 'driver',
    SHIPPER: 'shipper',
    STOREKEEPER: 'storekeeper',
    STAFF: 'staff'
}
