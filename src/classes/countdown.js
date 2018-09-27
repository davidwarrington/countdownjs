import timesets from '../definitions/timesets';

class Countdown {
    constructor(element, options = {}) {
        this.el = element;
        this.to = new Date(this.el.dataset.to).getTime() || new Date(options.to).getTime() || new Date().getTime() + (1000 * 60 * 60 * 24);
        // this.from = this.el.dataset.from || options.from;
        this.interval = this.el.dataset.interval || options.interval || 1000;
        this.template = this.el.dataset.template || options.template || '{{ days }}, {{ hours }}, {{ minutes }}, {{ seconds }}';

        this.available_timesets = timesets;

        this.init();
    }

    init() {
        const interval = setInterval(() => {

            let distance = this.time_until_end();
            if (distance <= 0) clearInterval(interval);

            const timesets = this.used_timesets(this.template, this.available_timesets);

            let output = this.template;
            timesets.forEach(timeset => {
                const total = Math.floor(distance / timeset.period);
                output = output.replace(new RegExp(`{{ ?${timeset.plural} ?}}`), this.translate_timeset(timeset, total));
                distance = distance % timeset.period;
            });

            this.el.innerHTML = output;
            // clearInterval(interval);
          }, this.interval);
    }

    time_until_end() {
        return this.to - new Date().getTime();
    }

    translate_timeset(timeset, quantity) {
        let translation = timeset.singular;
        if (quantity !== 1) translation = timeset.plural || translation + 's';
        return `${quantity} ${translation}`;
    }

    used_timesets(template, timesets) {
        const used_templates = this.get_templates(template);
        let used_timesets = [];

        used_templates.forEach(template => {
            template = template.replace(/{{ ?| ?}}/g, '');
            const timeset = timesets.filter(timeset => this.match_timeset(template, timeset))[0];
            if (timeset) used_timesets.push(timeset);
        });
        return this.order_array(used_timesets);
    }

    order_array(array) {
        return array.sort((a, b) => b.period - a.period);
    }

    get_templates(template) {
        return template.match(/{{ ?[a-zA-Z]* ?}}/g);
    }

    match_timeset(template, timeset) {
        if (timeset.plural === template || timeset.singular === template || timeset.unit === template) {
            return true;
        }
    }

    match_template(template, timesets) {
        timesets.forEach(timeset => {
            if (template.test(new RegExp(`${timeset.plural}|${timeset.singular}s?`))) {
                return { timeset, template, type: 'full' };
            } else if (template.test(new RegExp(timeset.unit))) {
                return { timeset, template, type: 'num' };
            }
        });
    }
}

export default Countdown;
