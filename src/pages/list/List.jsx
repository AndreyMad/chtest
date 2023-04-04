import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import data from '../../data.json';
import moment from 'moment';
import style from './list.module.css';
import LatestTransactions from '../../components/LatestTransactions';
import { calculatePoints,getRandomInteger } from '../../utils/helpers';

const List = () => {
  const [balance, setBalance] = useState(0);
  const [available, setAvailable] = useState();
  const getRandomBalance = (min, max) => {
    const rand = getRandomInteger(min, max)
    setBalance(rand);
    setAvailable((data.cardLimit - rand).toFixed(2));
    return rand;
  };

  useEffect(() => {
    getRandomBalance(1, 1500);
  }, []);

  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <div className={style.block}>
          <span className={style.title}>Card balance</span>
          <span className={style.balanceValue}>$ {balance}</span>
          <span className={style.secondaryText}>$ {available} Available</span>
        </div>
        <div className={style.block}>
          <span className={style.title}>Daily points</span>
          <span className={style.secondaryText}>{calculatePoints()}</span>
        </div>
        <div className={style.block}>
          <span className={style.title}>No paymet due</span>
          <span className={style.secondaryText}>
            You’ve paid your {moment().format('MMMM')} balance.
          </span>
          <span className={style.icon}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
        </div>
      </div>
      <LatestTransactions transactions={data.latestTrasaction} />
    </section>
  );
};

export default List;
