class Countdown {
    constructor(element, options = {}) {
        this.el = element;
        this.to = new Date(this.el.dataset.to).getTime() || new Date(options.to).getTime() || new Date('2018/09/20 11:00').getTime();
        // this.from = this.el.dataset.from || options.from;
        this.interval = this.el.dataset.interval || options.interval || 1000;

        this.init();
    }

    init() {
        const interval = setInterval(() => {

            let distance = this.time_until_end();
            if (distance <= 0) clearInterval(interval);

            const timesets = [
                {
                    name: 'days',
                    period: 1000 * 60 * 60 * 24
                },
                {
                    name: 'hours',
                    period: 1000 * 60 * 60
                },
                {
                    name: 'minutes',
                    period: 1000 * 60
                },
                {
                    name: 'seconds',
                    period: 1000
                },
                // {
                //     name: 'milliseconds',
                //     period: 1
                // }
            ]

            let output = '';
            timesets.forEach(timeset => {
                let total = Math.floor(distance / timeset.period);
                output += `${total} ${timeset.name}, `;
                distance = distance - (total * timeset.period);
            })

            console.log(output);
          }, this.interval);
    }

    time_until_end() {
        return this.to - new Date().getTime();
    }
}

export default Countdown;
