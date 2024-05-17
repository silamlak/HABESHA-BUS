import mongoose from "mongoose";
import { c_e_h } from "../error_handller/custom_error_handller.js";
import busModel from "../models/bus.js";
import routesModel from "../models/routesModel.js";
import scheduleModel from "../models/scheduleModel.js";
import { body, validationResult } from "express-validator";

//operator on routes

export const addRoute = async (req, res, next) => {
  const validations = [
    body("routeId")
      .notEmpty()
      .withMessage("add route id")
      .custom(async (value) => {
        const route = await routesModel.findOne({ routeId: req.body.routeId });
        if (route) throw new Error("The Route Already Exist");
      }),
    body("routeName")
      .notEmpty()
      .withMessage("add route name")
      .custom(async (value) => {
        const route = await routesModel.findOne({
          routeName: req.body.routeName,
        });
        if (route) throw new Error("The Route Name Already Exist");
      }),
    body("routeDescription").notEmpty().withMessage("add description"),
    body("routeType").notEmpty().withMessage("add route type"),
    body("starting_city").notEmpty().withMessage("add starting city"),
    body("destination_city").notEmpty().withMessage("add destination city"),
    body("distance").notEmpty().withMessage("add route distance"),
    body("duration").notEmpty().withMessage("add route duration"),
  ];

  try {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      routeId,
      routeName,
      routeDescription,
      routeType,
      starting_city,
      destination_city,
      distance,
      duration,
    } = req.body;

    const newRoute = new routesModel({
      routeId,
      routeName,
      routeDescription,
      routeType,
      starting_city,
      destination_city,
      distance,
      duration,
    });

    await newRoute.save();

    res.status(201).json({ message: "route created" });
  } catch (error) {
    next(error);
  }
};

export const updateRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params;
    const bus = await routesModel.findById(routeId);
    if (!bus) return res.status(404).json({ message: "no route found" });
    const updated_route = await routesModel.findByIdAndUpdate(
      routeId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated_route);
  } catch (err) {
    next(err);
  }
};

export const removeRoute = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { routeId } = req.params;

    const route = await routesModel.findById(routeId).session(session);
    if (!route) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "route not found" });
    }

    await mongoose.connection
      .collection("deleted_routes")
      .insertOne(route, { session });

    await routesModel.findByIdAndDelete(routeId).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "route deleted and archived successfully" });
  } catch (err) {
    next(err);
  }
};

//operator on schedule

export const addSchedule = async (req, res, next) => {
  try {
    const validations = [
      body("route_id").notEmpty().withMessage("route is required"),
      body("bus_id").notEmpty().withMessage("bus is required"),
      body("schedule_date").notEmpty().withMessage("schedule date is required"),
    ];
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newSchedule = new scheduleModel(req.body);
    await newSchedule.save();
    res.status(201).json({ message: "new schedule added" });
  } catch (err) {
    next(err);
  }
};

export const updateSchedule = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const bus = await scheduleModel.findById(scheduleId);
    if (!bus) return res.status(404).json({ message: "no bus found" });
    const updated_schedule = await scheduleModel.findByIdAndUpdate(
      scheduleId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated_schedule);
  } catch (err) {
    next(err);
  }
};

export const removeSchedule = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { scheduleId } = req.params;

    const schedule = await scheduleModel.findById(scheduleId).session(session);
    if (!schedule) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "schedule not found" });
    }

    await mongoose.connection
      .collection("deleted_schedule")
      .insertOne(schedule, { session });

    await scheduleModel.findByIdAndDelete(scheduleId).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "schedule deleted and archived successfully" });
  } catch (err) {
    next(err);
  }
};

//operator on buses

export const addBus = async (req, res, next) => {
  try {
    const validations = [
      body("busNumber").notEmpty().withMessage("bus number is required"),
      body("capacity").notEmpty().withMessage("capacity is required"),
      body("model").notEmpty().withMessage("model is required"),
    ];
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newBus = new busModel(req.body);
    await newBus.save();
    res.status(201).json({ message: "new bus added" });
  } catch (err) {
    next(err);
  }
};

export const updateBus = async (req, res, next) => {
  try {
    const { busId } = req.params;
    const bus = await busModel.findById(busId);
    if (!bus) return res.status(404).json({ message: "no bus found" });
    const updated_bus = await busModel.findByIdAndUpdate(
      busId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated_bus);
  } catch (err) {
    next(err);
  }
};

export const removeBus = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { busId } = req.params;

    const operator = await busModel.findById(busId).session(session);
    if (!operator) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "bus not found" });
    }

    await mongoose.connection
      .collection("deleted_bus")
      .insertOne(operator, { session });

    await busModel.findByIdAndDelete(busId).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "bus deleted and archived successfully" });
  } catch (err) {
    next(err);
  }
};
