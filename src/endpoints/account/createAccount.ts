import express, { Request, Response, Router } from 'express';
import { Account } from '../../types';
import fs from 'fs';
import { getDatafromJSON } from '../../getData';

const createAccount = Router();
createAccount.use(express.json());

// Create Account
createAccount.post('/create', (req: Request, res: Response) => {
    try {
        const { personal_id, name, lastname, username, password, position }: Account = req.body;
    
    if (!personal_id || !name || !lastname || !username || !password || !position) {
        res.status(400).json({ success: false, message: 'You must complete all options' })
        return;
    }
        
        const dataAccounts = getDatafromJSON<Account[]>('accounts.json');
        
    if (!dataAccounts) {
        res.status(500).json({ success: false, message: 'Error reading accounts data' });
        return;
    }
        
        const existingPersonal_id = dataAccounts.find((ID) => ID.personal_id === personal_id)
        
    if (existingPersonal_id) {
        res.status(400).json({ success: false, message: `This ${personal_id} is already in use` })
        return;
    }

    const ExistingNewUsername = dataAccounts.find((u: Account) =>u.username === username)
    if (ExistingNewUsername) {
        res.status(400).json({ success: false, message: `This ${username} is already in use` });
        return;
    }

    if (password.length <= 7) {
        res.status(400).json({ success: false, message: `Password must has at least 7 letters` });
        return;
    }

    const newId = dataAccounts.length + 1;

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

    dataAccounts.push(newAccount);
    fs.writeFileSync('./data/accounts.json', JSON.stringify(dataAccounts, null, 2));

    res.status(200).json({success: true, message: `Account with Username: ${username} have been created sucessfully!`})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server Error', error });
        return;
    }
    

});

export default createAccount;