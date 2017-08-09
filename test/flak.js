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
        console.log(event.getEvents());
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
        console.log(event.getEvents());
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

        console.log(event.getEvents());
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

        _array[0].o = {a:1};

        console.log(_array[0].o);

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
        console.log(event.getEvents());
    });

    it('remove one event listener', ()=>{
        const event = new flak();

        event.on('myEvent', (param)=>{
            console.log(param, 'hello');
        });

        event.fire('myEvent', {a: 123}, 'wowo');
        console.log(event.getEvents());
        event.off('myEvent');
        console.log(event.getEvents());
        be.err.equal(0, event.getEvents()['myEvent'].length);
    });

    it('remove event listener same name', ()=>{
        const event = new flak();

        event.on('myEvent', (param)=>{
            console.log(param, 'hello');
        });

        event.on('myEvent1', (param)=>{
            console.log(param, 'world');
        });

        event.on('myEvent', (param)=>{
            console.log(param, 'world');
        });

        event.fire('myEvent', {a: 123}, 'wowo');
        console.log(event.getEvents());
        event.off('myEvent');
        console.log(event.getEvents());
        be.err.equal(0, event.getEvents()['myEvent'].length);
    });

    it('remove event listener by listener', ()=>{
        const event = new flak();
        let listener1;
        let listener2;
        let listener3;
        event.on('myEvent', listener1 = (param)=>{
            console.log(param, 'hello');
        });

        event.on('myEvent1', listener2 = (param)=>{
            console.log(param, 'world');
        });

        event.on('myEvent', listener3 = (param)=>{
            console.log(param, 'world');
        });

        event.fire('myEvent', {a: 123}, 'wowo');
        console.log(event.getEvents());
        event.off('myEvent', listener1);
        console.log(event.getEvents());
        event.fire('myEvent', {a: 123}, 'wowo');
        be.err.equal(1, event.getEvents()['myEvent'].length);
    });

    it('once', (done)=> {
        const event = new flak();
        event.once('myEvent', (param)=>{
            console.log(param, 'hello');
            done();
        });
        event.on('myEvent', (param)=>{
            console.log(param, 'hello');
        });
        console.log(event.getEvents());
        event.fire('myEvent', {a: 123}, 'wowo');
        event.fire('myEvent', {a: 123}, 'wowo');
        console.log('total', event.getEvents());
    });

    it('on max calls setting', (done)=> {
        const event = new flak();
        let calls = 0;
        event.on('myEvent', (param)=>{
            console.log(param, 'hello');
            calls++;
        }, {
            maxCalls: 4
        });
        event.fire('myEvent', {a: 123}, 'wowo');
        event.fire('myEvent', {a: 123}, 'wowo');
        event.fire('myEvent', {a: 123}, 'wowo');
        event.fire('myEvent', {a: 123}, 'wowo');
        event.fire('myEvent', {a: 123}, 'wowo');
        event.fire('myEvent', {a: 123}, 'wowo');
        if(calls === 4)
            done();
    });

    it('maxListeners', (done)=> {

        const event = new flak({
            maxListeners: 4
        });

        try {

            event.on('myEvent', (param) => {
                console.log(param, 'hello');
            });
            event.on('myEvent', (param) => {
                console.log(param, 'hello');
            });
            event.on('myEvent', (param) => {
                console.log(param, 'hello');
            });
            event.on('myEvent', (param) => {
                console.log(param, 'hello');
            });
            event.on('myEvent', (param) => {
                console.log(param, 'hello');
            });
            event.on('myEvent', (param) => {
                console.log(param, 'hello');
            });

            event.fire('myEvent', {a: 123}, 'wowo');

            done('error');

        } catch (e) {
            console.log(e.message);
            be.err.equal(4, event.getListeners('myEvent').length);
            done();
        }
    });

    it('setMaxListeners', (done)=> {

        const event = new flak({
            maxListeners: 4
        });

        event.setMaxListeners(10);

        try {

            event.on('myEvent', (param) => {
                console.log(param, 'hello');
            });
            event.on('myEvent', (param) => {
                console.log(param, 'hello');
            });
            event.on('myEvent', (param) => {
                console.log(param, 'hello');
            });
            event.on('myEvent', (param) => {
                console.log(param, 'hello');
            });
            event.on('myEvent', (param) => {
                console.log(param, 'hello');
            });
            event.on('myEvent', (param) => {
                console.log(param, 'hello');
            });

            event.fire('myEvent', {a: 123}, 'wowo');

            done();

        } catch (e) {
            done(e);
        }
    });

    it('getMaxListeners', ()=> {
        const event = new flak({
            maxListeners: 4
        });

        be.err.equal(4, event.getMaxListeners());
    });

    it('clear', ()=> {
        const event = new flak();

        event.on('myEvent', (param) => {
            console.log(param, 'hello');
        });
        event.on('myEvent', (param) => {
            console.log(param, 'hello');
        });
        event.on('myEvent', (param) => {
            console.log(param, 'hello');
        });

        event.clear();

        be.err.equal(0, event.getListenersCount('myEvent'));
    });

    it('getListenersCount equal 3', ()=> {
        const event = new flak();

        event.on('myEventPlus', (param) => {
            console.log(param, 'hello');
        });

        event.on('myEvent', (param) => {
            console.log(param, 'hello');
        });
        event.on('myEvent', (param) => {
            console.log(param, 'hello');
        });
        event.on('myEvent', (param) => {
            console.log(param, 'hello');
        });

        be.err.equal(3, event.getListenersCount('myEvent'));
        be.err.equal(1, event.getListenersCount('myEventPlus'));
    });

    it('prependListener', ()=> {
        const event = new flak();

        event.on('myEventPlus', (param) => {
            console.log(param, 'hello');
        });

        event.prependListener('myEvent', (param) => {
            console.log(param, 'hello');
        });

        be.err.truthy(event.getEvents()['myEvent']);
    });

    it('prependListener fail', (done)=> {
        const event = new flak();

        try {
            event.prependListener('myEvent');
        } catch (e) {
            console.log(e.message);
            be.err(done).equal(flak._error[1], e.message);
        }
    });

    it('prependOnceListener', ()=> {
        const event = new flak();

        event.on('myEventPlus', (param) => {
            console.log(param, 'hello');
        });

        event.prependOnceListener('myEvent', (param) => {
            console.log(param, 'hello');
        });

        //be.err.equal('myEvent', event.getListeners()[0]);
        be.err.truthy(event.getEvents()['myEvent']);
        event.fire('myEvent', 'a1');
        // not fire
        event.fire('myEvent', 'a2');
        console.log(event.getListeners());
        //be.err.not.equal('myEvent', event.getEvents()[0]);
        console.log(event.getEvents());
        be.err.equal(0, event.getEvents()['myEvent'].length);
    });

    it('prependOnceListener fail', (done)=> {
        const event = new flak();

        try {
            event.prependOnceListener('myEvent');
        } catch (e) {
            console.log(e.message);
            be.err(done).equal(flak._error[1], e.message);
        }
    });

    it('on and once same name', (done)=> {
        const event = new flak();

        event.once('myEvent', (param) => {
            console.log(param, 'hello1');
            done();
        });

        event.on('myEvent', (param) => {
            console.log(param, 'hello2');

        });

        event.fire('myEvent', 'a1');
        event.fire('myEvent', 'a2');
        //event.fire('myEvent', 'a3');

        console.log(event.getListeners());
    });

    it('once and on same name, produce multiple calls', (done)=> {
        const event = new flak();

        event.on('myEvent', (param) => {
            console.log(param, 'hello1');
        });

        event.once('myEvent', (param) => {
            console.log(param, 'hello2');
            done();
        });

        event.fire('myEvent', 'a1');
        event.fire('myEvent', 'a2');
        event.fire('myEvent', 'a3');

        console.log(event.getListeners());
        be.err.equal(1, event.getListeners().length)
    });

});