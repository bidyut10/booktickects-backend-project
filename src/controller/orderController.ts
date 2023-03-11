import express from "express";
const userModel = require("../model/users");
const ticketModel = require("../model/tickets");
const orderModel =require('../model/order')

const createOrder = async function (
  req: express.Request,
  res: express.Response
) {
  try {
    let data = req.body;

    //empty Body
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        message: "Please provide your Ticket details",
      });
    }

    //user

    let userID = data.userID;

    if (!/^[0-9a-fA-F]{24}$/.test(userID)) {
      return res.status(400).send({ status: false, message: "Incorrect ID" });
    }

    const userIDCheck = await userModel.findById({
      _id: userID,
    });

    if (!userIDCheck) {
      return res
        .status(404)
        .send({
          status: false,
          message: "Invalid ID",
        });
    } 

    //ticket

    if (!/^(?:[1-9]|10)$/.test(data.noOfTickects)) {
      return res.status(400).send({
        status: false,
        message: "Buy Max 10 Tickets at a Time",
      });
    }

    let ticketID = data.ticketID;

    if (!/^[0-9a-fA-F]{24}$/.test(ticketID)) {
      return res.status(400).send({ status: false, message: "Incorrect ID" });
    }

    const ticketIDCheck = await ticketModel.findOne({
      _id: ticketID,
      isAvailable: true,
      totalTickects: { $gte: data.noOfTickects },
      isDeleted: false,
    });

    if (!ticketIDCheck) {
      return res
        .status(404)
        .send({ status: false, message: "Invalid Ticket, Check Properly" });
    }

    

    //create order
    let saveData = await orderModel.create(data);

    //response
    const orderdetails = {
      orderID: saveData._id,
      ticketID: ticketIDCheck._id,
      noOfTickects: saveData.noOfTickects,
      tickectPrice: ticketIDCheck.tickectPrice * data.noOfTickects,
      showName: ticketIDCheck.showName,
      showPlace: ticketIDCheck.showPlace,
      showDate: ticketIDCheck.showDate,
      showTime: ticketIDCheck.showTime,
      isCancled: saveData.isCancled,
    };

    //update ticket feild

    const updateTicket = await ticketModel.findByIdAndUpdate(
      { _id: ticketID },
      {
        $set: {
          totalTickects: ticketIDCheck.totalTickects - data.noOfTickects,
        },
      }
    );

    // console.log(updateTicket.totalTickects);

    
      const updateTicketQuantity = await ticketModel.updateOne(
        { _id: ticketID, totalTickects: 0 },
        {
          $set: {
            isAvailable: false,
          },
        }
      );
    

    {
      return res.status(201).send({
        status: true,
        message: "Order Successfully",
        data: orderdetails,
      });
    }
  } catch (err) {
    {
      return res
        .status(500)
        .send({ status: false, message: "Error", error: err.message });
    }
  }
};


module.exports = { createOrder };