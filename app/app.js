
var app = angular.module('visualizationApp', []);

app.directive('donutChart', function () {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function (scope, iElement, iAttrs) {
			var parentElement = d3.select(iElement.parent()[0]),
				parentWidth = 500; //+(parentElement.style('width').replace('px', '')),
				parentHeight = 500; //+(parentElement.style('height').replace('px', ''));
				
			var	margin = {top: 10, left: 10, bottom: 10, right: 10},
				svg = parentElement.append('svg').attr({
					width: parentWidth - (margin.left + margin.right),
					height: parentHeight - (margin.top + margin.bottom)
				}),
				color = d3.scale.category10()
				pie = d3.layout.pie().sort(null)
				arc = d3.svg.arc().outerRadius(150).innerRadius(100),
				g = svg.append('g').attr('transform', 'translate(' + (parentWidth/2) + ', ' + (parentHeight/2) + ')'),
				data = scope.data;

			g.selectAll('path').data(pie(data))
				.enter()
				.append('path')
					.style('stroke', 'white')
					.attr('d', arc)
					.attr('fill', function (d, i) { return color(i); })
		}
	};
});

app.controller('VizController', ['$scope', function ($scope) {
	$scope.ourRangeValue = 50;
}]);

app.controller('ProgressController', ['$scope', function ($scope) {
	$scope.progress = 50;
}]);

app.directive('progressBar', function () {
	return {
		restrict: 'E',
		link: function (scope, iElement, iAttrs) {
			var parentElement = d3.select(iElement.parent()[0]),
				parentWidth = 500; //+(parentElement.style('width').replace('px', '')),
				parentHeight = 20; //+(parentElement.style('height').replace('px', ''));
				
			var	margin = {top: 0, left: 0, bottom: 0, right: 0},
				svg = parentElement.append('svg').attr({
					width: parentWidth - (margin.left + margin.right),
					height: parentHeight - (margin.top + margin.bottom)
				}).style('stroke', 'black'),
				data = scope.progress;

			svg.append('rect')
				.attr('x', 0)
				.attr('y', 0)
				.attr('width', data)
				.attr('height', 20)
				.attr('fill', 'blue');

			/*scope.$watch('progress', function (newVal) {
				svg.select('rect').transition().duration(100).attr('width', newVal);
			})*/
		}
	};
});

