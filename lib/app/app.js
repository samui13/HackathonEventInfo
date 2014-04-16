angular.
    module('calendarApp',[
	'ngRoute',
	'calendarCtrls'
    ]).
    config(['$locationProvider','$routeProvider',
	    function($locationProvider,$routeProvider){
		//$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
		
		
		$routeProvider.
		    when('/',{
			templateUrl:'partials/index.html',
			controller:'indexCtrl',
			title:"Index",
		    }).
		    when('/calendar/',{
			templateUrl:'partials/calendar.html',
			controller:'CalendarCtrl'
		    }).
		    when('/calendar/:region',{
			templateUrl:'partials/calendar.html',
			controller:'CalendarCtrl'
		    }).
		    when('/article/',{
			templateUrl:'partials/article.html',
			controller:'ArticleCtrl'
		    }).
		    when('/article/:id',{
			templateUrl:'partials/article.html',
			controller:'ArticleCtrl'
		    }).
		    when('/event/more',{
			templateUrl:'partials/eventlist.html',
			controller:'EventListCtrl',
			title:"Event List",
		    }).
		    when('/event/:id',{
			templateUrl:'partials/event.html',
			controller:'EventCtrl',
			title:"Event",
		    }).
		    otherwise({
			retidectTo:'/'
		    });
	    }]).
    run(['$location', '$rootScope', function($location, $rootScope) {
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
	    $rootScope.title = '';
            $rootScope.title = current.$$route.title;
	});
    }]);
