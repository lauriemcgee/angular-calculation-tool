const angular = require('angular');
var myApp = angular.module('myApp', []);

myApp.controller('calculatorController', function($scope) {
  var vm = $scope;
  vm.lumen_options = [375, 600, 900, 1125, 1600];
  vm.current_lumens = 600;
  vm.current_cost = 12;
  vm.current_hours = 3;
  vm.total_days = 365;

  var conversions = {
    inc: .0625,
    hal: .0450,
    cfl: .0146,
    led: .0125,
  }

  vm.inc_conversion = .0625;
  vm.hal_conversion = .0450;
  vm.cfl_conversion = .0146;
  vm.led_conversion = .0125;

  function convertLumensToWattage(lumens) {
    return function(conversion) {
      return (lumens * conversion).toFixed(1);
    }
  }

  function calculateCost(hours, currentCost) {
    var totalDays = 365;
    var totalHours = totalDays * hours;
    var cost = currentCost / 100;

    return function(wattage) {
      return (wattage * totalHours / 1000 * cost).toFixed(2);
    }
  }

  function calculateWattages(lumens) {
    var calculateWattage = convertLumensToWattage(lumens);
    var wattages = {};
    
    for (var key in conversions) {
      var conversion = conversions[key];
      wattages[key + "_wattage"] = calculateWattage(conversion);
    }

    return wattages;
  }

  vm.calculate = function() {
    var wattages = calculateWattages(vm.current_lumens);
    
    Object.assign(vm, wattages);

    if (vm.current_hours > 24) {
      vm.current_hours = 24;
    }

    var calculateWattageCost = calculateCost(vm.current_hours, vm.current_cost);

    vm.inc_cost = calculateWattageCost(vm.inc_wattage);
    vm.hal_cost = calculateWattageCost(vm.hal_wattage);
    vm.cfl_cost = calculateWattageCost(vm.cfl_wattage);
    vm.led_cost = calculateWattageCost(vm.led_wattage);
  };

  vm.calculate();

});