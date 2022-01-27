export const optionsPeriod = [
    { value: 'last week', label: 'Last Week' },
    { value: 'last month', label: 'Last Month' },
    { value: 'last 3 months', label: 'Last 3 Months' },
    { value: 'last 6 months', label: 'Last 6 Months' },
    { value: 'last year', label: 'Last Year' }
];

export const optionsStatus = [
    { value: 'premium', label: 'Paid' },
    { value: 'free', label: 'Free' }
];

export const selectStyles = {
    menuList: styles => ({
        ...styles,
        background: 'var(--color-green)',
        padding: 0
    }),
    control: (styles) => ({ ...styles,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        cursor: 'pointer',
        width: '100%'
    }),
    indicatorSeparator: styles => ({ ...styles,
        display: 'none'
    }),
    dropdownIndicator: styles => ({
        ...styles,
        color: 'var(--color-green)'
    }),
    valueContainer: styles => ({ ...styles,
        padding: '0'
    }),
    placeholder: styles => ({ ...styles,
        color: 'var(--color-black)'
    }),
    option: (styles, {isFocused, isSelected}) => ({
        ...styles,
        color: isFocused
            ? 'var(--color-green)'
            : isSelected
                ? 'var(--color-green)'
                : '#fff',
        background: isFocused
            ? '#fff'
            : isSelected
                ? '#fff'
                : 'var(--color-green)',
        cursor: 'pointer',
        zIndex: 1
    }),
    menu: base => ({
        ...base,
        zIndex: 100,
        margin: 0
    })
}
