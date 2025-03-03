import express, { Request, Response, Router } from 'express';
import { Account, Employee } from '../../types';
import fs from 'fs';
import { getDatafromJSON } from '../../getData';

const createAccount = Router();
createAccount.use(express.json());

// Create Account
createAccount.post('/create', (req: Request, res: Response) => {
    try {
        const { personal_id, username, password }: Account = req.body;
    
    if (!personal_id || !username || !password) {
        res.status(400).json({ success: false, message: 'You must complete all options, Personal ID, Username and Password' })
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
    const dataEmployee = getDatafromJSON<Employee[]>('employees.json');
    if (!dataEmployee) {
        res.status(500).json({ success: false, message: 'Error reading accounts data' });
        return;
    }
        const employee = dataEmployee.find((e) => e.personal_id === personal_id);
        if (!employee) {
            res.status(500).json({ success: false, message: 'Error reading accounts data' });
            return;
        }
        
    const newId = dataAccounts.length + 1;
    const newAccount: Account = {
        id: newId,
        personal_id: personal_id,
        name: employee.name,
        lastname: employee.lastname,
        username: username,
        password: password,
        position: employee.position,
        active: employee.active
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