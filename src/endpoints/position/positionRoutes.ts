import { Router } from "express";
import getAllPosition from "./getAllPosition";
import getPositionByID from "./getPositionById";
import createPosition from "./createPosition";
import updatePosition from "./updatePosition"
import deletePosition from "./deletePosition";

const positionsRouter = Router();

positionsRouter.get('/all', getAllPosition);
positionsRouter.get('/:id', getPositionByID);
positionsRouter.post('/create', createPosition);
positionsRouter.put('/:id/update', updatePosition);
positionsRouter.patch('/:id/delete', deletePosition);

export default positionsRouter;