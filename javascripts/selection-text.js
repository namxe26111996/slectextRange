;(function(exports) {
    var SelectionText = function(options) {
        SelectionData.call(this, options);

        this.element.addEventListener('mouseup', this.handleSelection.bind(this));
    };

    var proto = SelectionText.prototype = Object.create(SelectionData.prototype);

    proto.getSelected = function() {
        var selection = '';

        if (window.getSelection) {
            selection = window.getSelection();
        } else if (document.getSelection) {
            selection = document.getSelection();
        } else if (document.selection) {
            selection = document.selection.createRange();
        }

        return selection;
    };

    proto.handleSelection = function() {
        this.removeHighlights();
        var st = this.getSelected();
        var range;

        if (document.selection && !window.getSelection) {
            range = st;
            range.pasteHTML('<span class="' + this.highlighted + '" style="background-color:' + this.color + '">' + range.htmlText + '</span>');
        } else {
            range = st.getRangeAt(0);
            var newNode = document.createElement('span');
            newNode.classList.add(this.highlighted);
            newNode.style.backgroundColor = this.color;
            range.surroundContents(newNode);
        }
    };

    proto.removeSelectedTagsEmpty = function() {
        var $selectedTags = $('.' + this.highlighted);

        if ($selectedTags.length) {
            $selectedTags.each(function() {
                if (!$(this).text()) {
                    $(this).remove();
                }
            });
        }
    };

    proto.removeHighlights = function() {
        var $selectedTags = $('.' + this.highlighted);
        $selectedTags.contents().unwrap();

        this.removeSelectedTagsEmpty();
    };

    proto.serializeHighlights = function() {
        var $selectedTags = $('.' + this.highlighted);

        this.removeSelectedTagsEmpty();

        return $selectedTags.parent()[0];
    };

    proto.destroy = function() {
        this.element.removeEventListener('mouseup', this.handleSelection);
    };

    exports.SelectionText = SelectionText;
})(window);
