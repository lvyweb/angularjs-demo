;
(function (angular) {
  angular.module('itcast.douban.movie_detail', ['itcast.douban.common'])
    .controller('MovieDetailController', [
      '$scope',
      'HttpService',
      '$routeParams',
      function ($scope, HttpService, $routeParams) {
        $scope.movie = {}
        HttpService.jsonp('https://api.douban.com/v2/movie/subject/' + $routeParams.sub_id, {}, function (data) {
          $scope.movie = data
          // 在异步回调函数中如果修改了 $scope 一定要通过 $scope.$apply() 强制刷新 $scope
          $scope.$apply()
        })
      }
    ])
})(angular)
