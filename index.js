const htttp=require('http');
const fs=require('fs');
const path= require("path");
const { fileURLToPath } = require('url');

const hostname='localhost';
const port=3000;

const server=htttp.createServer((req,res)=>{
    console.log("Request for"+req.url+"by methode"+req.method);
    if(req.method=='GET')
    {
        var fileURL;
        if( req.url=="/") fileURL='/index.html'
        else fileURL=req.url;
        var filePath=path.resolve('./public'+fileURL)
        const fileExtension=path.extname(filePath)
        if(fileExtension=='.html')
        {
            fs.exists(filePath,(exists)=>{
                if(!exists){
                    res.statusCode=404;
                    res.setHeader('Content-Type','text/html');
                    res.end('<html><body><h1>Error 404' +fileURL+'not Found</h1></body></html>')
                    return
                }
                else{
                    res.statusCode=200;
                    res.setHeader('Content-Type','text/html');
                    fs.createReadStream(filePath).pipe(res);

                    

                }
            })
        }
        else{
            res.statusCode=404;
                    res.setHeader('Content-Type','text/html');
                    res.end('<html><body><h1>Error 404' +fileURL+'not a html file</h1></body></html>')
                    return  
        }

    }
    else{
        res.statusCode=404;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>Error 404' +req.method+'not supported</h1></body></html>')
        return
    }
   
})

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
})