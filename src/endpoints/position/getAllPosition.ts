
import {Request, Response, Router} from 'express'
//import { getPosition } from '../../getData';
import { getDatafromJSON } from '../../getData';
import { Position } from '../../types';

const getAllPosition = Router();

getAllPosition.get('/all', (req: Request, res: Response)=>{
    const dataPosition = getDatafromJSON<Position[]>('position.json');
    try {
        res.status(200).json(dataPosition);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error });
        return;
    }
});

export default getAllPosition;