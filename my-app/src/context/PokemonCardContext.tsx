import React, {createContext, useState,useEffect, ReactNode} from 'react'
import { toast } from 'react-toastify';

interface PokemonData {
    id: number;
    name: string
    amount: number;
}

interface PokemonCardContextData {
  pokemonCart: PokemonData[]
  pokemonAmount:number
  searchByNamePokemon:(name: string) => void
  addToPokemon:(pokemon: PokemonData,name:string) => void
  removePokemon:(id:number) => void
  removeAllClearPokemon:() => void
  pokemonsPerPage: number
  getCurrentPokemons: () => PokemonData[]
  nextPage: () => void
  prevPage: () => void
}


// CRIAR UMA VARIVEL PARA STARTAR NOSSO CONTEXTO 
const PokemonCardContext = createContext<PokemonCardContextData> (
    {} as PokemonCardContextData
)

interface PokemonCardProviderProps {
    children: ReactNode
}

    const PokemonCardProvider: React.FC<PokemonCardProviderProps> = ({children}) => {
    
        const [pokemonCart , setPokemonCart] = useState<PokemonData[]>([])
        const [name,setName] = useState<PokemonData[]>([])
        const [pokemonAmount, setPokemonAmout] = useState<number>(0)
        const [currentPage, setCurrentPage] = useState<number>(1)
       


      {/** PAGINAÇÃO */}
       
     const pokemonsPerPage = 10

     const getCurrentPokemons = () => {

       const indexLastPokemon = currentPage * pokemonsPerPage
       const indexFirstPokemon = indexLastPokemon  - pokemonsPerPage

       return pokemonCart.slice(indexFirstPokemon, indexLastPokemon)

     }


     const nextPage = () => {
        setCurrentPage((prevPage) => + 1)
     }
    

     const prevPage =() => {
        setCurrentPage((prevPage) => -1)
     }
        
 
        useEffect(() => {

         if(pokemonCart) {
            const amount = pokemonCart.reduce(
            (acumulator, currentItem) => acumulator + 1 ,0)

            setPokemonAmout(amount)
         }

    
        },[pokemonCart])



        const addToPokemon = (pokemon: PokemonData, name:string) => {
        
        const checkPokemon = pokemonCart.find((pokemon) => pokemon.name === name)
        //pokemoncart.filter((item) => item.id !== id)
        
          if(checkPokemon) {
            toast.error('Esse pokemon já foi capturado !')
            return;
          }

          setPokemonCart([...pokemonCart, {...pokemon, name, amount: 1}])

        }

    
         
      const removePokemon = (id:number) => {
        const pokemon = pokemonCart.filter((pokemon) => pokemon.id !== id)
        setPokemonCart(pokemon)  
      }


      const removeAllClearPokemon = () => {
        setPokemonCart([])
      }

   

     const searchByNamePokemon = (name: string) => {

       const pokemonName = pokemonCart.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
       )
       setName(pokemonName)
     }

    return (


      <PokemonCardContext.Provider value={{}}>
        {children}
      </PokemonCardContext.Provider>

    )

      
}

export default PokemonCardProvider