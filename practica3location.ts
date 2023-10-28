export interface results{
    id: string|null,
    name: string|null,
    type: string|null,
    dimension: string|null,
    created: string|null
}

export let memoria: results[] = []; //la memoria donde guardo los location. No es const porque sino no podría hacer la funcion de borrar.

export const listaLocation = async (pagina: number):Promise<results>=>{ //lista las location de la pagina
    const BASE_URL = "https://rickandmortyapi.com/api/location/?page=";
    const url = `${BASE_URL}${pagina}`;

    const data = await fetch(url);
    
    const json = await data.json();
    const locationNames = json.results.map((e:results) => {
        return e.name
    });
    return locationNames;
}
export const getLocation = async (locationID: number):Promise<results>=>{ //muestra el location por ID y lo mete en la memoria interna
    const BASE_URL = "https://rickandmortyapi.com/api/location/";
    const url = `${BASE_URL}${locationID}`;

    const data = await fetch(url);

    const json = await data.json();
    const id = json.id;
    const name = json.name;
    const type = json.type;
    const dimension = json.dimension;
    const created = json.created;

    const char: results = {id, name, type, dimension, created}; //creo el location con los datos adquiridos
    memoria.push(char);//meto los datos al array llamado memoria, actuando esta como memoria interna

    return{
        id,
        name,
        type,
        dimension,
        created,
    }
}
export const filtrarTypeLocation = (typ: string):results[]|string=>{ //filtra por Type
    const result = memoria.filter((e)=> e.type === typ);
    if(result.length>0){
        return result;
    }else{
        return "no hay nada o has escrito mal el type o en minuscula la primera letra";
    }
}
export const filtrarDimensionLocation = (dimen: string):results[]|string=>{ //filtra por Dimension
    const result = memoria.filter((e)=> e.dimension === dimen);
    if(result.length>0){
        return result;
    }else{
        return "no hay nada o has escrito mal la dimension o en minuscula la primera letra";
    }
}

export const deleteLocation = (characterID: string):results[] =>{ //borra un location y muestra la nueva lista
    const aux = memoria.filter((e) => e.id != characterID);
    memoria = aux;
    return memoria
}
