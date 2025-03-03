import express, {Request, Response, Router} from 'express';
import { getDatafromJSON } from '../../getData';
import { Account } from 'types';


const getAllAccounts = Router();
getAllAccounts.use(express.json());

getAllAccounts.get('/all', (req: Request, res: Response) => {
    try {
            const dataAccounts = getDatafromJSON<Account[]>('accounts.json');
                
        if (!dataAccounts) {
            res.status(500).json({ success: false, message: 'Error reading accounts data' });
            return;
        }
        res.status(200).json(dataAccounts);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server Error', error });
        return;
    }
});

export default getAllAccounts;



