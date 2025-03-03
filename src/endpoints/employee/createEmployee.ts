import express, { Request, Response, Router } from 'express';
import { getDatafromJSON } from '../../getData';
import fs from 'fs';
import { Employee } from '../../types';

const createEmployee = Router();

createEmployee.post('/create', (req: Request, res: Response) => {
    try {
            const { personal_id, name, lastname, pricePerHours, position }: Employee = req.body;
        
        if (!personal_id || !name || !lastname || !position) {
            res.status(400).json({ success: false, message: 'You must complete all options' })
            return;
        }
            
            const dataEmployee = getDatafromJSON<Employee[]>('employees.json');
            
        if (!dataEmployee) {
            res.status(500).json({ success: false, message: 'Error reading employees data' });
            return;
        }
            
            const existingPersonal_id = dataEmployee.find((em) => em.personal_id === personal_id)
            
        if (existingPersonal_id) {
            res.status(400).json({ success: false, message: `This ${personal_id} is already in use` })
            return;
        }
    
        const newId = dataEmployee.length + 1;
    
        const newEmployee: Employee = {
            id: newId,
            personal_id: personal_id,
            name: name,
            lastname: lastname,
            pricePerHours,
            position: position,
            active: true
        }
    
        dataEmployee.push(newEmployee);
        fs.writeFileSync('./data/accounts.json', JSON.stringify(dataEmployee, null, 2));
    
        res.status(200).json({success: true, message: `Employee have been created sucessfully!`})
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server Error', error });
            return;
        }
});

export default createEmployee;