import { Request, Response, Router } from 'express';
import { getDatafromJSON } from '../../getData';
import { Employee } from 'types';


const getAllEmployee = Router();

try {
    getAllEmployee.get('/all', (req: Request, res: Response) => {
        const dataEmployes = getDatafromJSON<Employee[]>('employees.json');
        res.status(200).json(dataEmployes)
    });
} catch (error) {
    
}

export default getAllEmployee;