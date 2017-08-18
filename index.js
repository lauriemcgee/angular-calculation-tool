const angular = require('angular');
var myApp = angular.module('myApp', []);

myApp.controller('calculatorController', function($scope) {
  var vm = $scope;
  vm.lumen_options = [375, 600, 900, 1125, 1600];
  vm.current_lumens = 600;
  vm.current_cost = 12;
  vm.current_hours = 3;
  vm.total_days = 365;

  vm.bulbStats = {
    inc: {
      name: "Incandescent",
      conversion: .0625,
    },
    hal: {
      name: "Halogen",
      conversion: .0450,
    },
    cfl: {
      name: "CFL",
      conversion: .0146,
    },
    led: {
      name: "LED",
      conversion: .0125,
    }
  }

  function convertLumensToWattage(lumens) {
    return function(conversion) {
      return lumens * conversion;
    }
  }

  function calculateCost(hours, currentCost) {
    var totalDays = 365;
    var totalHours = totalDays * hours;
    var cost = currentCost / 100;

    return function(wattage) {
      return (wattage * totalHours / 1000 * cost);
    }
  }

  function calcBulbStat(conversion, calcWattage, calcCostFromWattage) {
    var wattage = calcWattage(conversion);
    var cost = calcCostFromWattage(wattage);

    return {
      wattage: wattage.toFixed(1),
      cost: cost.toFixed(2)
    }
  }

  function calcBulbStats(bulbStats) {
    return function (lumens, hours, cost) {
      for (var key in bulbStats) {
        var calcWattage = convertLumensToWattage(lumens);
        var calcCostFromWattage = calculateCost(hours, cost);
  
        var result = calcBulbStat(bulbStats[key].conversion, calcWattage, calcCostFromWattage);

        bulbStats[key].wattage = result.wattage;
        bulbStats[key].cost = result.cost;
      }
    }
  }

  var updateBulbStats = calcBulbStats(vm.bulbStats);

  vm.calculate = function() {
    if (vm.current_hours > 24) {
      vm.current_hours = 24;
    }
    
    updateBulbStats(vm.current_lumens, vm.current_hours, vm.current_cost);    
  };

  vm.calculate();

});