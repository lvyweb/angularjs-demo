;
(function (angular) {
  angular.module('itcast.douban.movie_list')
    .filter('getNames', [function () {
      return function (directors, split) {
        if (!directors || Object.prototype.toString.call(directors) !== '[object Array]') {
          console.warn('directors 必须有值而且必须是一个数组')
          return
        }
        var str = ''
        directors.forEach(function (director, index) {
          str += director.name + (index === directors.length - 1 ? '' : split)
        })
        return str
      }
    }])
})(angular)
