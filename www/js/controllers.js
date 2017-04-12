angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope) {})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function(){
    $ionicSideMenuDelegate.toggleLeft()
  }
})

.controller('PlayerCtrl', ["$sce", "$scope", "$timeout", "playlistService", function ($sce, $scope, $timeout, playlistService) {
      var controller = this;

      controller.config = { 
        playerType: undefined,
        open: false,       
        preload: "none",
        autoPlay: true,
        sources: [],
        theme: {
          url: "lib/videogular-themes-default/videogular.css"
        },
        plugins: {
            poster: "http://www.videogular.com/assets/images/videogular.png"
        },
        waitTime: 150
      };

      controller.state = null;
      controller.API = null;
      controller.currentSource = 0;

      controller.onPlayerReady = function(API) {
        console.log("Player ready: ", API);
        controller.API = API;
        enableVol();
      };

      controller.onCompleteSource = function() {
          controller.isCompleted = true;
          controller.currentSource++;
          if (controller.currentSource >= controller.sourceData.length) controller.currentSource = 0;
          controller.setSource(controller.currentSource);
      };
        
      controller.setSource = function(index) {
          controller.API.stop();
          controller.currentSource = index;
          controller.config.sources = controller.sourceData[index].sources;
          $timeout(controller.API.play.bind(controller.API), 100);
      };

      controller.checkState = function(){
        if(controller.API == null)
          return 'angular-player-play'
        else if(controller.API.currentState === 'play')
          return 'angular-player-pause'
        else
          return 'angular-player-play'
      };

      controller.playPause = function(){
        if(controller.API.currentState === 'play') {
          setTimeout(function() {
            controller.stopSource();
          }, controller.config.waitTime);
        }
        else {
          setTimeout(function() {
            controller.playSource();
          }, controller.config.waitTime);
        }
      };

      controller.stopSource = function(){
        console.log("play stopped");
        disableVol();
        setTimeout(function() {
            controller.API.pause();
          }, controller.config.waitTime);
        enableVol();        
      };

      controller.playSource = function(){
        console.log("play begun with playlist: ", JSON.stringify(playlistService.getAudioPlayList()));
        enableVol();
        setTimeout(function() {
            controller.API.play();
          }, controller.config.waitTime);
      };

      controller.nextSource = function() {
        if (controller.currentSource < controller.sourceData.length-1){
          enableVol();
          controller.API.stop();
          controller.currentSource += 1;
          controller.config.sources = controller.sourceData[controller.currentSource].sources;
          $timeout(controller.API.play.bind(controller.API), 100);
        }
      };

      controller.prevSource = function() {
        if (controller.currentSource > 0){
          enableVol();
          controller.API.stop();
          controller.currentSource -= 1;
          controller.config.sources = controller.sourceData[controller.currentSource].sources;
          $timeout(controller.API.play.bind(controller.API), 100);
        }
      };

      controller.closePlayer = function(){
        disableVol();
        controller.API.stop();
        controller.config.open = false;
        playlistService.setAudioPlayList([]);
        enableVol();        
      };

      function enableVol(){
        $timeout(controller.API.setVolume(1), 1000);
        //controller.API.setVolume(1);
      };
      
      function disableVol(){
        controller.API.setVolume(0);
      };

      $scope.$on('AUDIO_SOURCE_DATA', function() {
        console.log("broadcast of AUDIO_SOURCE_DATA caught");
        controller.config.playerType = 'audio';
        controller.currentSource = playlistService.getClicked();
        controller.sourceData = playlistService.getAudioPlayList();
        console.log("broadcast of AUDIO_SOURCE_DATA caught, sourceData, currentSource: ", controller.sourceData, controller.currentSource);
        controller.config.sources = controller.sourceData[controller.currentSource].sources;
        console.log("controller.config.sources: ", JSON.stringify(controller.config.sources));

        enableVol();
        controller.config.open = true;
      });

      $scope.$on('VIDEO_SOURCE_DATA', function(data_source) {
        controller.config.playerType = 'video';
        controller.config.sources = [
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
                ];
        
        enableVol();
        controller.config.open = true;
      });
  }])


