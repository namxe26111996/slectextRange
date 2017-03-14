;(function(exports) {
	var SelectionData = function(options) {
        _.assign(this, DEFAULT_OPTIONS, options);

        this.$element = $(this.element);
    };

    exports.SelectionData = SelectionData;
})(window);
