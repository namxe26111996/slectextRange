;
(function(exports) {
    var SelectionText = function(options) {
        SelectionData.call(this, options);

        this.element.addEventListener('mouseup', this.handleSelection.bind(this));
        this.element.addEventListener('mousedown', this.removeHighlights.bind(this));
        this.button.addEventListener('click', this.greeting.bind(this));
    };

    var proto = SelectionText.prototype = Object.create(SelectionData.prototype);
    //TODO rename function
    proto.greeting = function() {
        console.log('button save');
        this.restoreHighlight();
    }

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


        var st = this.getSelected();
        var range;
        //create Span highlight
        var newNode = document.createElement('span');
        newNode.classList.add(this.highlighted);
        newNode.style.backgroundColor = this.color;
        newNode.classList.add('draftHighlight');
        if (document.selection && !window.getSelection) {
            range = st;
            range.pasteHTML('<span class="' + this.highlighted + '" style="background-color:' + this.color + '">' + range.htmlText + '</span>');
        } else {
            range = st.getRangeAt(0);
            try {
                //click 1 vi tri se k sinh ra span
                if (range.startOffset !== range.endOffset) {
                    range.surroundContents(newNode);
                }
            } catch (err) {
                //handle span part range
                var sel = this.getSelected();
                console.log(range.toString());
                var startRange = document.createRange();
                var startContainer = range.startContainer;
                var endContainer = range.endContainer;
                startRange.setStart(startContainer, range.startOffset);
                startRange.setEnd(startContainer, startContainer.length);
                //handle p part  range
                var destinaitonRange = document.createRange();
                destinaitonRange.setStart(endContainer, 0);
                destinaitonRange.setEnd(endContainer, range.endOffset);
                console.log('startContainer ',startContainer.parentNode);
                console.log('start offset ',range.startOffset);
                console.log('end endContainer ',endContainer.parentNode);
                console.log('end offset ',range.endOffset);

                var newNode2 = newNode.cloneNode(true);
                console.log('startR : ',startRange.toString());
                console.log('endR : ',destinaitonRange.toString());
                startRange.surroundContents(newNode2);
                destinaitonRange.surroundContents(newNode);
            };
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

    proto.restoreHighlight = function() {
        //TODO : remove dupli code
       var $selectedTags = $('.draftHighlight');
       $selectedTags.removeClass('draftHighlight');
    }

    proto.removeHighlights = function() {
        var $selectedTags = $('.draftHighlight');
        this.removeSelectedTagsEmpty();
        $selectedTags.contents().unwrap();
    };

    proto.serializeHighlights = function() {
        var $selectedTags = $('.' + this.highlighted);

        this.removeSelectedTagsEmpty();
        return $selectedTags.parent()[0];
    };

    //xóa sự kiện mouseup
    proto.destroy = function() {
        this.element.removeEventListener('mouseup', this.handleSelection);
    };

    exports.SelectionText = SelectionText;
})(window);
