import { Router } from "express";
import getAllEmployee from "./getAllEmployee";
//import createAccount from './createAccount';
//import getAccountByID from "./getAccountById";
//import updateAccount from "./updateAccount";
//import deleteAccount from "./deleteAccount";

const accountRouter = Router();

accountRouter.get('/all', getAllEmployee);
// accountRouter.get('/:id', getAccountByID);
// accountRouter.post('/create', createAccount);
// accountRouter.put('/:id/update', updateAccount);
// accountRouter.patch('/:id/delete', deleteAccount);

export default accountRouter;