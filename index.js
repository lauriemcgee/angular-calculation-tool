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

  function convertLumensToWattage(lumens) {
    return function(conversion) {
      return (lumens * conversion).toFixed(1);
    }
  }

  vm.calculate = function() {
    var calculateWattage = convertLumensToWattage(vm.current_lumens);

    vm.inc_wattage = calculateWattage(vm.inc_conversion);
    vm.hal_wattage = calculateWattage(vm.hal_conversion);
    vm.cfl_wattage = calculateWattage(vm.cfl_conversion);
    vm.led_wattage = calculateWattage(vm.led_conversion);

    if (vm.current_hours > 24) { vm.current_hours = 24; }

    var total_hours = vm.total_days * vm.current_hours;
    var cost = vm.current_cost / 100;

    vm.inc_cost = (((vm.inc_wattage * total_hours) / 1000) * cost).toFixed(2);
    vm.hal_cost = (((vm.hal_wattage * total_hours) / 1000) * cost).toFixed(2);
    vm.cfl_cost = (((vm.cfl_wattage * total_hours) / 1000) * cost).toFixed(2);
    vm.led_cost = (((vm.led_wattage * total_hours) / 1000) * cost).toFixed(2);

  };

  vm.calculate();

});