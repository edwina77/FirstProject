'use strict';

/* Controllers */

angular.module('kioskApp.controllers', [])
        .controller('GetData', ['$scope', function($scope) {

            }])
        .controller('MyCtrl2', ['$scope', function($scope) {

            }]);

angular.module('kioskApp.controllers', [])
        .controller('MapCtrl', function($scope, $window) {
            $scope.map = {
                options: {styles: [{"featureType":
                                    "administrative", "elementType": "labels.text.fill", "stylers": [
                                        {"weight": 0.2}, {"color": "#1d352b"}]}, {"featureType":
                                    "landscape", "elementType": "geometry", "stylers": [{"color":
                                                    "#dfddde"}]}, {"featureType": "landscape", "elementType":
                                    "labels.text", "stylers": [{"weight": 0.2}, {"color":
                                                    "#17191b"}]}, {"featureType": "landscape", "elementType":
                                    "labels", "stylers": [{"weight": 0.1}, {"color": "#535258"}]
                        }, {"featureType": "poi", "elementType": "geometry.fill",
                            "stylers": [{"color": "#90a98d"}, {"weight": 0.1}]}, {
                            "featureType": "poi", "elementType": "labels.text.fill",
                            "stylers": [{"weight": 0.1}, {"color": "#5a6060"}]}, {
                            "featureType": "road.highway", "elementType": "geometry",
                            "stylers": [{"color": "#83dea9"}]}, {"featureType":
                                    "road.arterial", "elementType": "geometry.fill", "stylers": [{
                                            "color": "#d3ffba"}]}, {"featureType": "road.local",
                            "elementType": "geometry.fill", "stylers": [{"color": "#d3ffc5"
                                }]}, {"featureType": "transit.line", "elementType":
                                    "geometry.fill", "stylers": [{"color": "#80b580"}]}, {
                            "featureType": "transit.station", "elementType":
                                    "labels.text.fill", "stylers": [{"weight": 0.2}, {"color":
                                                    "#ffffff"}]}, {"featureType": "water", "elementType":
                                    "geometry.fill", "stylers": [{"color": "#2e606a"}]}, {}, {}, {
                            "featureType": "water", "elementType": "labels.text.fill",
                            "stylers": [{"color": "#aed7e4"}]}, {"featureType": "water",
                            "elementType": "labels.text", "stylers": [{"color": "#ffffff"},
                                {"weight": 0.1}]}, {}
                    ]},
                events: {
                    tilesloaded: function(map) {
                        $scope.$apply(function() {
                            $scope.mapInstance = map;
                        });
                    }
                },
                center: {
                    latitude: 45,
                    longitude: -73
                },
                zoom: 8
            };
            $scope.homemarker = {latitude: 40.6743890, longitude: -73.9455};

            $scope.$watch('details', function() {

                console.log('it updateds');
                console.log($scope.details);
                var lat = $scope.details.geometry.location.lat();
                var lng = $scope.details.geometry.location.lng();


                $scope.homemarker = {latitude: lat, longitude: lng};
                $scope.map.center = {latitude: lat, longitude: lng};




            });

            $window.navigator.geolocation.getCurrentPosition(function(pos) {

                console.log(pos);
                var lat = pos.coords.latitude;
                var lng = pos.coords.longitude;

                console.log(pos);

                $scope.$apply(function() {
                    $scope.homemarker = {latitude: lat, longitude: lng};
                    $scope.map.center = {latitude: lat, longitude: lng};




                });
            });
        });


