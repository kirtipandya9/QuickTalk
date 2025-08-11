import { Router } from "express";
import {
  getAllContacts,
  getContactsForDMList,
  searchContacts,
} from "../controllers/ContactsControllers.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactsRoutes = Router();

contactsRoutes.post("/search", verifyToken, searchContacts);
contactsRoutes.get(
  "/get-contacts-for-dm",
  verifyToken,
  (req, res, next) => {
    // console.log("Received request for get-contacts-for-dm");
    next();
  },
  getContactsForDMList
);
contactsRoutes.get('/get-all-contacts', verifyToken, getAllContacts);

export default contactsRoutes;