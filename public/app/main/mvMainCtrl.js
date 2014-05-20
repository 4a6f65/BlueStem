blueStemApp.controller('mvMainCtrl', function($scope, expanseManager) {
    expanseManager.loadAllExpanses()
        .then(function (expanses) {
            $scope.expanses = expanses;
        });

    $scope.generateNewExpanse = function(){
        expanseManager.getCandidateExpanse($scope.selectedExpanse);
    }

    $scope.acceptNewExpanse = function(){

    }

    $scope.selectExpanse = function ($index, expanse) {
        console.log(expanse);
        $scope.selectedIndex = $index;
        $scope.selectedExpanse = expanse;
        $scope.selectedExpanse.mapSize = $scope.selectedExpanse.height + "," +  $scope.selectedExpanse.width;
    }

    $scope.defaultExpanse = {
        "name": "Unknown",
        "status": "pending",
        "beginDate": new Date(),
        "endDate": null,
        "secondsPerRound": 3600,
        "maxRounds": 500,
        "currentRound": 0,
        "numberOfStars": 1000,
        "width": 1200,
        "height": 1200,
        "mapSize": "1200,1200",
        "depth": 25
    };
    $scope.selectedExpanse = $scope.defaultExpanse;
    $scope.selectedIndex = -1;
    $scope.expanseStatusList = [
        {'Name': 'Running', 'Value': 'running'},
        {'Name': 'Pending', 'Value': 'pending'},
        {'Name': 'Closed', 'Value': 'closed'},
        {'Name': 'Killed', 'Value': 'killed'}];

    $scope.mapSizeList = [
        {'Name': '800 x 800', 'Value': '800,800'},
        {'Name': '1200 x 1200', 'Value': '1200,1200'},
        {'Name': '1600 x 1600', 'Value': '1600,1600'},
        {'Name': '2000 x 2000', 'Value': '2000,2000'}];

    $scope.maxRoundList = [
        {'Name': '50', 'Value': 50},
        {'Name': '100', 'Value': 100},
        {'Name': '250', 'Value': 250},
        {'Name': '500', 'Value': 500},
        {'Name': '750', 'Value': 750},
        {'Name': '1000', 'Value': 1000},
        {'Name': '1500', 'Value': 1500},
        {'Name': '2000', 'Value': 2000}];

    $scope.starCountList = [
        {'Name': '100', 'Value': 100},
        {'Name': '250', 'Value': 250},
        {'Name': '500', 'Value': 500},
        {'Name': '750', 'Value': 750},
        {'Name': '1000', 'Value': 1000},
        {'Name': '1500', 'Value': 1500},
        {'Name': '2000', 'Value': 2000}];

});