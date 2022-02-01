const getDays = (period) => {
    let days;
    switch (period) {
        case 'Last Week':
            days = 7;
            break;
        case 'Last Month':
            days = 30;
            break;
        case 'Last 3 Months':
            days = 90;
            break;
        case 'Last 6 Months':
            days = 180;
            break;
        case 'Last Year':
            days = 365;
    }
    return days;
};

export const getPeriod = (period) => {
    const days = getDays(period);
    let now = new Date();
    return new Date(now.setDate(now.getDate() - days));
};
