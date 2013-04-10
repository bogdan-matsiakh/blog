main = (function () {
	
	var _items = [],
		_controls = {},
		_constants = {
			COLUMNS : 20,
			ROWS : 20
		},
		_counter,
		
		_currentStep = [],
	
		_init = function () {
			var i, 
				j,
				template;
				
			_controls = {
				container : document.getElementById('container'),
				start : document.getElementById('start')
			}
			for (i = 0; i < _constants.ROWS; i++) {
				_items[i] = [];
				for (j = 0; j < _constants.COLUMNS; j++) {
					template = _createElement();
					
					_items[i].push({
						start : false,
						finish : false,
						barrier : false,
						checked :false,
						
						row : i,
						column : j,
						dom : template
					});
				};				
			};
			_controls.start.addEventListener('click', function () {
				_startWave();
			});
		},
		_createElement = function (row, column) {
			var elem = document.createElement('div');
			elem.classList.add('elem');
			
			_controls.container.appendChild(elem);
			
			elem.addEventListener('mousedown', function (e) {
				e.preventDefault();
				e.stopPropagation();

				if (e.which == 1) {
					_removeStart();
					e.target.classList.toggle('start');
				} else if (e.which == 2) {
					e.target.classList.toggle('barrier');
				} else if (e.which == 3) {
					_removeFinish();
					e.target.classList.toggle('finish');
				}
			})
			return elem;
		},
		_checkItems = function () {
			for (var i = 0; i < _items.length; i += 1) {
				for (var j = 0; j < _items[i].length; j += 1) {
					_items[i][j].dom.classList.remove('way');
					_items[i][j].start = false;
					_items[i][j].finish = false;
					if (_items[i][j].dom.classList.contains('barrier')) {
						_items[i][j].barrier = true;
					} else if (_items[i][j].dom.classList.contains('finish')) {
						_items[i][j].finish = true;
					} else if (_items[i][j].dom.classList.contains('start')) {
						_items[i][j].start = true;
					} else {
						_items[i][j].weight = 0;
					}
				};
			};
			_counter = 1
		},
		_removeStart = function () {
			for (var i = 0; i < _items.length; i += 1) {
				for (var j=0; j < _items[i].length; j++) {
					_items[i][j].dom.classList.remove('start');
				};
			};
		},
		_removeFinish = function () {
			for (var i = 0; i < _items.length; i += 1) {
				for (var j = 0; j < _items[i].length; j++) {
					_items[i][j].dom.classList.remove('finish');
				};
			};
		},
		_getStart = function () {
			for (var i = 0; i < _items.length; i += 1) {
				for (var j=0; j < _items[i].length; j++) {
					if (_items[i][j].dom.classList.contains('start')) {
						return _items[i][j];
					}
				}
			};
		},
		_getFinish = function () {
			for (var i = 0; i < _items.length; i += 1) {
				for (var j=0; j < _items[i].length; j++) {
					if (_items[i][j].dom.classList.contains('finish')) {
						return _items[i][j];
					}
				}
			};
		},
		_startWave = function () {
			var start = _getStart(),
				finish = _getFinish();
				
			start.start = true;
			finish.finish = true;
			
			_checkItems();
			
			_currentStep[_counter] = [];
			
			if (_checkItemUp(start.row + 1,start.column)) {
				_currentStep[_counter].push(_items[start.row + 1][start.column]);
			}
			if (_checkItemDown(start.row - 1,start.column)) {
				_currentStep[_counter].push(_items[start.row - 1][start.column]);
			}					
			if (_checkItemLeft(start.row, start.column + 1)) {
				_currentStep[_counter].push(_items[start.row][start.column + 1]);
			}					
			if (_checkItemRight(start.row, start.column - 1)) {
				_currentStep[_counter].push(_items[start.row][start.column - 1]);
			}
			
			_check(_currentStep[_counter]);
		},
		_check = function (items) {
			var index = _counter,
				i;
			
			_currentStep[index + 1] = [];
			
			for (i = 0; i < items.length; i++) {
				if (items[i].finish) {
					_finish();
					return;
				} else if (items[i].weight == 0) {
					if (_checkItemUp(items[i].row + 1, items[i].column)) {
						_currentStep[index + 1].push(_items[items[i].row + 1][items[i].column]);
					}
					if (_checkItemDown(items[i].row - 1,items[i].column)) {
						_currentStep[index + 1].push(_items[items[i].row - 1][items[i].column]);
					}					
					if (_checkItemLeft(items[i].row, items[i].column + 1)) {
						_currentStep[index + 1].push(_items[items[i].row][items[i].column + 1]);
					}					
					if (_checkItemRight(items[i].row, items[i].column - 1)) {
						_currentStep[index + 1].push(_items[items[i].row][items[i].column - 1]);
					}
					items[i].weight = _counter;
				} 
			};
			_counter += 1;
			_check(_currentStep[_counter])
		},
		_checkItemUp = function(i, j) {
			if (i > -1 && i < _constants.ROWS && !_items[i][j].dom.classList.contains('barrier')) {
				return true;
			}
			return false;
		},
		_checkItemDown = function(i, j) {
			if (i > -1 && i < _constants.ROWS && !_items[i][j].dom.classList.contains('barrier')) {
				return true;
			}
			return false;
		},
		_checkItemLeft = function(i, j) {
			if (j > -1 && j < _constants.COLUMNS && !_items[i][j].dom.classList.contains('barrier')) {
				return true;
			}
			return false;
		},
		_checkItemRight = function(i, j) {
			if (j > -1 && j < _constants.COLUMNS && !_items[i][j].dom.classList.contains('barrier')) {
				return true;
			}
			return false;
		},
		_finish = function() {
			var start  =_getStart(),
				finish = _getFinish();
			/*	
			for (var i = 0; i < _items.length; i += 1) {
				for (var j = 0; j < _items[i].length; j += 1) {
					if (_items[i][j].weight > 0) {
						_items[i][j].dom.innerHTML = _items[i][j].weight;						
					}
				}
			}
			*/
			start.start = true;
			finish.finish = true;
			
			_counter -= 1;
			_currentStep[_counter] = [];
			
			if (_checkItemUp(finish.row + 1, finish.column) && _items[finish.row + 1][finish.column].weight == _counter) {
				_currentStep[_counter].push(_items[finish.row + 1][finish.column]);
			}
			if (_checkItemDown(finish.row - 1, finish.column) && _items[finish.row - 1][finish.column].weight == _counter) {
				_currentStep[_counter].push(_items[finish.row - 1][finish.column]);
			}					
			if (_checkItemLeft(finish.row, finish.column + 1) && _items[finish.row][finish.column + 1].weight == _counter) {
				_currentStep[_counter].push(_items[finish.row][finish.column + 1]);
			}					
			if (_checkItemRight(finish.row, finish.column - 1) && _items[finish.row][finish.column - 1].weight == _counter) {
				_currentStep[_counter].push(_items[finish.row][finish.column - 1]);
			}
			_checkFinish(_currentStep[_counter])
		},
		_checkFinish = function (items) {
			var index = _counter,
				i;
			
			_currentStep[index - 1] = [];
			
			for (i = 0; i < items.length; i++) {
				if (items[i].start) {
					_paintWay();
					return;
				} else if (items[i].weight == _counter) {
					if (_checkItemUp(items[i].row + 1, items[i].column)) {
						_currentStep[index - 1].push(_items[items[i].row + 1][items[i].column]);
					}
					if (_checkItemDown(items[i].row - 1,items[i].column)) {
						_currentStep[index - 1].push(_items[items[i].row - 1][items[i].column]);
					}					
					if (_checkItemLeft(items[i].row, items[i].column + 1)) {
						_currentStep[index - 1].push(_items[items[i].row][items[i].column + 1]);
					}					
					if (_checkItemRight(items[i].row, items[i].column - 1)) {
						_currentStep[index - 1].push(_items[items[i].row][items[i].column - 1]);
					}
					items[i].dom.classList.add('way');
				} 
			};
			_counter -= 1;
			_checkFinish(_currentStep[_counter])
		},
		_paintWay = function () {
			
		};
	
	return {
		init : _init,
		getItems: function () {
			return _items;
		}
	}
})();

window.onload = function () {
	main.init();
};

function say(attr) {
	console.log(attr);
}
