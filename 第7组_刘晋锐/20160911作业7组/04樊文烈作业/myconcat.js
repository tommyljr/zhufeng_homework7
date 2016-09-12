
var  buf1= new Buffer('樊');
var  buf2= new Buffer('文');
var  buf3= new Buffer('烈');
Buffer.myconcat  = function (list,len){
    if (list instanceof Array) {
        var _len = 0, a=0;
        if (!len) {
            list.forEach(function (item){
                a = a+item.length;
            });
            len=a;
        }
        //目标buffer
        var buffer = new Buffer(len);
        list.forEach(function (item){
            item.copy(buffer,_len);
            _len = _len+item.length;
        });
        return buffer;
    }
};
console.log(Buffer.myconcat([buf1,buf2,buf3],9).toString());