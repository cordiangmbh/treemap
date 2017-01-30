$(document).ready(function() {
    console.log( "ready!" );

    // Sort array one time (all functions expect sorted array)
    f.sort(compareSecondColumn);

    var html = treemap(f, false);

    $('#treemap').html(html);
});

console.log("Guus van Ooijen made this app!");
