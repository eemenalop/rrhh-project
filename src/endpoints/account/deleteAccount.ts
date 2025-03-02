import express, {Request, Response, Router} from 'express';
import fs from 'fs';
import { getAccounts } from '../../index';
import { Account } from 'types';

const deleteAccount = Router();
deleteAccount.use(express.json());


deleteAccount.patch('/:id/delete', (req: Request, res: Response)=>{
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
        const dataAccounts = getAccounts();
        let existingID = dataAccounts.find((e)=>e.id === id);
        if(!existingID){
        res.status(404).json({success: false, message: `Account with number ID ${id} not found`});
        return;
    }

    existingID.active = false;
    const index = dataAccounts.findIndex((acc) => acc.id === existingID.id);
    dataAccounts[index] = existingID;
    fs.writeFileSync('./data/accounts.json', JSON.stringify(dataAccounts, null,2));
    res.status(200).json({success: true, message: `Account ID:${id}, have been deleted successfully`});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server Error', error})
    }
    
})

export default deleteAccount;