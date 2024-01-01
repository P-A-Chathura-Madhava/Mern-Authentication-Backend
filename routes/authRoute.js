import express from "express";
import { createUser, loginAdmin } from "../controller/userController.js";
import { getAllCompanies } from "../controller/companyController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/admin-login", loginAdmin);

router.get("/getAllCompanies", getAllCompanies);

export default router;
