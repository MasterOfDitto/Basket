/* 本機預覽用的極簡靜態伺服器（無外部依賴）：node hbl-life/server.js */
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=__dirname, PORT=process.env.PORT||8123;
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8','.md':'text/plain; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]);
  if(p==='/'||p==='')p='/index.html';
  const f=path.join(ROOT,p);
  if(!f.startsWith(ROOT)){res.writeHead(403).end('forbidden');return;}
  fs.readFile(f,(e,buf)=>{
    if(e){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('404');return;}
    res.writeHead(200,{'Content-Type':TYPES[path.extname(f).toLowerCase()]||'application/octet-stream'}).end(buf);
  });
}).listen(PORT,()=>console.log('HBL Life 預覽伺服器：http://localhost:'+PORT));
