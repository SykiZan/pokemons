import React, { useEffect, useState } from "react";
import classes from "../css/PokemonInfo.module.css";
const PokemonInfo = (props) => {
  const [moves, setMoves] = useState([]);
  const [stats, setStats] = useState([]);

  const getStats = () => {
    const statsNameArr = props.pokemon.stats.map((data) => data.stat.name);
    const statsValuesArr = props.pokemon.stats.map((data) => data.base_stat);

    const statsObj = {};
    statsNameArr.forEach((key, value) => {
      statsObj[key] = statsValuesArr[value];
    });
    setStats(statsObj);
  };

  useEffect(() => {
    getStats();
  }, []);

  const getMoves = () => {
    const movesArr = props.pokemon.moves.map((move) => move.move.name);

    setMoves(movesArr);
  };
  useEffect(() => {
    getMoves();
  }, []);

  return (
    <>
      <div className={classes.pokemon}>
        <img src={props.pokemon.sprites.front_default} alt="img" />
        <h3 className={classes.name}>{props.pokemon.name}</h3>
      </div>

      <h2 className={classes["header"]}>STATS</h2>
      <div className={classes.stats}>
        {Object.entries(stats).map(([key, value]) => (
          <div>
            <div>{key}</div>
            <div>{value}</div>
          </div>
        ))}
      </div>
      <h2 className={classes["header"]}>MOVES</h2>
      <ul className={classes.moves}>
        {moves.map((move) => (
          <li>{move}</li>
        ))}
      </ul>
    </>
  );
};

export default PokemonInfo;
