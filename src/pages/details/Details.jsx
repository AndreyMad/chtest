import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './Details.module.css';
import data from '../../data.json';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const transaction = data.latestTrasaction.find((el) => el.id === Number(id));
  const { summ, name, description, createdAt, isPending } = transaction;

  return (
    <div className={style.container}>
      <button className={style.backBtn} onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span className={style.titleSumm}>{`$${summ}`}</span>
      <span className={style.name}>{name}</span>
      <span className={style.date}>
        {moment(createdAt).format('DD/MM/YYYY, HH:MM')}
      </span>
      <div className={style.infoWrapper}>
        <div className={style.descriptionWrapper}>
          <span className={style.status}>{`Status: ${
            isPending ? 'Pending' : 'Approved'
          }`}</span>
          <span className={style.description}>{description}</span>
        </div>

        <span className={style.total}>
          Total: <span>{`${summ}$`}</span>
        </span>
      </div>
    </div>
  );
};

export default Details;
