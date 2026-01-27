import { format } from 'date-fns';

export const getFormattedDate = (value, type = 'type1') => {
    if (!value) return null;

    if (type === 'type1') {
        return format(new Date(value), 'dd-MMM-yyyy'); // 01-Jan-2020
    }

    return value;
};
