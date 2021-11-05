import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { pokemonsArr: [], page: 1 };

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },
    getPokemons(state, action) {
      state.pokemonsArr = [...action.payload];
    },
  },
});

const store = configureStore({
  reducer: pokemonsSlice.reducer,
});

export const fetchPokemons = (page) => {
  return async (dispatch) => {
    const getData = async () => {
      // const res = await fetch(
      //   ` https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 20}&limit=20`
      // );
      const res = await axios.get(
        ` https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 20}&limit=20`
      );

      //const data = await res.json();
      const data = res.data;
      const pokemonsUrl = data.results.map((poke) => poke.url);

      const pokemonsPromise = Promise.all(
        pokemonsUrl.map(async (url) => await axios.get(url))
      );
      const pokemonsRaw = await pokemonsPromise;

      const pokemons = pokemonsRaw.map((arr) => arr.data);

      // const pokemonsPromise = Promise.all(
      //   pokemonsUrl.map(async (url) => await (await fetch(url)).json())
      // );
      // const pokemons = await pokemonsPromise;

      return pokemons;
    };
    const pokemons = await getData();

    dispatch(pokemonsActions.getPokemons(pokemons));
  };
};

export const pokemonsActions = pokemonsSlice.actions;
export default store;
