(function (angular, sp, jQuery) {

    angular.module('pof.directives.history', ['pof.tools.pagination', 'pof.services.users'])

        .directive('historyCmp', ['userService', function (userService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div>\n    <section class="l-section history-sec">\n        <h1 class="section-header history-sec__head">History\n            <span class="section-header__title">\n                {{ history && history.length ? \'History of transactions\' : \'History is empty\' }}</span></h1>\n\n        <div class="history-item" data-ng-repeat="item in history_data">\n            <div class="history-item__points">{{ show_points(item.points_delta) }}</div>\n            <div class="history-item__date">{{ toDateObj(item.action_date) | date:\'medium\' }}</div>\n            <div class="history-item__name">{{ get_action_name(item) }}</div>\n        </div>\n        <tools-pagination data-ng-if="history_data"\n                          page="page" \n                          items="history.length" \n                          per-page="per_page"\n                          on-change="change_page"></tools-pagination>\n\n    </section>\n</div>',
                scope: true,
                link: function (scope) {
                    scope.history_data = null;
                    userService.loadHistory().then(function(data){
                        scope.history = data;
                        scope.change_page();
                        scope.$digest();
                    });
                    scope.per_page = 5;
                    scope.change_page = function(page){
                        scope.page = +page || 1;
                        scope.history_data = scope.history.slice((scope.page - 1) * scope.per_page, (scope.page - 1) * scope.per_page + scope.per_page);
                    };
                    scope.show_points = userService.show_history_points;
                    scope.toDateObj = userService.toDateObj;
                    scope.get_action_name = userService.getHistoryActionName;
                }
            }

        }]);

    document.createElement('history-cmp');
    var elems = document.querySelectorAll('history-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['pof.directives.history']);
    }

}(window.angular, window.SAILPLAY, window.$));