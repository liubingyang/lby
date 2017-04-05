//商品列表页

var myapp=angular.module('myapp',['ngRoute'])//以来注入路由模块
    .config(function ($routeProvider) {
        $routeProvider.when('/',{templateUrl:"pages/productList.html",controller:"productControl"});
        $routeProvider.when('/deailsPage',{templateUrl:"pages/deailsPage.html",controller:"phoneControl"});
        $routeProvider.when('/deailsPage/:id',{templateUrl:"pages/deailsPage.html",controller:"phoneControl"});
        $routeProvider.when('/cart',{templateUrl:"pages/carts.html",controller:"cartsControl"});
        $routeProvider.otherwise({templateUrl:'pages/routeNotFound.html',controller:'routeNotFoundControl'});

    })
    //购物车方法
    .factory('myServer',function(){
            var itms=[];
        //购物车
        var cart={
            //增加商品
            add: function (product) {
                for(var i=0;i<itms.length;i++){
                    if(product.name==itms[i].products.name){//判断如果购物车中有该商品，则数量加1
                        itms[i].number++;
                        return;
                    }
                }
                itms.push({products:product,number:1});//如果没有，在购物车中增加该商品，数量为1
            },
            //单独删除商品
            del: function (name) {
                for(var i=0;i<itms.length;i++){
                    if(name==itms[i].products.name) {
                        itms.splice(i,1);
                        break;
                    }
                }
            },
            //选择删除（全删）
            delAll: function () {
                itms.length=0;
            },
            //查询商品
            search: function () {
                return itms;
            }
        };
        return cart;

    } )
    //购物车控制器
    .controller("cartsControl", function ($scope,myServer) {
        $scope.search=myServer.search();
        $scope.del= function (name) {
            myServer.del(name);
        };
       // 删除
        $scope.del= function (name) {
            myServer.del(name)
        };
        //数量
        $scope.sum= function () {
            var num=0;
            for(var i=0;i<$scope.search.length;i++){
                num+=$scope.search[i].number
            }
            return num;
        };
        //总价
        $scope.sum2= function () {
            var num=0;
            angular.forEach($scope.search, function (itm) {
                num+=itm.products.price*itm.number
            });
            return num;
        };

    })
    //商品列表页控制器
    .controller('productControl', function ($scope,$http) {
        $http.get('/list').success(function (data) {//从服务器段获取商品信息。
            $scope.product=data;
        })
    })
    //手机页控制器
    .controller('phoneControl', function ($scope,$http,$routeParams,myServer,$document) {
        $scope.num=0;
        var id=$routeParams.id;
        $scope.search= function () {
            myServer.search()
        };
        $scope.add= function (product) {
            myServer.add(product);
            $document.find('em').removeClass('hidden');
            setTimeout(function () {
                $document.find('em').addClass('hidden');
            },400)
        };


        $http.get('/list').success(function (data) {//从服务器段获取商品信息。
            if(id=='num1'){//360手机
                $scope.product=data[0];
            }else if(id=='num2'){//荣耀手机
                $scope.product=data[1];
            }else if(id=='num3'){//oppo手机
                $scope.product=data[2];
            }else if(id=='num4'){//小米手机
                $scope.product=data[3];
            }
        })
    })

    //错误时反馈的信息
    .controller('routeNotFoundControl', function ($scope,$location) {
        $scope.message='这是routeNotFoundControl的信息';
        $scope.o=$location.path()
    });


