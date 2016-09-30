(function () {

    angular.module('sg.ui.pagination', [])

        .directive('toolsPagination', [function () {
            return {
                restrict: 'E',
                replace: true,
                template:
                  '<div class="tools-paginations_wrapp paging">' +
                  '  <div data-ng-if="page && perPage && items && need_to_show(items, perPage)" class="common-paginate">' +
                  '    <a class="tools-paginations_item common-paginate__item" data-ng-if="need_to_show(items, perPage)" data-ng-click="item.go && onChange(item.text)" data-ng-class="{act : page == item.text}" data-ng-repeat="item in pages" data-ng-bind="item.text"></a>' +
                  '  </div>' +
                  '</div>',
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


}());