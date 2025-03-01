import express, { Request, Response, Router } from 'express';
import { Account } from '../../types';
import fs from 'fs';

const createAccount = Router();
createAccount.use(express.json());

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

// Create Account
createAccount.post('/create', (req: Request, res: Response) => {
    const { personal_id, name, lastname, username, password, position }: Account = req.body;
    
    if (!personal_id || !name || !lastname || !username || !password || !position) {
        res.status(400).json({ success: false, message: 'You must complete all options' })
        return;
    }

    const existingPersonal_id = dataAccounts.accounts.find((ID: Account) =>ID.personal_id === personal_id)
    if (existingPersonal_id) {
        res.status(400).json({ success: false, message: `This ${personal_id} is already in use` })
        return;
    }

    const ExistingNewUsername = dataAccounts.accounts.find((u: Account) =>u.username === username)
    if (ExistingNewUsername) {
        res.status(400).json({ success: false, message: `This ${username} is already in use` });
        return;
    }

    if (password.length <= 7) {
        res.status(400).json({ success: false, message: `Password must has at least 7 letters` });
        return;
    }

    const newId = dataAccounts.accounts.length + 1;

    const newAccount: Account = {
        id: newId,
        personal_id: personal_id,
        name: name,
        lastname: lastname,
        username: username,
        password: password,
        position: position,
        active: true
    }

    dataAccounts.accounts.push(newAccount);
    fs.writeFileSync('./data/accounts.json', JSON.stringify(dataAccounts, null, 2));

    res.status(200).json({success: true, message: `Account with Username: ${username} have created sucessfully!`})

});

export default createAccount;