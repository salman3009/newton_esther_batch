const express = require("express");

const {
    getAllUsers, getUserByID, createUser
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserByID);
router.post("/", createUser);

module.exports = router;