import { body, validationResult } from "express-validator";
import operatorModel from "../models/operatorModel.js";
import mongoose from "mongoose";
import customerModel from "../models/customers.js";

//operator things by admin

export const createOperator = async (req, res, next) => {
  try {
    const validations = [
      body("fname")
        .notEmpty()
        .withMessage("First name is required")
        .trim()
        .escape()
        .custom((value) => {
          // Custom validation function to check for numbers, special characters, and spaces
          if (/[\d!@#$%^&*()_+={}[\]:;'"|,.<>?\\\/~`\-]+/.test(value)) {
            throw new Error(
              "First name should not contain numbers or special characters"
            );
          }
          if (/\s/.test(value)) {
            throw new Error("First name should not contain spaces");
          }
          return true; // Return true if validation passes
        }),
      body("lname")
        .notEmpty()
        .trim()
        .escape()
        .withMessage("last name is required"),
      body("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Valid email is required")
        .custom(async (value) => {
          const same_email = await operatorModel.findOne({
            email: req.body.email,
          });
          if (same_email) throw new Error("email already in use");
        }),
      body("phone_no")
        .isMobilePhone("any", { strictMode: false })
        .withMessage("Valid phone number is required"),
      body("dob")
        .isISO8601()
        .toDate()
        .withMessage("Invalid date format for Date of Birth"),
      body("address.town")
        .notEmpty()
        .withMessage("Town is required")
        .trim()
        .escape()
        .custom((value) => {
          if (/[\d!@#$%^&*()_+={}[\]:;'"|,.<>?\\\/~`\-]+/.test(value)) {
            throw new Error(
              "First name should not contain numbers or special characters"
            );
          }
          if (/\s/.test(value)) {
            throw new Error("First name should not contain spaces");
          }
          return true; // Return true if validation passes
        }),
      body("address.city")
        .notEmpty()
        .trim()
        .escape()
        .withMessage("City is required")
        .custom((value) => {
          if (/[\d!@#$%^&*()_+={}[\]:;'"|,.<>?\\\/~`\-]+/.test(value)) {
            throw new Error(
              "First name should not contain numbers or special characters"
            );
          }
          if (/\s/.test(value)) {
            throw new Error("First name should not contain spaces");
          }
          return true;
        }),
      body("role")
        .notEmpty()
        .trim()
        .escape()
        .withMessage("Role is required")
        .custom((value) => {
          if (/[\d!@#$%^&*()_+={}[\]:;'"|,.<>?\\\/~`\-]+/.test(value)) {
            throw new Error(
              "First name should not contain numbers or special characters"
            );
          }
          if (/\s/.test(value)) {
            throw new Error("First name should not contain spaces");
          }
          return true;
        }),
      body("working_status")
        .notEmpty()
        .escape()
        .withMessage("Add Working Status"),
    ];

    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newOperator = new operatorModel(req.body);
    await newOperator.save();
    res.status(201).json({ message: "Operator created successfully" });
  } catch (err) {
    next(err);
  }
};

export const allOperator = async (req, res, next) => {
  try {
    const operators = await operatorModel.find();
    res.status(200).json({ message: operators });
  } catch (err) {
    next(err);
  }
};

export const basedOnStatusOperators = async (req, res, next) => {
  try {
    console.log(req.query);
    const { status } = req.query;
    const operators = await operatorModel.find({
      working_status: status,
    });
    res.status(200).json(operators);
  } catch (err) {
    next(err);
  }
};

export const basedOnRoleOperators = async (req, res, next) => {
  try {
    console.log(req.query);
    const { role } = req.query;
    const operators = await operatorModel.find({
      role,
    });
    res.status(200).json(operators);
  } catch (err) {
    next(err);
  }
};

export const singleOperator = async (req, res, next) => {
  try {
    const { operatorId } = req.params;
    const operator = await operatorModel.findById(operatorId);
    res.status(200).json({ message: operator });
  } catch (err) {
    next(err);
  }
};

export const updateOperator = async (req, res, next) => {
  try {
    const findOperator = await operatorModel.findOne({ email: req.body.email });
    if (!findOperator) {
      throw new Error("no user found for this Email");
    }
    const validations = [
      body("fname")
        .notEmpty()
        .withMessage("First name is required")
        .trim()
        .escape()
        .custom((value) => {
          // Custom validation function to check for numbers, special characters, and spaces
          if (/[\d!@#$%^&*()_+={}[\]:;'"|,.<>?\\\/~`\-]+/.test(value)) {
            throw new Error(
              "First name should not contain numbers or special characters"
            );
          }
          if (/\s/.test(value)) {
            throw new Error("First name should not contain spaces");
          }
          return true; // Return true if validation passes
        }),
      body("lname")
        .notEmpty()
        .trim()
        .escape()
        .withMessage("last name is required"),
      body("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Valid email is required"),
      body("phone_no")
        .isMobilePhone("any", { strictMode: false })
        .withMessage("Valid phone number is required"),
      body("dob")
        .isISO8601()
        .toDate()
        .withMessage("Invalid date format for Date of Birth"),
      body("address.town")
        .notEmpty()
        .withMessage("Town is required")
        .trim()
        .escape()
        .custom((value) => {
          if (/[\d!@#$%^&*()_+={}[\]:;'"|,.<>?\\\/~`\-]+/.test(value)) {
            throw new Error(
              "First name should not contain numbers or special characters"
            );
          }
          if (/\s/.test(value)) {
            throw new Error("First name should not contain spaces");
          }
          return true; // Return true if validation passes
        }),
      body("address.city")
        .notEmpty()
        .trim()
        .escape()
        .withMessage("City is required")
        .custom((value) => {
          if (/[\d!@#$%^&*()_+={}[\]:;'"|,.<>?\\\/~`\-]+/.test(value)) {
            throw new Error(
              "First name should not contain numbers or special characters"
            );
          }
          if (/\s/.test(value)) {
            throw new Error("First name should not contain spaces");
          }
          return true;
        }),
      body("role")
        .notEmpty()
        .trim()
        .escape()
        .withMessage("Role is required")
        .custom((value) => {
          if (/[\d!@#$%^&*()_+={}[\]:;'"|,.<>?\\\/~`\-]+/.test(value)) {
            throw new Error(
              "First name should not contain numbers or special characters"
            );
          }
          if (/\s/.test(value)) {
            throw new Error("First name should not contain spaces");
          }
          return true;
        }),
      body("working_status")
        .notEmpty()
        .escape()
        .withMessage("Add Working Status"),
    ];
    await Promise.all(validations.map((validation) => validation.run(req)));

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const updated_operator = await operatorModel.findOneAndUpdate(
      { email: req.body.email },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: updated_operator });
  } catch (err) {
    next(err);
  }
};

export const deleteOperator = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { operatorId } = req.params;

    const operator = await operatorModel.findById(operatorId).session(session);
    if (!operator) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Operator not found" });
    }

    await mongoose.connection
      .collection("deleted_operator")
      .insertOne(operator, { session });

    await operatorModel.findByIdAndDelete(operatorId).session(session);

    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({ message: "Operator deleted and archived successfully" });
  } catch (err) {
    next(err)
  }
};

export const deleteMultipleOperator = async (req, res, next) => {
  try {
    const operatorIds = req.body.operatorIds
    const session = await mongoose.startSession()
    session.startTransaction()
    const operators = await operatorModel.find({_id: {$in: operatorIds}}).session(session)
    if(operators.length !== operatorIds.length) {
      await session.abortTransaction()
      session.endSession()
      res.status(400).json({message: 'some operatores not found'})
    }
    await mongoose.connection.collection("deleted_operator").insertMany(operators, {session})
    await operatorModel.deleteMany({_id: {$in: operatorIds}}).session(session)
    await session.commitTransaction()
    session.endSession()
    res.status(200).json({message: 'operatores delated succ'})
  } catch (err) {
    next(err)
  }
}

// user things by admin

export const updateUser = async (req, res, next) => {
  try {
    const {customerId} = req.params
    const user = await customerModel.findById(customerId)
    if (!user) return res.status(400).json({message: 'no user found'})
    const updatedUser = await customerModel.findById(
      { _id: customerId },
      { $set: { account_status: req.body.account_status } },
      {new: true}
    );
    res.status(200).json(updatedUser)
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const {customerId} = req.params
    const session = await mongoose.startSession()
    session.startTransaction()
    const user = await customerModel.findById(customerId).session(session)
    if(!user) {
      await session.abortTransaction()
      session.endSession()
      return res.status(400).json({message: 'no user found'})
    }
    await mongoose.connection.collection('deleted_customer').insertOne(user, {session})
    await customerModel.findByIdAndDelete(customerId).session(session)
    await session.commitTransaction()
    session.endSession()
    res.status(200).json({message: 'user deleted succ'})
  } catch (err) {
    next(err)
  }
}

export const deleteMultipleUser = async (req, res, next) => {
  try {
    const customerIds = req.body
    const session = await mongoose.startSession()
    session.startTransaction()
    const users = await customerModel.find({_id: {$in: customerIds}}).session(session)
    if(users.length !== customerIds.length) {
      await session.abortTransaction()
      session.endSession()
      return res.status(400).json({message: 'some users not found'})
    }
    await mongoose.connection.collection('deleted_customer').insertMany(users, {session})
    await customerModel.deleteMany({_id: {$in: customerIds}}).session(session)
    await session.commitTransaction()
    session.endSession()
    res.status(200).json({message: 'users deleted succ'})
  } catch (err) {
    next(err)
  }
}

