angular.module('modalservice',[]).
    service('ModalService',
	    ['$modal','$sce',
	     function($modal,$sce) {
		 var openModal = function(event) {
		     //event.description = $sce.trustAsHtml(event.description);
		     //console.log(event.description);
		     var modalInstance  = $modal.open({
			 templateUrl : 'myModalContent.html',
			 controller : 'ModalInstanceCtrl',
			 backdrop : true,
			 resolve : {
			     contents : function () {
				 return event;
			     }
			 }
		     })
		     modalInstance.result.then(
			 function (result) {
			     //console.log('called $modalInstance.close()');
			 },
			 function (result) {
			     //console.log('called $modalInstance.dismiss()');
			 }
		     );
		     return modalInstance;
		 };
		 
		 return {
		     openModal : openModal
		 };
	     }]);

angular.module('hackathonService',[]).
    service('regionService',
	    [
	     function(){
		 var lists = {
		     "北海道":{
			 id:'1',
			 region:["北海道"],
			 color:"#a8ffd3",
			 font_color:'#000',
		     },
		     "東北":{
			 id:'2',
			 region:["青森県","岩手県","秋田県","宮城県","山形県","福島県"],
			 color:"#ffffa8",
			 font_color:'#000'
		     },
		     "関東":{
			 id:'3',
			 region:["茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県"],
			 color:"#a8a8ff",
			 font_color:'#000'
		     },
		     "中部":{
			 id:'4',
			 region:["新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県"],
			 color:"#a8ffa8",
			 font_color:'#000'
		     },
		     "関西":{
			 id:'5',
			 region:["三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県"],
			 color:"#ffa8a8",
			 font_color:'#000'
		     },
		     "中国":{
			 id:'6',
			 region:["鳥取県","島根県","岡山県","広島県","山口県"],
			 color:"#ffa8ff",
			 font_color:'#000'
		     },
		     "四国":{
			 id:'7',
			 region:["徳島県","香川県","愛媛県","高知県"],
			 color:"#ffd3a8",
			 font_color:'#000'
		     },
		     "九州":{
			 id:'8',
			 region:["福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"],
			 color:"#a8ffff",
			 font_color:'#000'
		     }

		 };
		 var all = {"全国":{
		     id:'9',
		     color:"#a8d3ff",
		     font_color:'#000'
		 }};
		 return {
		     obj:lists,
		     all:all,
		     order:[
			 '北海道',
			 '東北',
			 '関東',
			 '中部',
			 '関西',
			 '中国',
			 '四国',
			 '九州'
		     ],
		 };
	     }]);
