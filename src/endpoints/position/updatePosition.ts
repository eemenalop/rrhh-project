import express, { Request, Response, Router } from 'express';
import { getDatafromJSON } from '../../getData';
import fs from 'fs';
import { Position } from 'types';

const updatePosition = Router();
updatePosition.use(express.json());

updatePosition.put('/:id/update', (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { name, salary, isByPass } = req.body;
    
        if(!id){
            res.status(400).json({success: false, message: `Number ID position is required`});
            return;
        }
        if(isNaN(id) || id <= 0){
            res.status(400).json({success: false, message: `Enter a valid number ID position`});
            return;
        }
        if (!name || !salary) {
            res.status(400).json({ success: false, message: 'You must complete all options'})
            return;
        }
            const dataPosition = getDatafromJSON<Position[]>('accounts.json');
        if (!dataPosition) {
        res.status(500).json({ success: false, message: 'Error reading Position data' });
        return;
        }           
        let positionID = dataPosition.find((p) => p.id === id);
        if(!positionID){
            res.status(404).json({success: false, message: `Position with number ID ${id} not found`});
            return;
        }
        positionID = {
            id,
            name,
            salary,
            active: true,
            isByPass
        }
        const index = dataPosition.findIndex((acc) => acc.id === positionID.id);
        dataPosition[index] = positionID;
        fs.writeFileSync('./data/position.json', JSON.stringify(dataPosition, null,2));
        res.status(200).json({success: true, message: `Position ID:${id}, Name: ${name}, have updated successfully`});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server Error', error });
        return;
    }

});

export default updatePosition;