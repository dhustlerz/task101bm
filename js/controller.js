// Video feed Data
var myAppControllers = angular.module('myApp.controllers', []);
myAppControllers.controller('VideoFeedAppController', ['$scope', '$http',
  function($scope, $http) {
    var jsonFileUrl = 'assets/json/videofeed.json';
    angular.element(document).ready(function() {
      $http.get(jsonFileUrl).success(function(data) {
        $scope.videoFeedData = data.Items;
        var myEl = angular.element(document.querySelector('#carousel-inner'));
        angular.forEach($scope.videoFeedData, function(value, key) {
          if (key == 5) {
            return false;
          }
          if (key == 0) {
            myEl.append('<div class="item active"><div class="col-xs-12 col-sm-6 col-md-3 carousel-wrapper" style="position: relative; left: 0; top: 0;"><a href="#"><img src="' + value.Images[0].Url + '" class="img-responsive img-zoom carousel-imgs"><img class="crousel-play-icon" width="30" align="left" src="images/icons/Circle_Play.svg"></a><div class="carousel-caption text-left"><span class="header">' + value.Name + '</span></br><span class="footer"> S0' + value.Season.Number + ' E0' + value.Episode + '</span></div></div></div>');
          }
          else {
            myEl.append('<div class="item"><div class="col-xs-12 col-sm-6 col-md-3 carousel-wrapper" style="position: relative; left: 0; top: 0;"><a href="#"><img src="' + value.Images[0].Url + '" class="img-responsive img-zoom carousel-imgs"><img class="crousel-play-icon" width="30" align="left" src="images/icons/Circle_Play.svg"></a><div class="carousel-caption text-left"><span class="header">' + value.Name + '</span></br><span class="footer"> S0' + value.Season.Number + ' E0' + value.Episode + '</span></div></div></div>');
          }
        });
      }).finally(function() {
        // Initialize carousel
        (function() {
          // $('#myCarousel').carousel({ interval: 2000 });
          $('#myCarousel').carousel('pause');
        }());
        // Split Into Four
        (function() {
          $('.carousel-belltaskcarousel .item').each(function() {
            var itemToClone = $(this);
            for (var i = 1; i < 4; i++) {
              itemToClone = itemToClone.next();
              // wrap around if at end of item collection
              if (!itemToClone.length) {
                itemToClone = $(this).siblings(':first');
              }

              // grab item, clone, add marker class, add to collection
              itemToClone.children(':first-child').clone().addClass("cloneditem-" + (i)).appendTo($(this));
            }
          });
        }());
        // Zoom Transition Effect
        $(document).ready(function() {
          $('.img-zoom').hover(function() {
            $(this).addClass('transition');

          }, function() {
            $(this).removeClass('transition');
          });
        });
        // carousel Controls
        $('#myCarousel').bind('slid.bs.carousel', function(e)
        {
          var $this = $(this);
          $this.children('.carousel-control').show();
          $('.carousel-control').click(function() {
            if ($('.carousel-inner .item:last').hasClass('active')) {
              $this.children('.right.carousel-control').prop('disabled', true).css("background-color", "#696969");
              $this.children('.left.carousel-control').prop('disabled', false).css("background-color", "#feb709");
            } else {
              $this.children('.right.carousel-control').prop('disabled', false).css("background-color", "#feb709");
            }
            if ($('.carousel-inner .item:first').hasClass('active')) {
              $this.children('.right.carousel-control').prop('disabled', false).css("background-color", "#feb709");
              $this.children('.left.carousel-control').prop('disabled', true).css("background-color", "#696969");
            } else {
              $this.children('.left.carousel-control').prop('disabled', false).css("background-color", "#feb709");
            }
          })

        });

      });
    });
  }
]);

// Article feed Data
myAppControllers.controller('ArticleFeedAppController', ['$scope', '$http',
  function($scope, $http) {
    var jsonFileUrl = 'assets/json/articlesfeed.json';
    angular.element(document).ready(function() {
      $http.get(jsonFileUrl).success(function(data) {
        $scope.articleFeedData = data.Items;
      }).catch(function(err) {
        // Log error somehow.
      }).finally(function() {});
    });
  }
]);