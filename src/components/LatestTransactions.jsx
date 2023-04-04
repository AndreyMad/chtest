import React, { useRef } from 'react';
import style from './LatestTransactions.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faApple,
  faYoutube,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import moment from 'moment';
import { faN, faHouse } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { getRandomInteger } from '../utils/helpers';

const LatestTransactions = ({ transactions }) => {
  const descriptionParent = useRef();
  const parentWidth = descriptionParent?.current?.offsetWidth;
  const today = moment();

  const getDescription = (isPending, description, parentWidth) => {
    const maxTextWidth = (parentWidth - 50) / 12;
    if (isPending) {
      const str = `Pending - ${description}`;
      return str.length > maxTextWidth
        ? str.slice(0, maxTextWidth).concat('...')
        : str;
    }
    return description.length > maxTextWidth
      ? description.slice(0, maxTextWidth).concat('...')
      : description;
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'youtube':
        return <FontAwesomeIcon color="#fff" icon={faYoutube} />;
      case 'netflix':
        return <FontAwesomeIcon color="#fff" icon={faN} />;
      case 'google':
        return <FontAwesomeIcon color="#fff" icon={faGoogle} />;
      case 'apple':
        return <FontAwesomeIcon color="#fff" icon={faApple} />;
      default:
        return <FontAwesomeIcon color="#fff" icon={faHouse} />;
    }
  };

  const getDate = (userName, date) => {
    const daysDiff = today.diff(date, 'days');
    switch (daysDiff) {
      case 0:
        return userName ? `${userName} - Today` : 'Today';
      case 1:
        return userName ? `${userName} - Yesterday` : 'Yesterday';
      default:
        if (daysDiff < 7) {
          return userName
            ? `${userName} - ${moment(date).format('dddd')}`
            : moment(date).format('dddd');
        }
        return userName
          ? `${userName} - ${moment(date).format('DD/MM/YYYY')}`
          : moment(date).format('DD/MM/YYYY');
    }
  };

  return (
    <>
      <h2>Latest Transactions</h2>
      <div className={style.container}>
        {transactions.map(
          ({
            id,
            type,
            name,
            description,
            isPending,
            authorizedUser,
            creadetAt,
            summ,
          }) => (
            <NavLink
              to={`/chtest/list/${id}`}
              className={style.wrapper}
              ref={descriptionParent}
            >
              <span
                className={
                  type === 'PAYMENT'
                    ? `${style.icon} ${style.iconPayment}`
                    : `${style.icon}`
                }
              >
                {getIcon(name)}
              </span>
              <div className={style.textWrapper}>
                <span className={style.title}>
                  {type === 'PAYMENT' ? 'Payment' : name}
                </span>
                <span>
                  {parentWidth &&
                    getDescription(isPending, description, parentWidth)}
                </span>
                <span>{getDate(authorizedUser, creadetAt)}</span>
              </div>
              <div className={style.paymentWrapper}>
                <span className={style.payment}>{type==='PAYMENT'?`+$${summ}`:`$${summ}`}</span>
                <span className={style.percent}>{`${Math.round(
                  getRandomInteger(1, 10)
                )}%`}</span>
              </div>
            </NavLink>
          )
        )}
      </div>
    </>
  );
};

export default LatestTransactions;
