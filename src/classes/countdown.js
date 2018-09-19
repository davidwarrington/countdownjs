import timesets from '../definitions/timesets';

class Countdown {
    constructor(element, options = {}) {
        this.el = element;
        this.to = new Date(this.el.dataset.to).getTime() || new Date(options.to).getTime() || new Date('2018/09/20 11:00').getTime();
        // this.from = this.el.dataset.from || options.from;
        this.interval = this.el.dataset.interval || options.interval || 1000;

        this.available_timesets = timesets;

        this.init();
    }

    init() {
        const interval = setInterval(() => {

            let distance = this.time_until_end();
            if (distance <= 0) clearInterval(interval);

            const timesets = this.used_timesets(this.available_timesets);

            let output = '';
            timesets.forEach(timeset => {
                const total = Math.floor(distance / timeset.period);
                output += `${total} ${timeset.plural}, `;
                distance = distance % timeset.period;
            });

            console.log(output);
          }, this.interval);
    }

    time_until_end() {
        return this.to - new Date().getTime();
    }

    used_timesets(timesets) {
        let used_timesets = [];
        timesets.forEach(timeset => {
            used_timesets.push(timeset);
        });
        return this.order_array(used_timesets);
    }

    order_array(array) {
        return array.sort((a, b) => b.period - a.period);
    }
}

export default Countdown;
