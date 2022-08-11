
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['EN'] = {
        formatLoadingMessage: function () {
            return 'please wait';
        },
        formatRecordsPerPage: function (pageNumber) {
            return 'each page ' + pageNumber + ' record';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'page ' + pageFrom + ' what page ' + pageTo + ' record，total ' + totalRows + ' record';
        },
        formatSearch: function () {
            return 'search';
        },
        formatNoMatches: function () {
            return 'no record';
        },
        formatPaginationSwitch: function () {
            return 'front page';
        },
        formatRefresh: function () {
            return 'refresh';
        },
        formatToggle: function () {
            return 'Toggle';
        },
        formatColumns: function () {
            return 'Columns';
        },
        formatExport: function () {
            return 'Export';
        },
        formatClearFilters: function () {
            return 'ClearFilters';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['EN']);

})(jQuery);
