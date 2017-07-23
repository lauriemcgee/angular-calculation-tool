const angular = require('angular');
var myApp = angular.module('myApp', []);

myApp.controller('calculatorController', function($scope) {
  var vm = $scope;
  vm.lumen_options = [375, 600, 900, 1125, 1600];
  vm.current_lumens = 600;
  vm.current_cost = 12;
  vm.current_hours = 3;
  vm.total_days = 365;


  vm.inc_conversion = .0625;
  vm.hal_conversion = .0450;
  vm.cfl_conversion = .0146;
  vm.led_conversion = .0125;

  vm.calculate = function() {
    
    
  };

  vm.calculate();

});