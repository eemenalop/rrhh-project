
import {Request, Response, Router} from 'express'
import { getPosition } from './getAllPosition';

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
        const dataPosition = getPosition();
        const position = dataPosition.find((p)=> p.id === id);
        if(!position){
            res.status(404).json({success: false, message: `Account with number ID ${id} not found`})
            return;
        }
            res.status(200).json(position);
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error', error})
    }
});

export default getPositionByID;