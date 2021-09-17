import express from 'express';
import HttpError from 'http-errors';
import httpStatus from 'http-status';

import PLANETS from '../data/planets.js'

import planetRepository from '../repositories/planet.repository.js';

const router = express.Router();

class PlanetsRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.get('/:idPlanet', this.getOne);
        router.post('/', this.post);
        router.delete('/:idPlanet', this.delete);
        router.patch('/:idPlanet', this.patch);
        router.put('/:idPlanet', this.put);
    }

    patch(req, res, next) {
        return next(HttpError.NotImplemented()); //Ou pas lol
    }

    put(req, res, next) {
        return next(HttpError.MethodNotAllowed());
    }

    delete(req, res, next) {

        const index = PLANETS.findIndex(p => p.id == req.params.idPlanet);

        if (index === -1) {
            return next(HttpError.NotFound(`La planet est pas la`));
        } else {
            PLANETS.splice(index, 1);
            res.status(204).end();
        }

    }

    post(req, res, next) {
        const newPlanet = req.body;
        const planet = PLANETS.find(p => p.id == newPlanet.id);

        if (planet) {
            return next(HttpError.Conflict(`La planet est dja la`));
        } else {
            PLANETS.push(newPlanet);
            res.status(httpStatus.CREATED).json(newPlanet);

        }


    }

    async getAll(req, res) {

        const filter = {};
        if(req.query.explorer){
            filter.discoveredBy. req.query.explorer;
        }

        try {
            const planets = await planetRepository.retrieveAll(filter);
            res.status(httpStatus.OK).json(planets);
        } catch (err) {
            return next(err);
        }
    }

    async getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        try {
            const planet = await planetRepository.retrieveById(idPlanet);

            if (planet) {
                res.status(httpStatus.OK).json(planet);
            } else {
                return next(HttpError.NotFound(`ta planete ${idPlanet} exist pa`));
            }
        } catch (err) {
            return next(err);
        }
    }

}

new PlanetsRoutes();
export default router;