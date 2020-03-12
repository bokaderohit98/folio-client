import moment from 'moment';

export const getDate = ticks => moment(ticks, 'x').format('DD/MM/YYYY');

export const getAge = ticks => {
    return moment().diff(new Date(Number(ticks)), 'years');
};
