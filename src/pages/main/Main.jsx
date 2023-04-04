import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './main.module.css';

const Main = () => {
  return (
    <NavLink
      to="/list"
      className={style.link}
    >
        <button className={style.button}> Go to TransactionsList</button>
     
    </NavLink>
  );
};

export default Main;
