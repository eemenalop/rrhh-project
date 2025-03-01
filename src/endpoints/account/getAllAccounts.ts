import express, {Request, Response, Router} from 'express';
import fs from 'fs'


const getAllAccounts = Router();
getAllAccounts.use(express.json());

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

getAllAccounts.get('/all', (req: Request, res: Response)=>{
    res.status(200).json(dataAccounts);
});

export default getAllAccounts;



