let fs = require("fs");

let getRandom = (n, m)=> {
    return Math.round(Math.random() * (m - n) + n);
};

let str1 = "abcdefghijklmnopqrstuvwxyz",
    str2 = str1.toUpperCase(),
    arr = [];

for (let i = 1; i < 10; i++) {
    let obj = {};
    obj.id = i;
    obj.name = str2.charAt(getRandom(0,25)) + str1.charAt(getRandom(0,25)) + str1.charAt(getRandom(0,25));
    obj.age = getRandom(18,30);
    arr.push(obj);
}

fs.writeFile("data.json",JSON.stringify(arr));