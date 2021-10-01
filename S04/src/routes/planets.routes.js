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

    async patch(req, res, next) {
        
        try{
            let planet = await planetRepository.update(req.params.idPlanet, req.body);
            if (!planet) {
                return next(HttpError.NotFound(`La planet est pas la`));
            }

            planet = planet.toObject({getters:false, virtuals:false});
            planet = planetRepository.transform(planet);

            res.status(200).json(planet);
        }catch(err){
            return next(err);
        }

    }

    put(req, res, next) {
        return next(HttpError.MethodNotAllowed());
    }

    async delete(req, res, next) {


        try{
            const deleteResult = await delete(req.params.idPlanet);
            if (!deleteResult) {
                return next(HttpError.NotFound(`La planet est pas la`));
            }
            res.status(204).end();
        } catch(err){
            return next(err);
        }

        


    }

    async post(req, res, next) {
        const newPlanet = req.body;

        try{
            let planetAdded = await planetRepository.create(newPlanet)

            planetAdded = planetAdded.toObject({getters:false, virtuals:false});
            planetAdded = planetRepository.transform(planetAdded);

            res.status(httpStatus.CREATED).json(planetAdded);
        }catch(err){
            return next(err);
        }

    }

    async getAll(req, res) {

        //Demande explorer
        const filter = {};
        if(req.query.explorer){
            filter.discoveredBy = req.query.explorer;
        }

        //Validation parametres de la request
        const transformOptions = {};
        if(req.query.unit){
            const unit = req.query.unit;
            if(unit === 'c') {
                transformOptions.unit = unit;
            }else{
                return next(HttpError.BadRequest('Le parametre unit doit etre c ou s seulement.'))
            }
        }

        try {
            let planets = await planetRepository.retrieveAll(filter);

            //Lambda? Lamba?
            planets = planets.map(p => {
                p = p.toObject({getters:false, virtuals:false});
                p = planetRepository.transform(p,transformOptions);
                return p;
            });

            res.status(httpStatus.OK).json(planets);
        } catch (err) {
            return next(err);
        }
    }

    async getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        const transformOptions = {};
        if(req.query.unit){
            const unit = req.query.unit;
            if(unit === 'c') {
                transformOptions.unit = unit;
            }else{
                return next(HttpError.BadRequest('Le parametre unit doit etre c ou s seulement.'))
            }
        }

        try {
            let planet = await planetRepository.retrieveById(idPlanet);

            if (planet) {

                planet = planet.toObject({getters:false, virtuals:false});
                planet = planetRepository.transform(planet,transformOptions);

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