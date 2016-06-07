var api = angular.module('TabsApp', [ 'ngResource' ]);

api.factory('Api', [ '$resource', '$q', function($resource, $q) {

	function apiError(data) {
		var msg = 'Error accessing: ' + data.config.url + '\nServer said: ' + data.status + ' ' + data.statusText;
		$q.reject(data);
		console.log(msg, data);
		alert('הפעולה נכשלה' + '' + msg);
	}

	return {

	  AdminService : {

	    affiliates : $resource('rest/admin/getAffiliates', {}, {
		    post : {
		      method : 'POST',
		      interceptor : {
			      responseError : function(data) {
				      apiError(data);
			      }
		      },
		      isArray : true
		    },
	    }),
	  },


	}

} ]);
