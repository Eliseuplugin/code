angular.module('page.controllers', ['pascalprecht.translate', 'jett.ionic.filter.bar']) 

.controller('SermonsCtrl', ['$scope', '$sce', '$rootScope', 'playlistService', function($scope, $sce, $rootScope, playlistService) {
  //Teaching page controller
  //fonteFns
  if(typeof analytics !== "undefined") {
    window.ga.trackView("Teachings");
  }
  $(".waiting").hide();

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.playNow = function(main, data){
    console.log("playNow called from SermonsCtrl", main, data);
    if(data != null || data != undefined){

      var title, subtitle;
      
      switch($rootScope.settings.lang) {
        case "en":
            title = main.en_name;
            subtitle = data.en_title;
            break;
        case "pt":
            title = main.pt_name;
            subtitle = data.pt_title;
            break;
        case "es":
        	title = main.es_name;
        	subtitle = data.es_title;
        	break;
        default:
            title = main.en_name;
            subtitle = data.en_title;
      }

      var playList = {
        title: title,
        subtitle: subtitle,
        image: main.photo,
        sources: [
          { src: $sce.trustAsResourceUrl(data.fileUrlLocalPath ? data.fileUrlLocalPaths:data.teaching_url), type: "audio/mpeg" },
        ]
      };
    
      playlistService.setAudioPlayList([playList]);
      $rootScope.$broadcast('AUDIO_SOURCE_DATA');  
    }
  };//fonteFns.playNow;
  $scope.download = function(){};//
  $scope.sortingBy = "hits";
  
  $scope.clearSearch = function() {
    console.log("Function clearSearch called");
    $scope.search_query = "";
  }

}])