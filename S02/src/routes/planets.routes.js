import express from 'express';
import HttpError from 'http-errors';
import httpStatus from 'http-status';

import PLANETS from '../data/planets.js'
const router = express.Router();


class PlanetsRoutes {

    constructor(){
        router.get('/planets', this.getAll);
        router.get('/planets/:idPlanet', this.getOne);
        router.post('/planet', this.post);
    }

    post(req,res,next){
        
    }

    getAll(req,res){
        res.status(200);
        //res.set('Content-Type','application/json');
        res.json(PLANETS);
    }

    getOne(req,res,next){
        const idPlanet = req.params.idPlanet;
        // let planet;
        // for(let p of PLANETS){
        //     if(p.id == idPlanet){
        //         planet = p;
        //         break;
        //     }
        // }
        
        const planet = PLANETS.find(p => p.id == idPlanet);

        if (planet)
        res.status(httpStatus.OK).json(planet);
        else
        return next(HttpError.ImATeapot(`ta planete ${idPlanet} exist pa`));
    }

}

new PlanetsRoutes();
export default router;