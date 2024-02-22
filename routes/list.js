const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Session = require("../models/session");
const List = require("../models/list");
const { ERROR_MESSAGES, SUCCESS_MESSAGES, SESSION } = require("../constants");
const { authenticate } = require("../middlewares/auth");
const _ = require("lodash");

//Create List API Endpoint
// router.post("/list", authenticate, async (req, res) => {
//   try {
//     const { loggedInUserData } = req;
//     const { name } = req.body;
//     const createListPayload = {
//       name,
//       createdBy: loggedInUserData.user._id,
//     };
//     const listToCreate = await List.create(createListPayload);
//     const createdList = await List.findById(listToCreate._id)
//       .populate({
//         path: "createdBy",
//         model: User,
//       })
//       .exec();
//     res.status(200).json({
//       message: SUCCESS_MESSAGES.LIST.LIST_CREATED_SUCCESSFULLY,
//       data: {
//         list: createdList,
//       },
//     });
//   } catch (err) {
//     console.log("Err", err);
//   }
// });
// //Update list API Endpoint
// router.put("/list/:listId", authenticate, async (req, res) => {
//   try {
//     const { loggedInUserData } = req;
//     const { listId } = req.params;
//     const list = await List.findOne({
//       _id: listId,
//       isArchive: false,
//     });
//     if (!list) {
//       throw new Error(ERROR_MESSAGES.LIST.LIST_NOT_FOUND);
//     }
//     await List.findByIdAndUpdate(listId, {
//       ...req.body,
//       updatedBy: loggedInUserData.user._id,
//     });
//     res.status(200).json({
//       message: SUCCESS_MESSAGES.LIST.LIST_UPDATED_SUCCESSFULLY,
//       data: {
//         list: await List.findById(listId),
//       },
//     });
//   } catch (err) {
//     console.log("Err", err);
//   }
// });
// //Archive List API Endpoint
// router.put("/list/:listId/archive", authenticate, async (req, res) => {
//   try {
//     const { loggedInUserData } = req;
//     const { listId } = req.params;
//     const list = await List.findById(listId);
//     if (!list) {
//       res.status(404).json({
//         message: ERROR_MESSAGES.LIST.LIST_NOT_FOUND,
//       });
//     }
//     if (list.isArchive) {
//       res.status(400).json({
//         message: ERROR_MESSAGES.LIST.LIST_ALREADY_ARCHIVED,
//       });
//     }
//     await List.findByIdAndUpdate(listId, {
//       isArchive: true,
//       updatedBy: loggedInUserData.user._id,
//     });
//     res.status(200).json({
//       message: SUCCESS_MESSAGES.LIST.LIST_UPDATED_SUCCESSFULLY,
//       data: {
//         list: await List.findById(listId),
//       },
//     });
//   } catch (err) {
//     console.log("Err", err);
//   }
// });
// //Unarchive list API Endpoint
// router.put("/list/:listId/un-archive", authenticate, async (req, res) => {
//   try {
//     const { loggedInUserData } = req;
//     const { listId } = req.params;
//     const list = await List.findById(listId);
//     if (!list) {
//       res.status(404).json({
//         message: ERROR_MESSAGES.LIST.LIST_NOT_FOUND,
//       });
//     }
//     if (!list.isArchive) {
//       res.status(400).json({
//         message: ERROR_MESSAGES.LIST.LIST_ALREADY_UN_ARCHIVED,
//       });
//     }
//     await List.findByIdAndUpdate(listId, {
//       isArchive: false,
//       updatedBy: loggedInUserData.user._id,
//     });
//     res.status(200).json({
//       message: SUCCESS_MESSAGES.LIST.LIST_UPDATED_SUCCESSFULLY,
//       data: {
//         list: await List.findById(listId),
//       },
//     });
//   } catch (err) {
//     console.log("Err", err);
//   }
// });
// //Show List of lists API Endpoint
// router.get("/list", authenticate, (req, res) => {
//   //do code
// });
// //Get List by Id API Endpoint
// router.get("/list/:listId", authenticate, async (req, res) => {
//   try {
//     // const { loggedInUserData } = req;
//     const { listId } = req.params;
//     const list = await List.findById(listId);
//     if (!list) {
//       res.status(404).json({
//         message: ERROR_MESSAGES.LIST.LIST_NOT_FOUND,
//       });
//     }
//     res.status(200).json({
//       message: SUCCESS_MESSAGES.LIST.LIST_FETCHED_SUCCESSFULLY,
//       data: {
//         list,
//       },
//     });
//   } catch (err) {
//     console.log("Err", err);
//   }
// });

module.exports = router;
