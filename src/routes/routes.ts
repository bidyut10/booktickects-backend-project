import express from 'express'
const router = express.Router();
const userController = require("../controller/userController");
const ticketsController = require("../controller/ticketsController");
const auth = require("../authentication/auth")


router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/alltickets/:userID", auth.Authentication, userController.availableTicketsForUsers);


router.post("/createticket", auth.Authentication, ticketsController.createTicket);
router.get("/myticket/:sellerID", auth.Authentication, ticketsController.availableTickets);





router.all("/***", function (req:express.Request, res:express.Response) {
  res.status(404).send({
    status: false,
    msg: "Invalid Request",
  });
});

module.exports = router;