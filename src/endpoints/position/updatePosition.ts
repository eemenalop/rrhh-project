import express, { Request, Response, Router } from 'express';
import { getPosition } from '../position/getAllPosition';
import { Position } from 'types';

const updatePosition = Router();
updatePosition.use(express.json());

updatePosition.put('/:id/update', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, salary, active, isByPass } = req.body;

    if(!id){
        res.status(400).json({success: false, message: `Number ID position is required`});
        return;
    }
    if(isNaN(id) || id <= 0){
        res.status(400).json({success: false, message: `Enter a valid number ID position`});
        return;
    }
    if (!name || !salary || !active || !isByPass) {
        res.status(400).json({ success: false, message: 'You must complete all options'})
        return;
    }
    const dataPosition = getPosition();
    let positionID = dataPosition.find((p) => p.id === id);
    if(!positionID){
        res.status(404).json({success: false, message: `Position with number ID ${id} not found`});
        return;
    }

});