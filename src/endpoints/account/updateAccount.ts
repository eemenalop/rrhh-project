import express, {Request, Response, Router} from 'express'
import fs from 'fs';
import { Account } from '../../types';

const updateAccount = Router();
updateAccount.use(express.json());

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

updateAccount.put('/update/:id', (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    const { personal_id, name, lastname, username, password, position }: Account = req.body;

    let existingID = dataAccounts.accounts.find((e: Account)=>e.id === id);

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
        personal_id,
        name,
        lastname,
        username,
        password,
        position,
        active: true
    }
    fs.writeFileSync('./data/accounts.json', JSON.stringify(existingID, null,2));

    /*let updatedProps = []
    for(const prop in existingID){
        if(existingID[prop] !== dataAccounts.accounts[prop]){
            updatedProps.push(prop);
        }
    }*/

    res.status(200).json({success: true, message: `Account ID:${id} Username:${username}, have updated successfully`/*, PropsUpdated: updatedProps*/})

});

export default updateAccount;