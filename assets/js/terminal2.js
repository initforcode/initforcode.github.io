/*
    Script that prints everything in span as a terminal.

*/

var terminal = function (target) {
    // Hide static content.
    var $lines = $(target);
    $lines.hide();

    // Notifications to display.
    var typedText = 'for each event in ${upcoming[@]}; do echo $event; done';
    var lineContents = '';
    $lines.each(function (i) {
        lineContents += $(this).text() + '<br>';
        $(this).text('').show();
    });
    
    // Display the stuff.
    var element = $lines.eq(0);
    element.append("thecrew@init $ ").addClass('active');

    var charIdx = 0;
    var typeChar = function () {
        var rand = Math.round(Math.random() * 100) + 20;
        setTimeout(function () {
            var char = typedText[charIdx++];
            element.append(char);
            if (typeof char !== "undefined")
                typeChar();
            else {
                element.append('<br><span class="output">' + lineContents + '</span>thecrew@init $ ');
                element.removeClass('active');
            }
        }, rand);
    }
    typeChar();
}

