;
(function (angular) {
  angular.module('itcast.douban.movie_list', ['itcast.douban.common'])
    .controller('MovieListController', [
      '$scope',
      '$http',
      'HttpService',
      '$routeParams',
      '$route',
      function ($scope, $http, HttpService, $routeParams, $route) {
        var pageSize = 3
        $scope.title = 'Loading...'
        $scope.data = []
        $scope.totalCount = 0
        $scope.totalPage = 0
        $scope.page = parseInt($routeParams.page || 1)

        // Angular 的 $http.jsonp 方法
        // 只需要在请求路径中通过查询字符串指定一个 JSON_CALLBACK 这里是一个标记
        // ng 在真正发请求的时候，会把这个标记替换为 callback=xxx 格式的字符串然后放到查询字符串中
        // ng 自动生成一个函数名：angular.callbacks._0
        HttpService.jsonp('https://api.douban.com/v2/movie/' + $routeParams.cat, {
          start: ($scope.page - 1) * pageSize,
          count: pageSize,
          // q 就是从 SearchController 中更新过来的路由查询字符串 q
          // 如果是对于 /in_theaters?q=xxx 这样的接口来说后台顶多忽略
          // 但是对 /search?q=xxx 来说，后台会拿这个 q 去查询数据
          q: $routeParams.q
        }, function (data) {
          $scope.totalCount = data.total
          $scope.totalPage = Math.ceil(($scope.totalCount / pageSize))
          $scope.title = data.title
          $scope.subjects = data.subjects
            // 如果在异步代码中修改了视图模型对象，必须通过 $scope.$apply() 方法强制视图模型更新
          $scope.$apply()
        });

        // 翻页按钮
        $scope.go = function (page) {
          if (page <= 0 || page >= ($scope.totalPage + 1)) {
            return
          }
          // 调用 $route.updateParams 方法更新路径中的路由参数 page
          // page 在哪儿，在主模块中配置的请求路径中的 page
          $route.updateParams({
            page: page
          })
        }
      }
    ])

})(angular)
