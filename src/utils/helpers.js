import moment from 'moment';

export const calculatePoints = () => {
  const days = claculateDays();
  const array = new Array(days).fill(undefined);

  array.forEach((_, index) => {
    if (index === 0) {
      return (array[index] = 2);
    }
    if (index === 1) {
      return (array[index] = 3);
    }
    return (array[index] = Math.round(
      array[index - 1] + array[index - 2] * 0.6
    ));
  });
  const points = array.reduce((acc, num) => acc + num, 0);

  if (points > 1000 && points < 1000000) {
    return `${Math.round(points / 1000)}K`;
  }
  if (points > 1000000) {
    return `${Math.round(points / 1000000)}B`;
  }
  return points.toString();
};

const claculateDays = () => {
  const today = moment();
  const currentYear = moment().format('YYYY');
  const seasonArray = [
    { name: 'Spring', date: moment(`01.03.${currentYear}`, 'DD.MM.YYYY') },
    { name: 'Summer', date: moment(`01.06.${currentYear}`, 'DD.MM.YYYY') },
    { name: 'Autumn', date: moment(`01.09.${currentYear}`, 'DD.MM.YYYY') },
    { name: 'Winter', date: moment(`01.12.${currentYear}`, 'DD.MM.YYYY') },
  ];
  const season =
    seasonArray.reverse().find(({ date }) => today.diff(date) >= 0) ||
    seasonArray[0];

  const getDaysOfCurrentSeason = () => {
    if (season.name === 'Winter' && today.diff(season.date, 'days') < 0) {
      return today.diff(season.date.subtract(1, 'year'), 'days');
    }
    return today.diff(season.date, 'days');
  };
  return getDaysOfCurrentSeason();
};

export const getRandomInteger = (min, max) => {
  return (min - 0.5 + Math.random() * (max - min + 1)).toFixed(2);
};
