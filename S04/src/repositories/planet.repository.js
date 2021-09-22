import Planet from '../models/planet.model.js';

const ZERO_KELVIN = -273.15;
class PlanetRepository {

    retrieveById(idPlanet) {
        return Planet.findById(idPlanet);
    }

    retrieveAll(filter){

        const testFilter={
            discoveredBy:'Skadex',
            temperature:{$gt:240},
            'position.y':{$lte:500}
        }

        

        return Planet.find(filter);
    }

    create(planet){
        return Planet.create(planet)
    }

    transform(planet, transformOptions = {}){
        if(transformOptions){
            if(transformOptions.unit === 'c'){
                planet.temperature += ZERO_KELVIN;
                //planet.temperature = Math.floor(planet.temperature * 100) / 100;
                planet.temperature = parseFloat(planet.temperature.toFixed(2));
            }
        }

        delete planet.__v;
        return planet;
    }

}

export default new PlanetRepository();