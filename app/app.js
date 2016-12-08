;
(function (angular) {
  var doubanApp = angular.module('itcast.douban', [
    'itcast.douban.movie_list',
    'itcast.douban.movie_detail',
    'ngRoute'
  ])
  doubanApp.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
      // 注意：这个路由放上面，否则会被下面的路由匹配到
      // /subject/1
      // /subject/2
      // /subject/3
      // /subject/*
      // 在 MovieDetailController 中要根据这个参数去渲染对应的 View
        .when('/subject/:sub_id', {
          templateUrl: 'movie_detail/view.html',
          controller: 'MovieDetailController'
        })
        // /in_theaters/:page?
        // /in_theaters
        // /in_theaters/1
        // /in_theaters/2
        // /in_theaters/3
        .when('/:cat/:page?', {
          templateUrl: 'movie_list/view.html',
          controller: 'MovieListController'
        })
    }])
    .controller('SearchController', ['$scope', '$route', function ($scope, $route) {
      $scope.search_text = ''
      $scope.search = function (search_text) {
        // 对于 $route.updateParams 方法来说
        // 如果是路径中已配置过的参数则直接更新
        // 如果路径中没有参数，将你添加的成员作为查询字符串放到路径的后面
        $route.updateParams({
          cat: 'search',
          q: search_text,
          page: 1
        })
      }
    }])
    .controller('SidebarController', ['$scope', '$location', function ($scope, $location) {
      // $location 是一个 ng 提供的服务
      // 可以通过 $location.url() 方法拿到当前请求路径中的 url（在单页应用中 # 后面的字符串被称之为 url）
      // $scope.$watch 只能监视 $scope 上的视图模型成员
      // 也可以监视方法的返回值
      // 只要 url 发生变化，就会执行对应的回调处理函数
      // 在回调处理函数中，就通过原来的 DOM 操作思想去设置了 侧边栏导航的焦点状态
      $scope.$location = $location
      $scope.$watch('$location.url()', function (newVal, oldVal) {
        angular.element('.nav-sidebar').find('a').each(function (index, a) {
          if (a.hash.substr(1) === newVal) {
            angular.element(a)
              .closest('li').addClass('active')
              .siblings().removeClass('active')
          }
        })
      })
    }])
})(angular)
