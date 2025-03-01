import express,{Request, Response, Router} from 'express';
import fs from 'fs'
import { Account } from '../../types';

const getAccountByID = Router();
getAccountByID.use(express.json());

const getAccounts = ()=>{
    try {
        const data = fs.readFileSync('./data/accounts.json', 'utf-8');
        const parsedData= JSON.parse(data);
        const account = parsedData;
        return account;
    } catch (error) {
        console.log('Error reading file JSON:', error);
        return []
    }
}
const dataAccounts = getAccounts();

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

    const account = dataAccounts.accounts.find((a: Account)=> a.id === id);
    if(!account){
        res.status(404).json({success: false, message: `Account with number ID ${id} not found`})
    }

    res.status(200).json(account);
});

export default getAccountByID;