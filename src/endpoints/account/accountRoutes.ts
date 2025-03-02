import { Router } from "express";
import createAccount from './createAccount';
import getAllAccounts from "./getAllAccounts";
import getAccountByID from "./getAccountById";
import updateAccount from "./updateAccount";
import deleteAccount from "./deleteAccount";

const accountRouter = Router();

accountRouter.post('/create', createAccount);
accountRouter.get('/all', getAllAccounts);
accountRouter.get('/:id', getAccountByID);
accountRouter.put('/:id/update', updateAccount);
accountRouter.patch('/:id/delete', deleteAccount);

export default accountRouter;