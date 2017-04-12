angular.module('starter.services', [])
.service('playlistService', ['$sce', '$http', function($sce, $http) {
  var playlistService = this;
  
  playlistService.audioPlayList = [];
  playlistService.videoPlayList = [];
  playlistService.main = undefined;
  playlistService.selected = undefined;

  playlistService.getClicked = function(){
     return playlistService.selected != null ? playlistService.selected.chapter_id - 1 : 0;
  };

  playlistService.setClicked = function(data){
    playlistService.selected = data;
  };

  playlistService.getMain = function(main){
    return playlistService.main;
  };

  playlistService.setMain = function(main){
    playlistService.main = main;
  };

  playlistService.getAudioPlayList = function(){

     return playlistService.audioPlayList;
  };

  playlistService.setAudioPlayList = function(value){
    console.log("Audio PlayList: ", JSON.stringify(value));
      playlistService.audioPlayList = value;
  };

    playlistService.getVideoPlayList = function(){
     return playlistService.videoPlayList;
  };

  playlistService.setVideoPlayList = function(value){
    //PREPARE videoPlayList
    playlistService.videoPlayList = value;
  };

}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
