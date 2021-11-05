import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import classes from "../css/Pagination.module.css";
import { useDispatch } from "react-redux";
import { pokemonsActions } from "../store/pokemonsStore";

const Pagination = (props) => {
  const currentPage = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const pages = 10;
  const pagesArr = new Array(pages).fill("");

  const history = useHistory();

  const goToPage = (page) => {
    dispatch(pokemonsActions.changePage(page));
    window.scrollTo({ top: 0 });
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      dispatch(pokemonsActions.changePage(currentPage - 1));
      history.push(`/page/${currentPage - 1}`);
      window.scrollTo({ top: 0 });
    }
  };
  const nextPage = () => {
    if (currentPage !== pages) {
      dispatch(pokemonsActions.changePage(currentPage + 1));
      history.push(`/page/${currentPage + 1}`);
      window.scrollTo({ top: 0 });
    }
  };
  return (
    <div className={classes.pagination}>
      <button className={classes.btn} onClick={prevPage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classes["btn-icon"]}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {pagesArr.map((element, index) => (
        <NavLink
          key={Math.random()}
          activeClassName={classes.active}
          className={classes["page-link"]}
          to={`/page/${index + 1}`}
          onClick={() => {
            goToPage(index + 1);
          }}
        >
          {index + 1}
        </NavLink>
      ))}
      <button className={classes.btn} onClick={nextPage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classes["btn-icon"]}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
