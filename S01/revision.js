const theName = 'Yannick';
let age = 33;

console.log(theName);
age++;
console.log(age);

const test = true + 1;
const test2 = 125 + '9'; 
console.log(test2);

console.log(('b' + 'a' + + 'a' + 'a'));

function displayUser(name, age) {
    console.log(`Bonjour mon nom est ${name}, j'ai ${age} ans`);
}

displayUser('Rosalie',12);

//Collection, Tableau, Liste

const fruits =['Kiwi','Banane','Fraise','Tomate','Mangue'];

//Ecrit le tableau telle qu'elle
console.log(fruits);


//Facon des pourris
for(let fruit of fruits){
    console.log(fruit);
}


//Facons des vrai hommes, avec landa, fonction anonyme
fruits.forEach(f => console.log(f));


const sum =  (a, b) => a + b;
const result = sum(2,5);
console.log(result);

const someFruits = fruits.filter(f => f.length < 5)
console.log(someFruits);

const numbers = [10,20,30,40];
const MULTIPLIER = 3;
const products = numbers.map(n => n * MULTIPLIER).filter(n => n > 75).map(n => n + 9);
console.log(products);
console.log(numbers);

numbers.push(50);
console.log(numbers);

const avenger = {
    alterEgo:'beter',
    hero:'spodermon',
    movies:[{title:'a'},{title:'g'},{title:'b'}]
}

console.log(avenger.alterEgo);
console.log(avenger.movies.forEach(m => console.log(m.title)));

