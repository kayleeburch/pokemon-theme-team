const getPokeBois = async () => {
    try {
        let response = await axios.get('https://pokeapi.co/api/v2/pokemon/')
        const pokeNum = response.data.count
        const randomNum = Math.floor(Math.random() * pokeNum)
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
        let pokeType = response.data.types[0].type['name']
        response = await axios.get(`https://pokeapi.co/api/v2/type/${pokeType}`)
        let allTypesNum = response.data.pokemon.length
        let allTypesArr = response.data.pokemon
        // console.log(pokeType)

        let pokeList = []
        while(pokeList.length < 6){
            let randomFiveID = Math.floor(Math.random() * allTypesNum)
            for(let x in allTypesArr){
                if(x == randomFiveID){
                    let pokemonUrl = allTypesArr[x].pokemon['url']
                    response = await axios.get(`${pokemonUrl}`)
                    let getImage = response.data.sprites.front_default
                    pokeList.push(getImage)
                }
            }
        }
        

        document.getElementById('image-list').innerHTML = '';

        for(let images in pokeList){
            var img = document.createElement('img')
            img.src = pokeList[images]
            document.getElementById('image-list').appendChild(img);
            console.log(pokeType)
        } 

        
        
    }
    catch(e){
        console.log('NOPE, NICE TRY')
        console.log(e)
    }
}


