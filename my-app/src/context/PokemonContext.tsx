import React, { createContext, useState, useEffect, ReactNode } from 'react'
import axios, { AxiosResponse } from 'axios'

// DEFININDO O TIPO DOS POKEMONS O RETORNO []

interface Pokemon {
  name: string
  url: string
}

// DEFININDO O TIPO PARA O CONTEXTO

interface PokemonContextType {
  pokemons: Pokemon[]
  getPokemons: () => Promise<void>
}


// CRIANDO O CONTEXTO COM UM VALOR
export const PokemonContext = createContext<PokemonContextType>({
  pokemons: [],
  getPokemons: async () => {}
})

const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // ESTADOS POKEMONS
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  const getPokemons = async () => {
    try {
      const pokemonPoints: Promise<AxiosResponse<Pokemon>>[] = []
      for (let i = 1; i <= 50; i++) {
        pokemonPoints.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
      }

      const response = await axios.all(pokemonPoints)
      const fetchedPokemons = response.map((response) => response.data)

      setPokemons(fetchedPokemons)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPokemons()
  }, [])

  console.log(pokemons)

  return (
    <PokemonContext.Provider value={{ pokemons, getPokemons }}>
      {children}
    </PokemonContext.Provider>
  )
}

export default PokemonProvider
