const getDays = (period) => {
    let days;
    switch (period) {
        case 'last week':
            days = 7;
            break;
        case 'last month':
            days = 30;
            break;
        case 'last 3 months':
            days = 90;
            break;
        case 'last 6 months':
            days = 180;
            break;
        case 'last year':
            days = 365;
    }
    return days;
};

export const getPeriod = (period) => {
    const days = getDays(period);
    let now = new Date();
    return new Date(now.setDate(now.getDate() - days));
};
