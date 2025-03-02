
import {Request, Response, Router} from 'express'
import fs from 'fs';
import { Position } from 'types';

const getAllPosition = Router();

export const getPosition = ()=>{
    try {
        const data = fs.readFileSync('./data/position.json', 'utf-8');
        const parsedData = JSON.parse(data);
        const position: Position[] = parsedData;
        return position;
    } catch (error) {
        console.log('Error reading file JSON:', error);
        return []
    }
}

getAllPosition.get('/all', (req: Request, res: Response)=>{
    const dataPosition = getPosition();
    try {
        res.status(200).json(dataPosition);
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error', error})
    }
});

export default getAllPosition;