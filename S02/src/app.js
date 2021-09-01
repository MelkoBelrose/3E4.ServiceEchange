import dayjs from 'dayjs';
import express from 'express';

const app = express();

app.get('/premiere', (req, res) =>{
    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send('notre premiere route avec express');
});

//produit, difference, quotient, reste, somme
app.get('/maths/:operation', (req, res) =>{
    
    const operation = req.params.operation;
    const a = parseInt(req.query.a,10);
    const b = parseInt(req.query.b,10);
    let result;

    switch(operation){
        case 'somme':
            result = a+b;
            break;
        case 'difference':
            result = a-b;
            break;
        case 'produit':
            result = a*b;
            break;
        case 'quotient':
            result = a/b;
            break;
        case 'reste':
            result = a%b;
            break;
        default:
            console.log('What non')
            return res.status(418).end();

    }

    res.status(200);
    res.set('Content-Type', 'text/html');
    res.send(`<b style="font-size:300px;color:red;background-color:black">${result}</b>`);

});

app.get('/date', (req, res) =>{

    //console.log(req.query);

    const d = parseInt(req.query.a,10);
    const h = parseInt(req.query.b,10);

    res.status(200).set('Content-Type', 'text/html');
    
    const now= dayjs().format('YYYY-MM-DD HH:mm:ss')

    res.send(`<b style="font-size:90px">${now}</b>`);

});

export default app;