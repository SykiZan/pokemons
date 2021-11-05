import React from "react";
import { useHistory } from "react-router";
import classes from "../css/PocemonCard.module.css";

const PokemonCard = (props) => {
  const history = useHistory();
  const goInfoPage = () => {
    props.getPokemonInfo(props.id);
    history.push("/info");
  };

  return (
    <div className={classes["pokemon-card"]} onClick={goInfoPage}>
      <img src={props.image} alt="img" />
      <h3 className={classes.name}>{props.name}</h3>
    </div>
  );
};

export default PokemonCard;
