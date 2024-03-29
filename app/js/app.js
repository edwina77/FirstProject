'use strict';

//Directory121
// Declare app level module which depends on filters, and services
var kioskApp = angular.module('kioskApp', [
    //'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'kioskApp.controllers',
    'google-maps',
    'ngAutocomplete'
]);

kioskApp.controller('SwitchEm', function($scope, $http) {
    $scope.currentURL = "touchDirectory";
    $scope.groupedDataComp = {};
    $scope.groupedDataIndiv = {};
    $http.get('js/data.json').success(function(data) {
        $scope.individuals = data.individuals;
        $scope.companies = data.companies;
    });
    //$scope.currentURL= "buildingDirectory";
    $scope.urls = {"touchDirectory": "partials/touchdirectory.html",
        "buildingDirectory": "partials/buildingdirectory.html",
        "neighborhoodGuide": "partials/neighborhoodguide.html"};
    $scope.changeView = function(name) {
        $scope.currentURL = name;
    };
    $scope.chars = [{ch: "ALL"}, {ch: "A"}, {ch: "B"}, {ch: "C"}, {ch: "D"}, {ch: "E"},
        {ch: "F"}, {ch: "G"}, {ch: "H"}, {ch: "I"}, {ch: "J"},
        {ch: "K"}, {ch: "L"}, {ch: "M"}, {ch: "N"}, {ch: "O"},
        {ch: "P"}, {ch: "Q"}, {ch: "R"}, {ch: "S"}, {ch: "T"},
        {ch: "U"}, {ch: "V"}, {ch: "W"}, {ch: "X"}, {ch: "Y"},
        {ch: "Z"}];
    $scope.searching = {searchIt: ""}; //""; //for searching through list and ngmodel
    $scope.ordering = 'cname'; //for ordering through list
    $scope.letter = "";
    $scope.byCompName = true;////for styling green button around indi or company
    $scope.sortSet = function() { //toggle to compname or ind list
        $scope.byCompName = !$scope.byCompName;
        $scope.ordering = $scope.byCompName ? 'cname' : 'name';
    };
    $scope.setsearchChar = function(char) {
        if (char.ch == "ALL") {
            $scope.searching.searchIt = "";
            $scope.letter = "";
        }
        else {
            $scope.searching.searchIt = char.ch;
            $scope.letter = char.ch;
            console.log($scope.ordering);
        }
    };


    $scope.filterLetter = "\w*"; //"a-z";
    $scope.setFilterLetter = function(character) {
        //use tis forfiltering by first letter
        //for now just link to search field
        //$scope.filterLetter=letter;
        //console.log($scope.filterLetter);

        //$scope.letter=character;

        if ($scope.byCompName) {
            $scope.letter = {cName: character};
        }
        else {
            $scope.letter = {ind: character};
        }

        //below filters by letter for everything
        //$scope.ordering=letter;
    };


    $scope.filterByLetter = function(query) {
        if ($scope.byCompName) {
            return function(comp) {
                console.log(comp["cname"].charAt(0));
                return comp["cname"].charAt(0) == query;
            };
        }
        else {
            return function(indiv) {
                return /[^($scope.letter)]/i.test(indiv.name);
            };
            //return Name.ind.match(/($scope.filterLetter)/i); //filter by cName here
        }
    }



}).controller('MapCtrl', function($scope, $window, $log) {
            /*
            $scope.modesOfTravel = [{mode: google.maps.TravelMode.DRIVING},
                                    {mode: google.maps.TravelMode.WALKING},
                                    {mode: google.maps.TravelMode.BICYCLING},
                                    {mode: google.maps.TravelMode.TRANSIT}
                                    ];
            */                        
            // $scope.modesOfTravel[0];
            $scope.map = {
                control: {},
                options: {styles: [{"featureType":
                                    "administrative",
                            "elementType": "labels.text.fill", "stylers": [
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
                    ],
                scaleControl: true},
                
                events: {
                    tilesloaded: function(map) {
                        $scope.$apply(function() {
                            console.log("mapinstance loaded via tilesloaded");
                            $scope.mapInstance = map;
                             $log.info('this is the map instance', map);
                        });
                    }
                  
                },
                center: {
                    latitude: 40.6743890,
                    longitude: -73.9455
                },
                zoom: 12
            };
            $scope.homemarker = {latitude: 40.6743890, longitude: -73.9455};
            $scope.directionsMarker = {latitude: 40.6743890, longitude: -73.9455};
            $scope.startPlace=new google.maps.LatLng($scope.homemarker.latitude, $scope.homemarker.longitude);
            //orginal below from Alex
            /*
            $scope.$watch('details', function() {
                console.log('it updateds');
                console.log($scope.details);
                var lat = $scope.details.geometry.location.lat();
                var lng = $scope.details.geometry.location.lng();

                $scope.homemarker = {latitude: lat, longitude: lng};
                $scope.map.center = {latitude: lat, longitude: lng};
            });
            */
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        $scope.travelMode = google.maps.TravelMode.WALKING;
    
        function initialize(){
            $scope.gmap=$scope.map.control.getGMap();
            console.log("inited");
            console.log($scope.gmap);
            var homeControlDiv = document.createElement('div');
            var homeControl = new HomeControl(homeControlDiv, $scope.gmap);
            $scope.gmap.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
        }

    //var homeControlDiv = document.createElement('div');
    //var homeControl = new HomeControl(homeControlDiv, $scope.gmap);
//  homeControlDiv.index = 1;
  //$scope.gmap.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
  
       
      
        function HomeControl(controlDiv, map) {
            controlDiv.style.padding = '5px';
            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = 'yellow';
            controlUI.style.border='1px solid';
            controlUI.style.cursor = 'pointer';
            controlUI.style.textAlign = 'center';
            controlUI.title = 'Set map to Home';
            controlDiv.appendChild(controlUI);
            var controlText = document.createElement('div');
            controlText.style.fontFamily='Arial,sans-serif';
            controlText.style.fontSize='12px';
            controlText.style.paddingLeft = '4px';
            controlText.style.paddingRight = '4px';
            controlText.innerHTML = '<b>Home<b>'
            controlUI.appendChild(controlText);

            // Setup click-event listener: simply set the map to London
            google.maps.event.addDomListener(controlUI, 'click', function() {
              map.setCenter($scope.startPlace);
            });
        }
        function calcRoute(latN,lngN) {
            console.log("calculate route called");
            console.log($scope.gmap);
            var endR= new google.maps.LatLng(latN,lngN);
            var startR= new google.maps.LatLng($scope.homemarker.latitude, $scope.homemarker.longitude);
            console.log(endR);
            console.log(startR);
            var request = {
                origin: $scope.startPlace, // startR,
                destination:endR,
                travelMode: $scope.travelMode
            };
            directionsService.route(request, function(response, status) {
                 if (status == google.maps.DirectionsStatus.OK) {
                   console.log("directions ok");
                   directionsDisplay.setDirections(response);
                   directionsDisplay.setMap($scope.gmap);
                 }
            });
        }
        
    $scope.$watch('details', function() {
                //console.log($scope.details);
                if($scope.details){
                    //var gmap=$scope.map.control.getGMap();
                    var lat = $scope.details.geometry.location.lat();
                    var lng = $scope.details.geometry.location.lng();
                    console.log(lat);
                    $scope.destinationMarker = {latitude: lat, longitude: lng};
                    calcRoute(lat,lng);
                }
    });

        $window.navigator.geolocation.getCurrentPosition(function(pos) {
                var lat = pos.coords.latitude;
                var lng = pos.coords.longitude;
                //console.log(pos);
                $scope.$apply(function() {
                    $scope.homemarker = {latitude: lat, longitude: lng};
                    $scope.map.center = {latitude: lat, longitude: lng};
               });
            });
google.maps.event.addDomListener(window, 'load', initialize); 
$scope.apply();

});



