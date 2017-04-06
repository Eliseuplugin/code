angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'pascalprecht.translate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.factory("$translateStaticFilesLoader",["$q","$http",function(a,b){return function(c){if(!c||!angular.isString(c.prefix)||!angular.isString(c.suffix))throw new Error("Couldn't load static files, no prefix or suffix specified!");var d=a.defer();return b({url:[c.prefix,c.key,c.suffix].join(""),method:"GET",params:""}).success(function(a){d.resolve(a)}).error(function(){d.reject(c.key)}),d.promise}}])


.config(function($translateProvider, $ionicConfigProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: 'translation/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('pt');
  $translateProvider.fallbackLanguage('en');// se a lingua falhar no processo do sistema!
  $translateProvider.fallbackLanguage('es');
  $translateProvider.useSanitizeValueStrategy('escape');

  $translateProvider.preferredLanguage('pt');

  $ionicConfigProvider.tabs.position('bottom');
})


//para trocar as linguas do aplicativo
.controller('Ctrl,' ['$scope', '$translate', function ($scope, $translate) {
  console.log("Ctrl controller started");
  $scope.settings = 0;
  $scope.settings.lang = "en";
  $scope.lang = "pt";
  $scope.lang = "es";
  $scope.changeLanguage = function (key){
    $translate.use(key);
  };
}])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
