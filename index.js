var events = {};

var on = function(event, func){
	if (Array.isArray(event)){
		// multiple events
		event.forEach(function(ev){
			on(ev, func);
		});	
		return;
	}

	if (Array.isArray(func)){
		// multiple functions
		func.forEach(function(fn){
			on(event, fn);			
		});
		return;
	}

	if (typeof event === 'object'){
		for (ev in event){
			on(ev,event[ev]);
		}
		return;
	}

	if (!events[event]) events[event] = [];
	events[event].push(func);
};

var emit = function(event, arg){

	if (Array.isArray(event)){
		event.forEach(function(ev){
			emit(ev,arg);
		});
		return;
	}

	if (!events[event]) return;
	events[event].forEach(function(func){
		func(arg);
	});
};

var clearAll = function(){
	events = {};
};

var clear = function(event){
	if (!events[event]) return;
	events[event] = [];
};

module.exports = {
  clear: clear,
  clearAll: clearAll,
  on: on,
  sub: on,
  emit: emit,
  fire: emit,
  pub: emit
};
