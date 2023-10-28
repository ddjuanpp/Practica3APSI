export interface results{
    id: string|null,
    name: string|null,
    status: string|null,
    species: string|null,
    gender: string|null,
    origin: origen|null,
    location: ubicacion|null,
    created: string|null,
}
export interface origen{
    name: string,
    url: string,
}
export interface ubicacion{
    name: string,
    url: string,
}
export let memoria: results[] = []; //la memoria donde guardo los personajes. No es const porque sino no podría hacer la funcion de borrar.

export const listaCharacter = async (pagina: number):Promise<results>=>{ //lista los nombres de personaje de la pagina
    const BASE_URL = "https://rickandmortyapi.com/api/character/?page=";
    const url = `${BASE_URL}${pagina}`;

    const data = await fetch(url);
    
    const json = await data.json();
    const names = json.results.map((e:results) => {
        return e.name
    });
    return names;
}
export const getCharacter = async (characterID: number):Promise<results>=>{ //muestra el personaje por ID y lo mete en la memoria interna
    const BASE_URL = "https://rickandmortyapi.com/api/character/";
    const url = `${BASE_URL}${characterID}`;

    const data = await fetch(url);

    const json = await data.json();
    const id = json.id;
    const name = json.name;
    const status = json.status;
    const species = json.species;
    const gender = json.gender;
    const origin = json.origin.name;
    const location = json.location.name;
    const created = json.created;

    const char: results = {id, name, status, species, gender, origin, location, created}; //creo el character con los datos adquiridos
    memoria.push(char);//meto los datos al array llamado memoria, actuando esta como memoria interna

    return{
        id,
        name,
        status,
        species,
        gender,
        origin,
        location,
        created,
    }
}
export const filtrarStatusCharacter = (characterData: string):results[]|string=>{ //filtra por Status
    const result = memoria.filter((e)=> e.status === characterData);
    if(result.length>0){
        return result;
    }else{
        return "no hay nada o has escrito mal el status o en minuscula la primera letra";
    }
}
export const filtrarGenderCharacter = (characterData: string):results[]|string=>{ //filtra por Gender
    const result = memoria.filter((e)=> e.gender === characterData);
    if(result.length>0){
        return result;
    }else{
        return "no hay nada o has escrito mal el gender o en minuscula la primera letra";
    }
}

export const deleteCharacter = (characterID: string):results[] =>{ //borra un personaje y muestra la nueva lista
    const aux = memoria.filter((e) => e.id != characterID);
    memoria = aux;
    return memoria
}
