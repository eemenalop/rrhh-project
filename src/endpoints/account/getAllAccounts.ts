import express, {Request, Response, Router} from 'express';
import { getAccounts } from '../../index';


const getAllAccounts = Router();
getAllAccounts.use(express.json());

getAllAccounts.get('/all', (req: Request, res: Response)=>{
    const dataAccounts = getAccounts();
    res.status(200).json(dataAccounts);
});

export default getAllAccounts;



