/**
 * Created by hxsd on 2017/1/17.
 */

var myapp=angular.module('myapp',[])
    .config(function ($routeProvider) {
        $routeProvider.when('/',{templateUrl:"pages/productList.html",controller:""})
    })
    .controller('myControl', function ($scope,$http) {

    });

