$(function () {
    var mod = angular.module('dmApp', ['datasourceLog', 'ui.bootstrap'])
    .controller('statusControl', ['$scope', '$rootScope', 'dataRequest', '$filter', 'filterFilter',
    function ($scope, $rootScope, dataRequest, $filter, filterFilter) {

        //get Datasource Report data 
        dataRequest.promise().then(function (response) {
            var dataItems;
            $scope.pageSizes = [10, 20, 30, 40, 50, 100];
            $scope.itemsPerPage = 20;
            $scope.maxSize = 10;
            $scope.currentPage = 1;
            $scope.filteredItem = [];
            $scope.pagedItems = [];
            $scope.Items = response;
            $scope.totalItems = response.length;
            $scope.numPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
            //pagination
            var listner = function () {
                var begin = ($scope.currentPage - 1) * $scope.itemsPerPage,
                     end = begin + $scope.itemsPerPage;
                dataItems = response.slice(begin, end);
                $scope.Columns = dataItems;
                $scope.DateList = dataItems;
                $('.loading, .overlayBg').fadeOut('fast');
            }
            //reset Filter;;
            $scope.resetResponse = function () {
                $scope.$watch('currentPage + itemsPerPage', listner);
                $scope.searchReasult = false;
                $scope.Columns = dataItems;
                $scope.DateList = dataItems;
                $('.loading, .overlayBg').fadeOut('fast');
            }

            //onchage Grid Load If Blank Screen
            $scope.onBlankSearch = function () {
                if ($scope.search == "") {
                    $scope.searchQuery = '';
                    $scope.$watch('currentPage + itemsPerPage', listner);
                }
            }
            $scope.SearchChange = function () {
                $scope.searchQuery = angular.copy($scope.search);
                if ($scope.searchQuery == '' || $scope.searchQuery == undefined) {
                    $('.searchInput').focus()
                    return false;
                }
                $('.loading, .overlayBg').fadeIn();
                $scope.Columns = $scope.DateList = $filter('filter')(response, $scope.searchQuery);
                $scope.$watch('search + itemsPerPage', function (newVal, oldVal) {
                    $scope.filtered = filterFilter(response, newVal);
                    $scope.totalItems = $scope.filtered.length;
                    $scope.numPages = Math.ceil($scope.totalItems / $scope.numPerPage);
                    $scope.currentPage = 1
                    $('.loading, .overlayBg').fadeOut('fast');
                }, true);

            }
            $scope.$watch('currentPage + itemsPerPage', listner);
            $scope.ChangeFeed = function (item) {
                $scope.search = '';
                $('.loading, .overlayBg').fadeIn();
                if (item !== null) {
                    $('.loading, .overlayBg').fadeOut('fast');
                    var filterItem = $filter('filter')(response, { DataFeedID: item.id }, true);
                    $scope.$watch('showItem + itemsPerPage', function (newVal, oldVal) {
                        $scope.filtered = filterFilter(response, newVal);
                        $scope.totalItems = $scope.filtered.length;
                        $scope.numPages = Math.ceil(filterItem.length / $scope.itemsPerPage);
                        // $scope.currentPage = 1
                        $scope.Columns = filterItem;
                        $scope.DateList = filterItem;

                    }, true);
                } else {
                    $scope.resetResponse()
                }
            }
            //get first and Last Date from Json
            var firstDate = response[0].ReportDate;
            var lastDate = response[response.length - 1].ReportDate;
            $("#startDatePicker").datepicker({
                changeMonth: true,
                changeYear: true,
                minDate: firstDate, maxDate: lastDate,
                onClose: function (selectedDate) {                    
                    $("#endDatePicker").datepicker("option", "minDate", selectedDate);                   
                }
            });
            $("#endDatePicker").datepicker({
                changeMonth: true,
                changeYear: true,
                minDate: firstDate, maxDate: lastDate,
                onClose: function (endDate) {
                    datesArray = [];
                    if ($("#startDatePicker").val() == '') return false;
                    //filter Between date                   
                    var start = $("#startDatePicker").val(),
                          end = endDate;
                }
            });
        }, function (error) {
            $('.loading, .overlayBg').fadeOut('fast');
            console.log(error.statusText);
        });
        //List all feed Version Name 
        dataRequest.feedPromise().then(function (response) {
            $scope.feedItems = response;
        });

    }]).filter('unique', function () {
        return function (collection, keyname) {
            var output = [], keys = [];
            angular.forEach(collection, function (item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });
            return output;
        };
        //date Filter
    }).filter("dateFilter", function ($filter) {
        return function (input) {
            return $filter('date')(new Date(input));
        }
    })
    //init angular in page
    angular.bootstrap(document, ['dmApp']);
});

function isDate(dateArg) {
    var t = (dateArg instanceof Date) ? dateArg : (new Date(dateArg));
    return !isNaN(t.valueOf());
}

function isValidRange(minDate, maxDate) {
    return (new Date(minDate) <= new Date(maxDate));
}

function betweenDate(startDt, endDt) {
    var error = ((isDate(endDt)) && (isDate(startDt)) && isValidRange(startDt, endDt)) ? false : true;
    var between = [];
    if (error) console.log('error occured!!!... Please Enter Valid Dates');
    else {
        var currentDate = new Date(startDt),
            end = new Date(endDt);
        while (currentDate <= end) {
            between.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    return between;
}
// This function doing this work.
function getDates(start, end) {
    var datesArray = [];
    var startDate = new Date(start);
    while (startDate <= end) {
        datesArray.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
    }
    return datesArray;
}

