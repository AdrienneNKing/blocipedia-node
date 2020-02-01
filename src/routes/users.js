const express = require("express");
const router = express.Router();
const validation = require("./validation");

const userController = require("../controllers/userController")

router.get("/users/sign_up", userController.signUp);
router.get("/users/upgrade", userController.payment);
router.get("/users/upgrade/success", userController.upgradeSuccess);
router.post("/users", validation.validateUsers, userController.create);
router.get("/users/sign_in", userController.signInForm);
router.post("/users/sign_in", validation.validateUsers, userController.signIn);
router.get("/users/sign_out", userController.signOut);
router.get("/users/cancel", userController.cancellationSuccess);
router.get("/users/cancelled", userController.cancel);
router.get("/users/prime", userController.primeMember);

module.exports = router;
