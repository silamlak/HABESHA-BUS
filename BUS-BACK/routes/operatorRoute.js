import express from "express";
import {
  addBus,
  addRoute,
  addSchedule,
  removeBus,
  removeRoute,
  removeSchedule,
  updateBus,
  updateRoute,
  updateSchedule,
} from "../controllers/operatorController.js";
const router = express.Router();

//operator on routes

router.post("/route/add", addRoute);

router.put("/route/update/:routeId", updateRoute);

router.delete("/route/delete/:routeId", removeRoute);

//operatores on schedule

router.post("/schedule/add", addSchedule);

router.put("/schedule/update/:scheduleId", updateSchedule);

router.delete("/schedule/delete/:scheduleId", removeSchedule);

//operators on buses

router.post("/add/bus", addBus);

router.put("/update/bus/:busId", updateBus);

router.delete("/delete/bus/:busId", removeBus);

export default router;
