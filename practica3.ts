//@ts-ignore esto es para que no salga la linea de abajo con error, ya que no hay error en verdad (nos lo enseño Alberto)
import express, {Request, Response} from "npm:express@4.18.2";
import{ listaCharacter,getCharacter,deleteCharacter, filtrarStatusCharacter, filtrarGenderCharacter }from "./practica3character.ts"
import { deleteLocation, filtrarDimensionLocation, filtrarTypeLocation, getLocation, listaLocation } from "./practica3location.ts";

const app = express();

//LAS FUNCIONES DEL ARCHIVO LOCALIZACION SON LAS MISMAS QUE LA DE CHARACTER PERO CON SUS PROPIOS DATOS YA QUE LAS FUNCIONES ERAN IGUALES
//POR ELLO HE REUTILIZADO LAS DE CHARACTERS PERO CAMBIANDO LAS INTERFACES Y LOS DATOS 

app.get("/ch/pagina/:num", async (req: Request, res: Response) => { //muestra los personajes de una pagina
    const num = req.params.num;
    const paginas = await listaCharacter(num);
    res.send(paginas);
}).get("/ch/meter/:num", async (req:Request, res:Response) =>{ //muestra un personaje por ID y lo añade a la mem interna
    const num = req.params.num;
    const place= await getCharacter(num);
    res.send(place);
}).get("/ch/filter/status/:dato", (req:Request, res:Response) =>{ //muestra los personajes internos que tengan el Status que pones en Mayuscula la inicial
    const dato = req.params.dato;
    const filter = filtrarStatusCharacter(dato);
    res.send(filter);
}).get("/ch/filter/gender/:dato", (req:Request, res:Response) =>{ //muestra los personajes internos que tengan el Gender que pones en Mayuscula la inicial
    const dato = req.params.dato;
    const filter = filtrarGenderCharacter(dato);
    res.send(filter);
}).get("/ch/delete/:num", (req:Request, res:Response) =>{ //borra el personaje por ID y muestra como queda la lista interna
    const num = req.params.num;
    const del = deleteCharacter(num);
    res.send(del);
}).get("/loc/pagina/:num", async (req: Request, res: Response) => { //muestra las localizaciones de una pagina
    const num = req.params.num;
    const paginas = await listaLocation(num);
    res.send(paginas);
}).get("/loc/meter/:num", async (req:Request, res:Response) =>{ //muestra una localizacion por ID y lo añade a la mem interna
    const num = req.params.num;
    const place= await getLocation(num);
    res.send(place);
}).get("/loc/filter/type/:dato", (req:Request, res:Response) =>{ //muestra las localizaciones internas que tengan el Type que pones en Mayuscula la inicial
    const dato = req.params.dato;
    const filter = filtrarTypeLocation(dato);
    res.send(filter);
}).get("/loc/filter/dimension/:dato", (req:Request, res:Response) =>{ //muestra las localizaciones internas que tengan la Dimension que pones en Mayuscula la inicial
    const dato = req.params.dato;
    const filter = filtrarDimensionLocation(dato);
    res.send(filter);
}).get("/loc/delete/:num", (req:Request, res:Response) =>{//borra la localizacion por ID y muestra como queda la lista interna
    const num = req.params.num;
    const del = deleteLocation(num);
    res.send(del);
})

app.listen(3000);