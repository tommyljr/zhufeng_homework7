Buffer.myConcat = function (list, length) {
    if (typeof length == "undefined") {
        length = 0;
        list.forEach(function (item) {
            length += item.length;
        });
    }
     var tempBuffer = new Buffer(length),
        curOffset = 0;
    list.forEach(function (item) {
        item.copy(tempBuffer, curOffset);
        curOffset += item.length;
    });
    return tempBuffer;
};