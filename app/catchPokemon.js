
export default async function pokedex (pokemon){
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    const data = await APIResponse.json();

    return({imagem: data.sprites.front_default, nome: data.name});
}