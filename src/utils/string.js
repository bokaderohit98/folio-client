export const capitalize = string => {
    return (
        string &&
        string
            .split('-')
            .join(' ')
            .split('_')
            .join(' ')
            .split(' ')
            .map(item => {
                return item.charAt(0).toUpperCase() + item.slice(1);
            })
            .join(' ')
    );
};
