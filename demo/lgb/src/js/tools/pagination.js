(function (angular, sp, jQuery) {

    angular.module('lgb.tools.pagination', [])

        .directive('toolsPagination', [function () {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="tools-paginations_wrapp">\n    \n    <div data-ng-if="page && perPage && items && need_to_show(items, perPage)">\n        <style>\n            .tools-paginations_wrapp {\n                text-align: center\n            }\n\n            .tools-paginations_item {\n                cursor: pointer;\n                display: inline-block;\n                font-size: 14px;\n                font-family: \'Lato\', sans-serif;\n                line-height: 1;\n                font-weight: normal;\n                font-style: normal;\n                min-width: 30px;\n                height: 30px;\n                text-align: center;\n                text-overflow: ellipsis;\n                vertical-align: center;\n                transition: color .5s ease-out;\n            }\n\n            .tools-paginations_item:hover {\n                color: #939393;\n            }\n\n            .tools-paginations_item.active {\n                color: #6EA131;\n            }\n        </style>\n    <span\n            class="tools-paginations_item"\n            data-ng-if="need_to_show(items, perPage)"\n            data-ng-click="item.go && onChange(item.text)"\n            data-ng-class="{active : page == item.text}"\n            data-ng-repeat="item in pages"\n            data-ng-bind="item.text"></span>\n    </div>',
                scope: {
                    page: '=',
                    perPage: '=',
                    items: '=',
                    onChange: '='
                },
                link: function (scope) {
                    scope.need_to_show = function (items, per_page) {
                        if (!items || !per_page) {
                            return false;
                        }
                        return Math.ceil(items / per_page) > 1 ? true : false;
                    };
                    scope.pages = [];
                    scope.get_pages = function (num, items, per_page, range) {
                        var limit = Math.ceil(items / per_page);
                        range = range || 3;
                        arr = [];
                        for (var i = 1; i <= limit; i++) {
                            if (i <= range || (i > num - range / 2 && i < num + range / 2) || i > limit - range) {
                                if (arr[arr.length - 1] && i != arr[arr.length - 1].text + 1)arr.push({text: '...'});
                                arr.push({go: true, text: i})
                            }

                        }
                        return arr || [];
                    };
                    scope.pages = scope.get_pages(scope.page, scope.items, scope.perPage);
                }
            }

        }]);

    document.createElement('tools-pagination');
    var elems = document.querySelectorAll('tools-pagination');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['alpina.tools.pagination']);
    }

}(window.angular, window.SAILPLAY, window.$));