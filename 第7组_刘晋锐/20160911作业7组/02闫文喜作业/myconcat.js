
Buffer.myconcat=function(list,length){
    if(typeof length=="undefined"){
        length=0;
        list.forEach(function(item){
            length+=item.length;
        })
    }
    var newBuffer=new Buffer(length);
    var curOffset=0;
    list.forEach(function(item){
        item.copy(newBuffer, curOffset);
        curOffset += item.length;
    });
    return newBuffer;
}