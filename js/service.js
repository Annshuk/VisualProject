/* http://json-generator.appspot.com/api/json/get/cdzkuSSQgO?indent=2 */

var datasourceLog = angular.module('datasourceLog', []).factory('dataRequest', ["$http", "$q",
    function ($http, $q) {
        var urlBase = "datasource.json",
            urlFeed = "datafeed.json",
            deferred = $q.defer();
        console.log(deferred)
        $('<div/>', { 'class': 'overlayBg window-center' }).show().appendTo('body');        
        doRequest = {
        'promise': function () {
            return $http({
                method: 'GET',
                url: urlBase,
                headers: {
                    "Accept": "application/json, text/plain, */*" + "HelloWorld"
                }// set the headers so angular passing info as form data (not request payload)          
            }).then(function (response) {
                deferred.resolve(response.data);
                return deferred.promise;
            }, function (response) { //error
                deferred.reject(response);
                return deferred.promise;
            });
        },
        'feedPromise': function () {          
            return $http({
                method: 'GET',
                url: urlFeed,
                headers: {
                    'Content-Type': 'application/json'
                }// set the headers so angular passing info as form data (not request payload)          
            }).then(function (response) {
                return response.data
            }, function (response) {
                return response.status;
            });
        }
    }
    return doRequest;

}]);
