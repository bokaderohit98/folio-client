export const capitalize = string => {
    return string
        .split('_')
        .map(item => {
            return item.charAt(0).toUpperCase() + item.slice(1);
        })
        .join(' ');
};