.controller('EventsListCtrl', function($scope) {
  console.log("EventsListCtrl called");

  //variavel para os eventos
  $scope.eventos = [
    { Evento: 'Biblico',
      Descricao: 'descricao 1',
      Data: '03/17/2017',
      Provincia: 'Sofala'
      
    },
    { Evento: 'Conferencia',
      Descricao: 'descricao 2',
      Data: '03/18/2017',
      Provincia: 'Niassa'
    },
    { Evento: 'Culto dos jovens',
      Descricao: 'descricao 3',
      Data: '03/19/2017',
      Provincia: 'Cabo Delgado'
    },
    { Evento: 'Evangelismo',
      Descricao: 'descricao 4',
      Data: '03/20/2017',
      Provincia: 'Manica'
    },
    { Evento: 'Batismo',
      Descricao: 'descricao 5',
      Data: '03/21/2017',
      Provincia: 'Zambezia'
    },
    { Evento: 'Ministracao',
      Descricao: 'descricao 6',
      Data: '03/22/2017',
      Provincia: 'Gaza'
    },
    { Evento: 'Revelacao da palavra',
      Descricao: 'descricao 7',
      Data: '03/23/2017',
      Provincia: 'Inhambane'
    },
    { Evento: 'Cruzada Internacional',
      Descricao: 'descricao 8',
      Data: '03/24/2017',
      Provincia: 'Tete'
    }];

    //variavel para as provincias
    $scope.provincias = [
    { Provincia: 'Sofala'
    },
    { Provincia: 'Niassa'
    },
    { Provincia: 'Cabo Delgado'
    },
    { Provincia: 'Manica'
    },
    { Provincia: 'Zambezia'
    },
    { Provincia: 'Gaza'
    },
    { Provincia: 'Inhambane'
    },
    { Provincia: 'Tete'
    }];

    //variavel para o accordion 
    $scope.provincias = [];
    for (var i=0; i<10; i++) {
      $scope.provincias[i] = {
        provincia: i,
        eventos: []

      };
      for (var j=0; j<3; j++) {
        $scope.provincias[i].eventos.push(i + '-' + j);
      }
    }


    $scope.listProvincia = function(provincia) {
      //console.log(isProvinciaShow());
      if ($scope.isProvinciaShow(provincia)) {
        $scope.showProvincia = null;
      } else {
        $scope.showProvincia = provincia;
      }
    };
    $scope.isProvinciaShow = function(provincia) {

      return $scope.showProvincia === provincia;
    };

    console.log("isProvinciaShow Resultados: ", $scope.isProvinciaShow());
    $scope.isProvinciaHide = function(evento) {
      return $scope.hideProvincia === evento;
    };


})
.controller('CalendarListCtrl', function($scope) {
  console.log("CalendarListCtrl called");
  

  $scope.doRefresh = function() {
    
  }

  $scope.doRefresh();
})

