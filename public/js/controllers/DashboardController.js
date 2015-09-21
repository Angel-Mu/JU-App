'use strict';

MetronicApp.controller('DashboardController', function($rootScope, $scope, $http, $timeout, CommonService) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        Metronic.initAjax();
    });

    function init(){
    	CommonService.getUsers(function(err, data){
    		if(err){
    			console.log(err);
    			alert(err.msg);
    		}else{
    			console.log(data);
    			alert("Se cargaron los usuarios");
    		}
    	})
    }

    init();
});