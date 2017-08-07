const flak = require('../src/flak');
const be = require('bejs');

describe('flak', function () {
    it('on, single listener', (done) => {

        const event = new flak();

        event.on('myEvent', (param)=>{
            console.log(param);
            done();
        });

        event.fire('myEvent', {a: 123});
        console.log(event.getListeners());
    });

    it('on, one event multi listener', (done) => {

        const event = new flak();

        function listener1(param){
            console.log('listener1', param);
            done();
        }

        function listener2(param){
            console.log('listener2', param);
        }

        event.on('myEvent', [listener1, listener2]);

        event.fire('myEvent', {a: 123});
        console.log(event.getListeners());
    });

    it('on, more event multi listener', (done) => {

        const event = new flak();

        function listener1(param, other){
            console.log('listener1', param, other);
            done();
        }

        function listener2(param, other){
            console.log('listener2', param, other);
        }

        function listener3(param, other){
            console.log('listener3', param, other);
        }

        function listener4(param, other){
            console.log('listener4', param, other);
        }

        event.on('myEvent1', [listener1, listener2]);
        event.on('myEvent2', [listener2, listener3]);
        event.on('catchAll', (param, other)=>{
            console.log('catchAll', param, other);
        });

        event.fire('myEvent1', {a: 123}, 'hello');
        event.fire('myEvent2', {a: 456}, 'world');

        console.log(event.getListeners());
    });

    it('on, undefined event name throw error', (done) => {

        const event = new flak();

        try {
            event.on();
            done('error');
        } catch (e) {
            be.err(done).equal(e.message, flak._error[0]);
        }
    });

    it('on, undefined callback name throw error', (done) => {

        const event = new flak();

        try {
            event.on('event');
            done('error');
        } catch (e) {
            be.err(done).equal(e.message, flak._error[1]);
        }
    });

    it('same event name', (done) => {

        const event = new flak();

        const listener1 = ()=>{return true};
        const listener2 = ()=>{return true};

        const _array = [listener1];

        console.log(listener1 === listener2);
        console.log(listener1 === _array[0]);
        console.log(listener2 === _array[0]);

        event.on('myEvent', (param)=>{
            console.log(param, 'hello');
        });

        event.on('myEvent', (param, param2)=>{
            console.log(param, param2);
            done();
        });

        event.fire('myEvent', {a: 123}, 'wowo');
        console.log(event.getListeners());
    });
});