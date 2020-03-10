import moment from 'moment';

export const getDate = ticks => moment(ticks, 'x').format('DD/MM/YYYY');
