import express from "express";
import {
  allOperator,
  basedOnRoleOperators,
  basedOnStatusOperators,
  createOperator,
  deleteMultipleOperator,
  deleteMultipleUser,
  deleteOperator,
  deleteUser,
  singleOperator,
  updateOperator,
  updateUser,
} from "../controllers/adminController.js";

const router = express.Router();

//admin on operator routes

router.post("/create_operator", createOperator);

router.put("/update_operator", updateOperator);

router.get("/read_all_operator", allOperator);

router.get("/read_single_operator/:operatorId", singleOperator);

router.get("/read_based_status_operator", basedOnStatusOperators);

router.get("/read_based_role_operator", basedOnRoleOperators);

router.delete("/delete_single_operator/:operatorId", deleteOperator);

router.delete("/delete_multiple_operator", deleteMultipleOperator);

//admin on user routes

//TODO... here we will do after user things completed

router.put("/update_user", updateUser);

router.delete("/delete_single_user", deleteUser);

router.delete("/delete_multiple_user", deleteMultipleUser);

export default router;
