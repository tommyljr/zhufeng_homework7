let http = require("http"),
    fs = require("fs"),
    mime = require("mime"),
    url = require("url");

http.createServer(function (req, res) {
    let obj = url.parse(req.url),
        pathname = obj.pathname,
        query = obj.query;

    if (pathname == "/") {
        res.setHeader("Content-Type", "text/html;charset=utf8");
        fs.createReadStream("index.html").pipe(res);
        return;
    }

    if (pathname == "/user") {
        let promise = new Promise(function (res, rej) {
            fs.readFile("./data.json", function (error,data) {
                res(JSON.parse(data));
            });
        });
        switch (req.method) {
            case "GET":
                promise.then(function (users) {
                    res.end(JSON.stringify(users));
                });
                break;
            case "PUT":
                let str = "";
                req.on("data", function (chunk) {
                    str += chunk;
                });
                req.on("end", function () {
                    promise.then(function (users) {
                        let updateUser = JSON.parse(str);
                        users = users.map(function (item) {
                            if (item.id == updateUser.id) {
                                return updateUser;
                            }else {
                                return item;
                            }
                        });
                        let newUsers = JSON.stringify(users);
                        fs.createWriteStream("./data.json").end(newUsers);
                        res.end(JSON.stringify({success:"done"}));
                    });
                });
                break;
            default:
                break;
        }
        return;
    }

    let promise = new Promise(function (res, rej) {
        fs.exists("." + pathname, function (flag) {
            res(flag);
        });
    });
    promise.then(function (flag) {
        if (flag) {
            res.setHeader("Content-type", mime.lookup(pathname) + ";charset=utf8");
            fs.createReadStream("." + pathname).pipe(res);
        } else {
            let _http_server = require("_http_server");
            res.statusCode = 404;
            res.end(_http_server.STATUS_CODES[404]);
        }
    });

}).listen(80,()=>{
    console.log("Server in listening in http://localhost");
});