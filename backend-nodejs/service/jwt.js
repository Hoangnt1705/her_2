import jwt from "jsonwebtoken"

export const clearTokenList = (tokenlist) => {
    for (let key in tokenlist) {
        try {
            //verify access token để xem đã hết thời hạn sống chưa, nếu thành công thì sẽ giữ lại
            jwt.verify(tokenlist[key], process.env.JWT_SECRET_KEY, { complete: true })
        } catch (error) {
            // nếu hết thời hạn sống của token thì sẽ xóa khỏi black list
            delete tokenlist[key]
        }
    }
}