import express from "express";
const app = express();

app.use(express.json());

const pokemons = [
   {id: 1, "Pokemon": "Charizard", attack: 3, defense: 5, hp: 300, speed: 30, "Tipo": "Fogo", pokedex_number: 1, is_legendary: false, "createdAt": Date(), "updatedAt": Date()},
   {id: 2, "Pokemon": "lukia", attack: 5, defense: 6, hp: 500, speed: 45, "Tipo": "ave", pokedex_number: 2, is_legendary: true, "createdAt": Date(), "updatedAt": Date()},
   {id: 3, "Pokemon": "Squirtle", attack: 1, defense: 1, hp: 250, speed: 90, "Tipo": "Agua",  pokedex_number: 3, is_legendary: false, "createdAt": Date(), "updatedAt": Date()} 
]

app.get('/', (req, res) => {
    res.status(200).send('Trabalho de pokemon');
})

app.get('/pokemons', (req, res) => {
    const { Tipo } = req.query;
    const results = Tipo 
        ? pokemons.filter(pokeTipo => pokeTipo.Tipo.includes(Tipo)) 
        : pokemons;
    return res.json(results);
    //res.status(200).json(pokemons)
})

app.get('/pokemons/:id', (req, res) => {
    let index = buscaPokemon(req.params.id);
    res.json(pokemons[index]);
})

//Encontra pokemons query pelo tipo
/*app.get('/pokemons', (req, res) => {
    const { pokemon_tipo } = req.query;
    const results = pokemon_tipo 
        ? pokemons.filter(pokeTipo => pokeTipo.pokemon_tipo.includes(pokemon_tipo)) 
        : pokemons;
    return res.json(results);
})*/

app.post('/pokemons', (req, res) => {
    let pokemon = {};
    pokemon.id = req.body.id;
    pokemon.Pokemon = req.body.Pokemon;
    pokemon.attack = req.body.attack;
    pokemon.defense = req.body.defense;
    pokemon.hp = req.body.hp;
    pokemon.speed = req.body.speed;
    pokemon.Tipo = req.body.Tipo;
    pokemon.is_legendary = req.body.is_legendary
    pokemon.pokedex_number = pokemons.length + 1;
    pokemon.createdAt = Date();
    pokemon.updatedAt = Date();
    pokemons.push(pokemon);
    res.status(201).send('Pokemon adicionado com sucesso!');
})

app.put('/pokemons/:id', (req, res) => {
    let index = buscaPokemon(req.params.id);
    if(req.body.Pokemon) {
        pokemons[index].Pokemon = req.body.Pokemon;
    }
    pokemons[index].Pokemon = req.body.Pokemon;
    pokemons[index].attack = req.body.attack;
    pokemons[index].defense = req.body.defense;
    pokemons[index].hp = req.body.hp;
    pokemons[index].speed = req.body.speed;
    pokemons[index].Tipo = req.body.Tipo;
    pokemons[index].pokedex_number = req.body.pokedex_number;
    pokemons[index].is_legendary = req.body.is_legendary;
    pokemons[index].updatedAt = Date();
    res.json(pokemons);
})

app.delete('/pokemons/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaPokemon(id);
    pokemons.splice(index, 1);
    res.send(`Pokemon ${id} removido com sucesso!`);
})

function buscaPokemon(id){
    return pokemons.findIndex(pokemon => pokemon.id == id);
}

/*function geraCodigo(pokedex_number){
    return pokemons.findIndex(codigo => codigo.pokedex_number+= 1);
}*/



export default app