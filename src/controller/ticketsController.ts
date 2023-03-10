import express from "express";
const userModel = require("../model/users");
const ticketModel = require("../model/tickets");


const createTicket = async function ( req: express.Request, res: express.Response ) {
  try {
    let data = req.body;

    //empty Body
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        message: "Please provide your Ticket details",
      });
    }

    let sellerID = data.sellerID;

    if (!/^[0-9a-fA-F]{24}$/.test(sellerID)) {
      return res
        .status(400)
        .send({ status: false, message: "Incorrect ID" });
    }

    const sellerIdCheck = await userModel.findOne({
      _id: sellerID,
      accountType: "Seller",
    });

    // console.log(sellerIdCheck)
    // console.log(sellerID);

    if (!sellerIdCheck) {
      return res.status(404).send({ status: false, message: "Invalid ID" });
    }

    let saveData = await ticketModel.create(data);

    {
      return res
        .status(201)
        .send({ status: true, message: "Success", data: saveData });
    }
  } catch (err) {
    {
      return res
        .status(500)
        .send({ status: false, message: "Error", error: err.message });
    }
  }
};

const availableTickets = async function (
  req: express.Request,
  res: express.Response
) {
  try {

    let sellerID = req.params.sellerID;

    if (!/^[0-9a-fA-F]{24}$/.test(sellerID)) {
      return res.status(400).send({ status: false, message: "Incorrect ID" });
    }

    const sellerIdCheck = await userModel.findById({
      _id: sellerID
    });

    if (!sellerIdCheck) {
      return res.status(404).send({ status: false, message: "You Dont Have Any Tickets In your Account" });
    } 

    const ticketData = await ticketModel.find({
      sellerID: sellerID,
      isDeleted: false
    });
    
    {
      return res
        .status(201)
        .send({ status: true, message: "Success", data: ticketData });
    }
  } catch (err) {
    {
      return res
        .status(500)
        .send({ status: false, message: "Error", error: err.message });
    }
  }
};


module.exports = { createTicket, availableTickets };