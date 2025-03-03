import express, { Response, Request, Router } from 'express';
import fs from 'fs';
import { getDatafromJSON } from '../../getData';
import { Position } from 'types';

const deletePosition = Router();
deletePosition.use(express.json());

deletePosition.patch('/:id/delete', (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if(!id){
        res.status(400).json({success: false, message: `Number ID position is required`});
        return;
        }
        if(isNaN(id) || id <= 0){
        res.status(400).json({ success: false, message: `Enter a valid number ID position` });
        return;
        }
            const dataPosition = getDatafromJSON<Position[]>('accounts.json');
                        
        if (!dataPosition) {
        res.status(500).json({ success: false, message: 'Error reading Position data' });
        return;
        }
        let existingID = dataPosition.find((e)=>e.id === id);
        if (!existingID) {
            res.status(404).json({ success: false, message: `Account with number ID ${id} not found` });
            return;
        }
        existingID.active = false;
        const index = dataPosition.findIndex((acc) => acc.id === existingID.id);
        dataPosition[index] = existingID;
        fs.writeFileSync('./data/position.json', JSON.stringify(dataPosition, null, 2));
        res.status(200).json({ success: true, message: `Position ID:${id}, have been deleted successfully`, active: existingID });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server Error', error });
        return;
    }

});

export default deletePosition;