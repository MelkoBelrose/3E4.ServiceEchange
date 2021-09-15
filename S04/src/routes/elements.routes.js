import express from 'express';
import HttpError from 'http-errors';
import httpStatus from 'http-status';

import ELEMENTS from '../data/elements.js'
const router = express.Router();

class ElementsRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.post('/', this.post);
        router.get('/:symbol', this.getOne);
        router.delete('/:symbol', this.delete);

    }

    getAll(req, res, next) {
        res.status(200);
        res.json(ELEMENTS);
    }

    getOne(req, res, next) {
        const symbol = req.params.symbol;
        
        const element = ELEMENTS.find(p => p.symbol == symbol);

        if (element)
        res.status(httpStatus.OK).json(element);
        else
        return next(HttpError.NotFound(`l'element du symbol ${symbol} exist pa`));
    }

    post(req, res, next) {
        const newElement = req.body;
        const element = ELEMENTS.find(p => p.symbol == newElement.symbol);

        if(element){
            return next(HttpError.Conflict(`L'element existe deja`));
        }else{
            ELEMENTS.push(newElement);
            res.status(httpStatus.CREATED).json(newElement);
        }
        
    }
    
    delete(req, res, next) {
        const index = ELEMENTS.findIndex(p => p.id == req.params.idElement);

        if(index === -1){
            return next(HttpError.NotFound(`L'element n'nexiste pas`));
        } else {
            ELEMENTS.splice(index,1);
            res.status(204).end();
        }
    }
}

new ElementsRoutes();

export default router;