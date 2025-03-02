import express,{Request, Response, Router} from 'express';
import { Account } from '../../types';
import { getAccounts } from '../../index';

const getAccountByID = Router();
getAccountByID.use(express.json());

getAccountByID.get('/:id', (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    
    if(!id){
        res.status(400).json({success: false, message: `Number ID account is required`});
        return;
    }
    
    if(isNaN(id) || id <= 0){
        res.status(400).json({success: false, message: `Enter a  valid number ID Account`});
        return;
    }
    const dataAccounts = getAccounts();
    const account = dataAccounts.find((a)=> a.id === id);
    if(!account){
        res.status(404).json({success: false, message: `Account with number ID ${id} not found`})
    }

    res.status(200).json(account);
});

export default getAccountByID;