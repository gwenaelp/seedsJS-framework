define([], function() {
	console.log("initializeConsole");
	//TODO annotations

	if(oldConsole === undefined)
		var oldConsole = console;

	initializeConsole= function(logAuthor)
	{
		if(oldConsole.registeredAuthors === undefined)
			oldConsole.registeredAuthors = [];

		oldConsole.registeredAuthors.push(logAuthor);

		var newConsole = {
			old: oldConsole,

			log: function(message) {
				if(oldConsole._filterAuthors === undefined || oldConsole._filterAuthors.contains(logAuthor)) {
					// var err = new Error();
					// oldConsole.log(err);
					oldConsole.log("%c  %c[" + logAuthor + "]%c " + message, 'width:16px; height:16px; background: url(http://goossens-chocolatier.com/wp-content/themes/goossens/images/info_icon.png) no-repeat;','background: #222; color: #bada55', 'background: white; color: black');
				}
			},
			filterAuthors: function(authors) {
				oldConsole._filterAuthors = authors;
			},

			listAuthors: function() {
				return oldConsole.registeredAuthors;
			}
			//TODO grep
			//TODO persistance
			//TODO console debug mode with log id number displayed and stack trace included
		}

		return newConsole;
	}

	if(proxiedDefine == undefined) {
		var proxiedDefine = define; // Preserving original function
		define = function() {
			if(arguments.length === 2)
			{
				//add module to args
				arguments[0].unshift("module");

				var proxiedCallback = arguments[1];

				arguments[1] = function() {
					console = initializeConsole(arguments[0].id);

					var args;
					if(typeof arguments == "object") {
						//transform object into array
						args = [];
						for (key in arguments) {
							args.push(arguments[key]);
						};
						args.shift();
					}

					return proxiedCallback.apply(this, args);
				};
			}
			return proxiedDefine.apply(this, arguments);
		}
	}

	// console.grep = function()
});