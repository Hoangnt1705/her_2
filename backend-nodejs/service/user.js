import Customer from "../model/Customer.js"
import Staff from "../model/Staff.js"

export const handleUser = async user => {
    if (!user) return user
    const deepUser = { ...user._doc }

    try {
        const [isStaff, isCustomer] = await Promise.all(
            [
                Staff.exists({ _id: user.role }),
                Customer.exists({ _id: user.role })
            ]
        )
        user = await user.populate(
            {
                path: 'role',
                model: isStaff ? Staff : (isCustomer ? Customer : "")
            }
        )
        return { ...user._doc }
    } catch (error) {
        console.log(error)
        return deepUser
    }
}