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

  function convertLumensToWattage(lumens) {
    return function(conversion) {
      return (lumens * conversion).toFixed(1);
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

  function calculateCost(hours, currentCost) {
    var totalDays = 365;
    var totalHours = totalDays * hours;
    var cost = currentCost / 100;

    return function(wattage) {
      return (wattage * totalHours / 1000 * cost).toFixed(2);
    }
  }

  function calculateWattageCosts(wattages, hours, cost) {
    var calculateWattageCost = calculateCost(hours, cost);
    var costs = {};

    for (var key in wattages) {
      var wattage = wattages[key];
      key = key.slice(0, key.indexOf("_"));
      costs[key + "_cost"] = calculateWattageCost(wattage);
    }

    return costs;
  }

  vm.calculate = function() {
    if (vm.current_hours > 24) {
      vm.current_hours = 24;
    }

    var wattages = calculateWattages(vm.current_lumens);
    var costs = calculateWattageCosts(wattages ,vm.current_hours, vm.current_cost);
    
    Object.assign(vm, wattages);
    Object.assign(vm, costs);
  };

  vm.calculate();

});