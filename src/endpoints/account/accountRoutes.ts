import { Router } from "express";
import createAccount from './createAccount';
import getAllAccounts from "./getAllAccounts";
import getAccountByID from "./getAccountById";
import updateAccount from "./updateAccount";

const accountRouter = Router();

accountRouter.post('/create', createAccount);
accountRouter.get('/all', getAllAccounts);
accountRouter.get('/:id', getAccountByID);
accountRouter.get('/update/:id', updateAccount);

export default accountRouter;