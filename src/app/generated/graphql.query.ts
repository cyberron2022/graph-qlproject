import { gql } from 'apollo-angular';

const Pokemons_List = gql`
  fragment Pokemons on pokemon_v2_pokemon {
    id
    name
    order
    pokemon_species_id
    base_experience
    height
    weight
  }

  fragment PokemonsSprite on pokemon_v2_pokemonsprites {
    id
    pokemon_id
    sprites
  }

  query pokemonsList {
    pokemon_v2_pokemon(limit: 10) {
      id
      is_default
      name
      order
      height
      pokemon_species_id
      base_experience
      weight
      pokemon_v2_pokemonspecy {
        capture_rate
        base_happiness
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        ...PokemonsSprite
      }
    }
  }
`;

const Pokemons_Detail = gql`
  query MyQuery($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      id
      is_default
      name
      order
      height
      pokemon_species_id
      base_experience
      weight
      pokemon_v2_pokemonspecy {
        capture_rate
        base_happiness
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export { Pokemons_List, Pokemons_Detail };
