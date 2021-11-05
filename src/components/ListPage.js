import React, { useEffect, useState } from "react";
import classes from "../css/ListPage.module.css";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";

const ListPage = (props) => {
  const [searchVal, setSearchVal] = useState("");
  const [filterVal, setFilterVal] = useState("");
  const [types, setTypes] = useState([]);
  const pokemons = props.pokemons;
  const allPokemons = props.allPokemons;

  const inputChangeHandler = (e) => {
    setSearchVal(e.target.value);
    props.getSearchVal(e.target.value);
  };
  const dropdownChangeHandler = (e) => {
    setFilterVal(e.target.value);
    props.getFilterVal(e.target.value);
  };

  const getTypes = () => {
    const typeObjects = allPokemons.map((data) => data.types);
    const typesArr1 = typeObjects.map((data) => data[0].type.name);

    const typesArr2 = typeObjects
      .filter((data) => {
        if (data.length > 1) return true;
      })
      .map((data) => data[1].type.name);
    const typesArrFull = [...typesArr1, ...typesArr2];

    const uniqueTypes = [...new Set(typesArrFull)];

    setTypes(uniqueTypes);
  };
  useEffect(() => {
    getTypes();
  }, [props]);

  return (
    <div>
      <div className={classes.filters}>
        <div className={classes.search}>
          <label>Search:</label>
          <input type="text" onChange={inputChangeHandler} value={searchVal} />
        </div>
        <div className={classes.filter}>
          <label>Filter by type:</label>
          <select onChange={dropdownChangeHandler}>
            <option value="all">All</option>
            {types.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={classes["list-page"]}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={Math.random()}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            getPokemonInfo={props.getPokemonInfo}
            id={pokemon}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default ListPage;
