var f = [["A", 20000, -2], ["B", 5000, -0.1], ["C", 35000, -1], ["D", 15000, 2], ["E", 10000, 0.5], ["F", 20000, 1.4]];

function compareSecondColumn(a, b) {
    if (a[1] === b[1]) return 0;
    else return (a[1] < b[1]) ? -1 : 1;
}

function medianSplit(f) {
    var s1 = 0;
    var s2 = 0;
    var f1 = [];
    var f2 = [];
    while(f.length > 0) {
        var e = f.pop();
        if(s1 > s2) {
            f2.push(e);
            s2 += e[1];
        }
        else {
            f1.push(e);
            s1 += e[1];
        }
    }
    return [f1, f2, s1, s2];
}

var percentColors = [
    {pct: -3.0, color: { r: 0xff, g: 0x00, b: 0}},
    {pct: 0.0, color: { r: 0, g: 0, b: 0}},
    {pct: 3.0, color: { r: 0, g: 0xff, b: 0}}
];

var getColorForPercentage = function(pct) {
    if(pct < -3) pct = -3;
    if(pct > 3) pct = 3;
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
}

function treemap(f, orientation) {
    var r = medianSplit(f);

    var f1 = r[0];
    var f2 = r[1];
    var s1 = r[2];
    var s2 = r[3];

    var s = s1 + s2;
    var p1 = s1 / s;
    var p2 = s2 / s;

    var width1_p;
    var width2_p;
    var height1_p;
    var height2_p;

    if(orientation == 0) {
        width1_p = Math.round(p1*100);
        width2_p = 100 - width1_p;
        height1_p = 100;
        height2_p = 100;
    }
    else {
        width1_p = 100;
        width2_p = 100;
        height1_p = Math.round(p1*100);
        height2_p = 100 - height1_p;
    }
    var html = "";
    if(f1.length == 1) {
        var color = getColorForPercentage(f1[0][2]);
        var text = f1[0][0] + ": " +f1[0][1];
        html += "<div class=\"tile\" style=\"width:"+width1_p+"%;height:"+height1_p+"%;background-color:"+color+"\">"+text+"</div>";
    }
    else
        html += "<div class=\"frame\" style=\"width:"+width1_p+"%;height:"+height1_p+"%;\">"+treemap(f1, !orientation)+"</div>";


    if(f2.length == 1) {
        var color = getColorForPercentage(f2[0][2]);
        var text = f2[0][0] + ": " +f2[0][1];
        html += "<div class=\"tile\" style=\"width:"+width2_p+"%;height:"+height2_p+"%;background-color:"+color+"\">"+text+"</div>";
    }
    else
        html += "<div class=\"frame\" style=\"width:"+width2_p+"%;height:"+height2_p+"%;\">"+treemap(f2, !orientation)+"</div>";


    return html;
}
