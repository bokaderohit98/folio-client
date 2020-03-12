export const capitalize = string => {
    return string
        .split('-')
        .join(' ')
        .split(' ')
        .map(item => {
            return item.charAt(0).toUpperCase() + item.slice(1);
        })
        .join(' ');
};
