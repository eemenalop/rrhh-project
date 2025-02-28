import { app } from '../src/config'
import express, { Request, Response } from 'express';
import { getAccounts } from '../src/index';
import { Account } from '../src/types';
import fs from 'fs';

app.use(express.json());
const dataAccounts = getAccounts();

app.post('/account/create', (req: Request, res: Response) => {
    const { personal_id, name, lastname, username, password, position } = req.body;
    
    if (!personal_id || !name || !lastname || !username || !password || !position) {
        res.status(400).json({ success: false, message: 'You must complete all options' })
        return;
    }

    const newPersonal_id = dataAccounts.find((ID: Account) =>ID.personal_id === personal_id)
    if (!newPersonal_id) {
        res.status(400).json({ success: false, message: `This ${newPersonal_id} is already in use` })
    }

    const newUsername = dataAccounts.find((u: Account) =>u.username === username)
    if (!newUsername) {
        res.status(400).json({ success: false, message: `This ${newUsername} is already in use` })
    }

    if (password.lengh > 6) {
        res.status(400).json({ success: false, message: `Password must has at least 7 letters` })
    }
    
    const newId = dataAccounts.length + 1;

    const newAccount: Account = {
        id: newId,
        personal_id: newPersonal_id,
        name: name,
        lastname: lastname,
        username: newUsername,
        password: password,
        position: position,
        active: true
    }

    dataAccounts.push(newAccount);
    fs.writeFileSync('./data/accounts.json', JSON.stringify(newAccount, null, 2));

    res.status(200).json({success: true, message: `Account with Username: ${username} have created sucessfully!`})

});

