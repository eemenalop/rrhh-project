import express, {Request, Response, Router} from 'express';
import fs from 'fs';
import { getDatafromJSON } from '../../getData';
import { Position } from 'types';

const createPosition = Router();
createPosition.use(express.json());

createPosition.post('/create', (req: Request, res: Response)=>{
    try {
        const { name, salary} = req.body;
        if(!name || !salary){
            res.status(400).json({ success: false, message: 'You must complete all options'})
            return;
        }
            const dataPosition = getDatafromJSON<Position[]>('position.json');
                
        if (!dataPosition) {
            res.status(500).json({ success: false, message: 'Error reading Position data' });
            return;
        }
        const positionName = dataPosition.find((p)=>p.name === name);
        if(positionName){
            res.status(400).json({ success: false, message: `This position name:${name} is already created` })
            return;
        }
        const positionID = dataPosition.length + 1;
        const newPosition: Position = {
            id: positionID,
            name,
            salary,
            active: true,
            isByPass: false
        }
        dataPosition.push(newPosition);
        fs.writeFileSync('./data/position.json', JSON.stringify(dataPosition, null, 2))
        res.status(200).json({success: true, message: `Position with name: ${name} have been created sucessfully! ID:${positionID}`})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server Error', error });
        return;
    }
    
});


export default createPosition;