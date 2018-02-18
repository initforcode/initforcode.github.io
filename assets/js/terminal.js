/*
    Script that prints everything in span as a terminal.

*/

var terminal = function (target) {
    var $lines = $(target);
    $lines.hide();
    var lineContents = new Array();

    var skip = 0;
    typeLine = function (idx) {
        idx == null && (idx = 0);
        var element = $lines.eq(idx);
        var content = lineContents[idx];
        if (typeof content == "undefined") {
            $('.skip').hide();
            return;
        }
        var charIdx = 0;

        var typeChar = function () {
            var rand = Math.round(Math.random() * 150) + 25;

            setTimeout(function () {
            var char = content[charIdx++];
            element.append(char);
            if (typeof char !== "undefined")
                typeChar();
            else {
                element.append('<br /><span class="output">' + element.text().slice(6, -1) +
                '</span><br />thecrew@initforcode $ <p id="cur">_</p>');
                element.removeClass('active');
                typeLine(++idx);
            }
            }, skip ? 0 : rand);
        }
        content = 'echo "' + content + '"';
        element.append('').addClass('active');
        typeChar();
    }

    $lines.each(function (i) {
    lineContents[i] = $(this).text();
    $(this).text('').show();
    });

    typeLine();
}

