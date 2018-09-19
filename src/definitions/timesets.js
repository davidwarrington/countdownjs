const timesets = [
    // {
    //     singular: 'millisecond',
    //     plural: 'milliseconds',
    //     period: 1,
    //     unit: 'ms'
    // },
    {
        singular: 'second',
        plural: 'seconds',
        period: 1000,
        unit: 's'
    },
    {
        singular: 'minute',
        plural: 'minutes',
        period: 1000 * 60,
        unit: 'm'
    },
    {
        singular: 'hour',
        plural: 'hours',
        period: 1000 * 60 * 60,
        unit: 'h'
    },
    {
        singular: 'day',
        plural: 'days',
        period: 1000 * 60 * 60 * 24,
        unit: 'd'
    }
]

export default timesets;
