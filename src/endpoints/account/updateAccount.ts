import express, {Request, Response, Router} from 'express'
import fs from 'fs';
import { Account } from '../../types';
import { getAccounts } from '../../index';

const updateAccount = Router();
updateAccount.use(express.json());

updateAccount.put('/:id/update', (req: Request, res: Response)=>{
    const dataAccounts = getAccounts();
    try {

    const id = parseInt(req.params.id);
    const { personal_id, name, lastname, username, password, position }: Account = req.body;

    let existingID = dataAccounts.find((e: Account)=>e.id === id);

    if(!id){
        res.status(400).json({success: false, message: `Number ID account is required`});
        return;
    }

    if(isNaN(id) || id <= 0){
        res.status(400).json({success: false, message: `Enter a  valid number ID Account`});
        return;
    }

    if(!personal_id || !name || !lastname || !username || !password || !position){
        res.status(400).json({ success: false, message: 'You must complete all options'})
        return;
    }

    if(!existingID){
        res.status(404).json({success: false, message: `Account with number ID ${id} not found`});
        return;
    }

    existingID = {
        id,
        personal_id,
        name,
        lastname,
        username,
        password,
        position,
        active: true
    }

    const index = dataAccounts.findIndex((acc: { id: any; }) => acc.id === existingID.id);
    dataAccounts[index] = existingID;
    fs.writeFileSync('./data/accounts.json', JSON.stringify(dataAccounts, null,2));
    res.status(200).json({success: true, message: `Account ID:${id} Username:${username}, have updated successfully`});

    } catch (error) {
        res.status(500).json({success: false, message: 'Internal error server', error})
    }
});

export default updateAccount;