(function (angular, sp, jQuery) {

    angular.module('respect.tools.notify', [])

        .directive('toolsNotify',['$rootScope', function ($rootScope) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="hist-popup js-message-popup" style="display: none;">\n    <div class="hist-popup__close js-close-popup">\n        <img src="image/close-cross.png"  data-ng-click="show=false;" alt=""></div>\n    <div class="hist-popup__header"  style="text-align: center;" data-ng-bind="text"></div>\n</div>\n',
                scope: false,
                link: function (scope, elem, attrs) {
                    scope.text = '';
                    scope.show = false;
                    $rootScope.$on('notify', function (event, text, delay) {
                        if (text) {
                            scope.text = text;
                            jQuery('.js-message-popup').bPopup({
                                speed: 450,
                                transition: 'fadeIn',
                                closeClass: 'js-close-popup',
                                positionStyle: 'absolute',
                                follow: [true,false],
                                modal: true,
                                modalClose: true,
                                modalColor: '#222',
                                opacity: 0.8,
                                onOpen: function () {
                                    scope.show = true;
                                    scope.$digest();
                                },
                                onClose: function () {
                                    scope.show = false;
                                    scope.$digest();
                                }
                            });
                        }
                    });
                    $rootScope.$on('notify:hide', function () {
                        scope.show = false;
                        scope.text = '';
                    });
                }
            }

        }]);

    document.createElement('tools-notify');
    var elems = document.querySelectorAll('tools-notify');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['respect.tools.notify']);
    }

}(window.angular, window.SAILPLAY, window.$));