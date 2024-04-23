import express from "express"
import Customer from "../../model/Customer.js"
import { sendError, sendServerError, sendSuccess } from "../../helper/client.js"
import User from "../../model/User.js";


const customerAdminRoute = express.Router();

/**
 * @route PUT /api/customer/:id
 * @description Update a customer
 * @access public
 */
customerAdminRoute.put('/:id', async (req, res) => {
    let id = req.params.id;
    const isExist = await Customer.exists({ _id: id })
    if (!isExist) { return sendError(res, 'Customer does not exist.') }
    const { name, address, description, rank_passers } = req.body;
    // res.send(req.body)
    try {
        await Customer.findByIdAndUpdate(id, { name: name, address: address, description: description, rank_passers: rank_passers })
        return sendSuccess(res, 'Customer updated successfully.')
    }
    catch (err) {
        return sendServerError(res);
    }
})
/**
 * @route DELETE /api/customer/:id
 * @description delete a customer
 * @access public
 */
customerAdminRoute.delete('/:id', async (req, res) => {
    let id = req.params.id;
    const isExist = await Customer.exists({ _id: id })
    if (!isExist) { return sendError(res, 'Customer does not exist.') }

    try {
        await Customer.findByIdAndRemove(id)
        const userfind = await User.find({ role: id })
        User.findByIdAndRemove(userfind[0]._id)
            .then(() => {
                return sendSuccess(res, "Delete customer user successfully.")
            })
    }
    catch (err) {
        sendServerError(res)
    }
})


/**
 * @route GET /api/customer
 * @description get customers , id
 * @access public
 */
customerAdminRoute.get("/", async (req, res) => {
  const id = req.query.id ? req.query.id : null;
  const keyword = req.query.keyword ? req.query.keyword : null;
  const sort = req.query.sort || 1;
  let query = {};
  if (id) {
    query = { _id: id };
  } else if (keyword) {
    query = {
      $or: [
        {
          name: { $regex: keyword, $options: "$i" },
        },
        {
          address: { $regex: keyword, $options: "$i" },
        },
        {
          description: { $regex: keyword, $options: "$i" },
        },
        
      ],
    };
  };
  try {
    const result = await Customer.find(query).sort({ name: sort });
    if (result) return sendSuccess(res, "Get customers successfully.", result);
    return sendError(res, "No information found.");
  } catch (err) {
    sendServerError(res);
  }
});

export default customerAdminRoute;