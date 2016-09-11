/**
 * Created by Administrator on 2016/9/11.
 */
Buffer.myconcat=function (list,len) {
    var tmpListLen=0;
    list.forEach(function (item) {
        tmpListLen+=item.length;
    });
    tmpListLen=len?(len<tmpListLen?len:tmpListLen):tmpListLen;

    var tmpBuffer=new Buffer(tmpListLen);
    tmpBuffer.fill(0);

    var tmpLen=0;
    list.forEach(function (item) {
        //限制一下循环
        if(tmpLen+item.length<=tmpListLen){
            item.copy(tmpBuffer,tmpLen);
            console.log(item.toString());
            tmpLen+=item.length;
        }
    });
    return tmpBuffer;
};