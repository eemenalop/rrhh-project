
import {Request, Response, Router} from 'express'
import { getDatafromJSON } from '../../getData';
import { Position } from 'types';

const getPositionByID = Router();

getPositionByID.get('/:id', (req: Request, res: Response)=>{
    try {
        const id = parseInt(req.params.id);
        if(!id){
            res.status(400).json({success: false, message: `Number ID position is required`});
            return;
        }
        
        if(isNaN(id) || id <= 0){
            res.status(400).json({success: false, message: `Enter a  valid number ID position`});
            return;
        }
            const dataPosition = getDatafromJSON<Position[]>('accounts.json');
                        
        if (!dataPosition) {
        res.status(500).json({ success: false, message: 'Error reading Position data' });
        return;
        }
        const position = dataPosition.find((p)=> p.id === id);
        if(!position){
            res.status(404).json({success: false, message: `Account with number ID ${id} not found`})
            return;
        }
            res.status(200).json(position);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error });
        return;
    }
});

export default getPositionByID;