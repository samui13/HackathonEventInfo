angular.
    module('calendarCtrls', ['ui.calendar', 'ui.bootstrap','modalservice','hackathonService'
]).
    controller('ArticleCtrl',
	       ['$scope','$routeParams',
		function($scope,$routeParams){

		    if('id' in $routeParams)
			$scope.id = $routeParams['id'];
		    if('p' in $routeParams)
			$scope.id = $routeParams['p'];
		    $scope.url = './wordpress/?p='+$scope.id;
		}]).
    controller('EventListCtrl',function($scope,$http){
	$scope.url = "https://www.google.com/calendar/feeds/cqg671evaqmgmd8ctuih1nme2k%40group.calendar.google.com/private-6c05f1f7fd3dd4ede9802a3a524bf1a5/basic?alt=json&max-results=25";
	$scope.getID = function(url){
	    var id = url.split("/").pop();
	    return id;
	};
	$http.get($scope.url).success(function(data){
	    $scope.entrys = data.feed.entry;
	});
    }).
    controller('EventCtrl',
	       ['$scope','$routeParams','$http','$sce','$rootScope',
		function($scope,$routeParams,$http,$sce,$rootScope){
		    $scope.id = $routeParams['id'];
		    var id = $scope.id;
		    $scope.url = "http://www.google.com/calendar/feeds/cqg671evaqmgmd8ctuih1nme2k%40group.calendar.google.com/private-6c05f1f7fd3dd4ede9802a3a524bf1a5/basic/"+id+"?alt=json";
		    $http.get($scope.url).success(function(data){
			$scope.entry = data.entry;
			$rootScope.title = $scope.entry.title.$t;
			$scope.entry.content.markUP = $sce.trustAsHtml($scope.entry.content.$t);
			var hrefRe = /<a (.*)>(.*)<\/a>/;
			var hrefElem = hrefRe.exec($scope.entry.content.$t)[1];
			var link = hrefElem.split(" ");
			var hrefObj = {};
			var re = /(.*)=\"(.*)\"/;
			for(var key in link){
			    var obj = /(.*)=\"(.*)\"/i.exec(link[key]);
			    hrefObj[obj[1]] = obj[2];
			}
			//console.log(hrefObj);
			$scope.entry.URL = hrefObj.title
			
		    });
    }]).
    controller('indexCtrl',
	       ['$scope','$http','regionService',
	       function($scope,$http,region){
		   $scope.regions = region.order;
		   $scope.url = "https://www.google.com/calendar/feeds/cqg671evaqmgmd8ctuih1nme2k%40group.calendar.google.com/private-6c05f1f7fd3dd4ede9802a3a524bf1a5/basic?alt=json&max-results=4";
		   $scope.getID = function(url){
		       var id = url.split("/").pop();
		       return id;
		   };
		   (function() {

		       $http.get($scope.url).success(function(data) {
			   $scope.newEntry = data.feed.entry;
			   
		       });
		   })();
		   'callPhantom' in window && window.callPhantom();
		   
	       }]).
    controller('recentEvent',
	       ['$scope','$http',
	       function($scope,$http){
		   $scope.url = "https://www.google.com/calendar/feeds/cqg671evaqmgmd8ctuih1nme2k%40group.calendar.google.com/private-6c05f1f7fd3dd4ede9802a3a524bf1a5/basic?alt=json&max-results=4";
		   $http.get($scope.url).success(function(data) {
		       $scope.newEntry = data.feed.entry;
		   });		   
	       }]).
    controller('ModalInstanceCtrl',
	       ['$scope','$modalInstance','contents','$sce',
		function($scope,$modalInstance,content,$sce){
		    content._id = content._id.split('@')[0];
		    $scope.content = content;
		    $scope.description = $sce.trustAsHtml($scope.content.description);
		    
		    $scope.goEvent = function(){
			$modalInstance.close();
		    }
		    $scope.ok = function () {
			//$modalInstance.close($scope.selected.item);		    
			$modalInstance.close();
		    };

		    $scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		    };
		}])

    .controller("CalendarCtrl",
		['$scope','$routeParams','$modal','ModalService','regionService',
		 function($scope,$routeParams,$modal,modalService,region){
		     $scope.seectRegion = "";
		     if('region' in $routeParams){
			 $scope.selectRegion = $routeParams.region;
		     }
		     $scope.region = region.obj;
		     $scope.regionOrder = region.order;
		     $scope.eventClick = function( event, allDay, jsEvent, view ){
			 modalService.openModal(event);
			 $scope.$apply(function(){
			 });
		     }
		     $scope.clickRegion = function(spot,calendar){
			 $scope.selectRegion = spot;
			 calendar.fullCalendar('render');
		     }
		     $scope.uiConfig = {
			 calendar:{
			     timeFormat: "H:mm",
			     height: 450,
			     editable: false,
			     header:{
				 left: 'title',
				 center: '',
				 //right: 'today prev,next'
				 right: 'prev,next'
			     },
			     eventClick:$scope.eventClick,
			     eventDrop: $scope.alertOnDrop,
			     eventResize: $scope.alertOnResize,
			     dayNames : ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
			     dayNamesShort : ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"],
			     eventRender:function(event,element){
				 var lists = $scope.region;
				 var myRe = /[\["【"](.*)[\]"】"](.*)/g;
				 var location = myRe.exec(event.title);
				 if(!location)
				     return;
				 var spot = location[1];
				 var region,color,font_color;

				 var matchingShort = function(array,aim){
				     for(var key in array){
					 if(aim == array[key].slice(0,-1))
					     return true;
				     }
				     return false;
				 };
				 if(!(spot in lists)){
				     for(var key in lists){
					 if(lists[key].region.indexOf(spot)>0 || 
					    matchingShort(lists[key].region,spot)){
					     color = lists[key].color;  
					     font_color = lists[key].font_color;
					     region = key;
					     break;
					 }
				     }
				 }else{
				     color = lists[spot].color;
				     font_color = lists[spot].font_color;
				     region = spot;
				 }
				 
				 event.color = color;
				 element.css('background-color',color);
				 element.css('border-color',color);
				 element.css('color',font_color)
				 if(!(typeof $scope.selectRegion == 'undefined') && $scope.selectRegion != region){
				     element.css('display','none');
				 }
			     }
			 }
		     };
		     var date = new Date();

		     var d = date.getDate();
		     var m = date.getMonth();
		     var y = date.getFullYear();
		     $scope.eventSource = {
			 url:"https://www.google.com/calendar/feeds/cqg671evaqmgmd8ctuih1nme2k%40group.calendar.google.com/private-6c05f1f7fd3dd4ede9802a3a524bf1a5/basic",
			 //url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
		     };
		     
		     $scope.eventSources = [
			 /*
			 [
			 {title: 'All Day Event',start: new Date(y, m, 1)},
			 {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
			 {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
			 {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
			 {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
		     ],*/
			 $scope.eventSource];
		     angular.element(document).ready(function() {
			 
		     });
		 }]);
