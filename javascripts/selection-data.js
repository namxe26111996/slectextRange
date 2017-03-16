;(function(exports) {
	    var DEFAULT_OPTIONS = {
        color: 'red',
        element: document.body,
        highlighted: 'selected-text-highlight',
    };
	var SelectionData = function(options) {
        _.assign(this, DEFAULT_OPTIONS, options);

        this.$element = $(this.element);
    };

    exports.SelectionData = SelectionData;
})(window);
