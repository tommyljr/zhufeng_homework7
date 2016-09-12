Buffer.myConcat = function (list, length) {
    if (typeof length == "undefined") {
        length = 0;
        list.forEach(function (item) {
            length += item.length;
        });
    }
    let result = new Buffer(length),
        curOffset = 0;
    list.forEach(function (item) {
        item.copy(result, curOffset);
        curOffset += item.length;
    });
    return result;
};