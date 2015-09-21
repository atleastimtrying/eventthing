var et = require('./index');

describe('event thing', function(){
	it('supports on and emit', function(done){

		et.on('foo', function(){
			done();
		});

		et.emit('foo');
	});

	it('supports multiple subscribers', function(done){
		var count = 0;

		et.on('bar', function(){
			count++;
			if (count === 2) done();
		});

		et.on('bar', function(){
			count++;
			if (count === 2) done();
		});

		et.emit('bar');
	});

	it('supports arguments', function(done){
		var count = 0;

		et.on('qux', function(arg){
			if (arg !== 'unit test') return done('wrong arg');
			done();
		});

		et.emit('qux', 'unit test');
	});

	it('supports clearing events', function(done){
		et.on('clearedevent', function(){
			done('event not cleared');
		});

		et.clear('clearedevent');

		et.on('clearedevent', function(){
			done();
		});
		et.emit('clearedevent');
	});

	it('allows events with no subscribers', function(done){
		et.emit('no-listeners');
		done();
	});

	it('supports clear all', function(done){
		et.on('clearallevent', function(){
			done('event not cleared');
		});
		et.clearAll();
		et.on('clearallevent', function(){
			done();
		});
		et.emit('clearallevent');
	});

	it ('supports subscription to multiple events', function(done){
		var count = 0;
		et.on(['multi-1','multi-2'], function(){
			count++;
			if (count === 2) done();
		});	
		et.emit('multi-1');
		et.emit('multi-2');

	});

});