.controller('PlayerCtrl', ["$sce", "$rootScope", "$scope", "$timeout", "playlistService", function ($sce, $rootScope, $scope, $timeout, playlistService) {
console.log("PlayerCtrl called");
var controller = this;

      controller.config = { 
        playerType: undefined,
        open: false,       
        preload: "none",
        autoPlay: true,
        sources: [],
        theme: {
          url: "lib/videogular-themes-default/videogular.css"
        },
        plugins: {
            poster: "http://www.videogular.com/assets/images/videogular.png"
        },
        waitTime: 150
      };

      controller.state = null;
      controller.API = null;
      controller.currentSource = 0;

      controller.onPlayerReady = function(API) {
        console.log("Player ready: ", API);
        controller.API = API;
        enableVol();
      };

      controller.onCompleteSource = function() {
          controller.isCompleted = true;
          controller.currentSource++;
          if (controller.currentSource >= controller.sourceData.length) controller.currentSource = 0;
          controller.setSource(controller.currentSource);
      };
        
      controller.setSource = function(index) {
          controller.API.stop();
          controller.currentSource = index;
          controller.config.sources = controller.sourceData[index].sources;
          $timeout(controller.API.play.bind(controller.API), 100);
      };

      controller.checkState = function(){
        if(controller.API == null)
          return 'angular-player-play'
        else if(controller.API.currentState === 'play')
          return 'angular-player-pause'
        else
          return 'angular-player-play'
      };

      controller.playPause = function(){
        if(controller.API.currentState === 'play') {
          setTimeout(function() {
            controller.stopSource();
          }, controller.config.waitTime);
        }
        else {
          setTimeout(function() {
            controller.playSource();
          }, controller.config.waitTime);
        }
      };

      controller.stopSource = function(){
        console.log("play stopped");
        disableVol();
        setTimeout(function() {
            controller.API.pause();
          }, controller.config.waitTime);
        enableVol();        
      };

      controller.playSource = function(){
        console.log("play begun with playlist: ", JSON.stringify(playlistService.getAudioPlayList()));
        if (typeof analytics !== "undefined"){
          window.ga.trackEvent("Audio", "Play", JSON.stringify(playlistService.getAudioPlayList()));
        }
        enableVol();
        setTimeout(function() {
            controller.API.play();
          }, controller.config.waitTime);
      };

      controller.nextSource = function() {
        if (controller.currentSource < controller.sourceData.length-1){
          enableVol();
          controller.API.stop();
          controller.currentSource += 1;
          controller.config.sources = controller.sourceData[controller.currentSource].sources;
          $timeout(controller.API.play.bind(controller.API), 100);
        }
      };

      controller.prevSource = function() {
        if (controller.currentSource > 0){
          enableVol();
          controller.API.stop();
          controller.currentSource -= 1;
          controller.config.sources = controller.sourceData[controller.currentSource].sources;
          $timeout(controller.API.play.bind(controller.API), 100);
        }
      };

      controller.closePlayer = function(){
        disableVol();
        controller.API.stop();
        controller.config.open = false;
        playlistService.setAudioPlayList([]);
        enableVol();        
      };

      function enableVol(){
        $timeout(controller.API.setVolume(1), 1000);
        //controller.API.setVolume(1);
      };
      
      function disableVol(){
        controller.API.setVolume(0);
      };

      $scope.$on('AUDIO_SOURCE_DATA', function() {
        console.log("broadcast of AUDIO_SOURCE_DATA caught");
        controller.config.playerType = 'audio';
        controller.currentSource = playlistService.getClicked();
        controller.sourceData = playlistService.getAudioPlayList();
        console.log("broadcast of AUDIO_SOURCE_DATA caught, sourceData, currentSource: ", controller.sourceData, controller.currentSource);
        controller.config.sources = controller.sourceData[controller.currentSource].sources;
        console.log("controller.config.sources: ", JSON.stringify(controller.config.sources));

        enableVol();
        controller.config.open = true;
      });

      $scope.$on('VIDEO_SOURCE_DATA', function(data_source) {
        controller.config.playerType = 'video';
        controller.config.sources = [
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
                ];
        
        enableVol();
        controller.config.open = true;
      });

}])

.controller('soundCtrl', ['$scope', '$ionicScrollDelegate', '$rootScope','$http', '$translate', 'playlistService', '$sce', function($scope, $ionicScrollDelegate, $rootScope, $http, $translate, playlistService, $sce) {
    $scope.playNow = function(location, title, artist, image){
    console.log("playNow called from soundCtrl :", location, title, artist);

    playlistService.setClicked();
        var playList = [];
        var itemToPush = {
            title: title,
            subtitle: artist,
            image: image,
            sources: [
              { src: location, type: "audio/mpeg" },
            ]
    };
    playList.push(itemToPush);
    playlistService.setAudioPlayList(playList);
    $rootScope.$broadcast('AUDIO_SOURCE_DATA');
       
    }
}])

.controller('SettingsCtrl', ['$scope', '$ionicScrollDelegate', '$rootScope','$http', '$translate', function($scope, $ionicScrollDelegate, $rootScope, $http, $translate) {
  
}])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
