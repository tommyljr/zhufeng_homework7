let app = angular.module("app", []);

app.controller("first", function ($scope, $http) {
    $scope.changeUser = null;
    $http({method: 'GET', url: "/user"})
        .success((data)=> {
            $scope.users = data;
        });

    $scope.change = (user)=> {
        $scope.changeUser = user;
    };

    $scope.save = (changeUser)=> {
        $http({method: "PUT", url: "/user", data: changeUser})
            .success(function (data) {
                if (data && data.success == "done") {
                    $scope.changeUser = null;
                }
            });
    }

});