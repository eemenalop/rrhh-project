import express,{Request, Response, Router} from 'express';
import { getDatafromJSON } from '../../getData';
import { Account } from 'types';

const getAccountByID = Router();
getAccountByID.use(express.json());

getAccountByID.get('/:id', (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        
        if(!id){
            res.status(400).json({success: false, message: `Number ID account is required`});
            return;
        }
        
        if(isNaN(id) || id <= 0){
            res.status(400).json({success: false, message: `Enter a  valid number ID Account`});
            return;
        }
            const dataAccounts = getDatafromJSON<Account[]>('accounts.json');
                
            if (!dataAccounts) {
                res.status(500).json({ success: false, message: 'Error reading accounts data' });
                return;
            }
        const account = dataAccounts.find((a)=> a.id === id);
        if(!account){
            res.status(404).json({success: false, message: `Account with number ID ${id} not found`})
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server Error', error });
        return;
    }
});

export default getAccountByID;