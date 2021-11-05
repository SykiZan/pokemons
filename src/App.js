import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import ListPage from "./components/ListPage";

import PokemonInfo from "./components/PokemonInfo";
import { fetchPokemons } from "./store/pokemonsStore";

function App() {
  const dispatch = useDispatch();
  const pokemonsArr = useSelector((state) => state.pokemonsArr);
  const currentPage = useSelector((state) => state.page);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [filterVal, setFilterVal] = useState("all");
  useEffect(() => {
    dispatch(fetchPokemons(currentPage));
  }, [currentPage, dispatch]);

  const getSearchVal = (val) => {
    setSearchVal(val);
  };
  const getFilterVal = (val) => {
    setFilterVal(val);
  };

  const searchedPokemons = pokemonsArr.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchVal.toLowerCase().trim())
  );
  const filteredPokemons = searchedPokemons.filter((pokemon) => {
    if (filterVal === "all") return true;
    if (pokemon.types[1]) {
      if (
        pokemon.types[0].type.name === filterVal ||
        pokemon.types[1].type.name === filterVal
      )
        return true;
    }
    if (pokemon.types[0].type.name === filterVal) return true;
  });

  const getPokemonInfoHandler = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <>
      <Route path="/" exact>
        <Redirect to={`/page/${currentPage}`} />
      </Route>
      <Route path="/page/:pageId">
        {pokemonsArr.length > 0 && (
          <ListPage
            pokemons={filteredPokemons}
            getPokemonInfo={getPokemonInfoHandler}
            getSearchVal={getSearchVal}
            getFilterVal={getFilterVal}
            allPokemons={pokemonsArr}
          />
        )}
      </Route>
      <Route path="/info">
        <PokemonInfo pokemon={selectedPokemon} />
      </Route>
    </>
  );
}

export default App;
