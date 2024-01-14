import { WebSocketServer } from 'ws'
import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser';
import usersRouter from "./routes/user"
import { Buffer } from "buffer"

const app = express()
app.use(cors())
// app.use((req, res, next) => {  
//   const token = req.headers.token; // 从请求头中获取 token  
//   if (!token) {  
//     return res.status(401).send('Token is missing'); // 如果 token 缺失，返回 401 未授权状态码  
//   }  
//   // req.token = token; // 将 token 存储在请求对象中供后续使用  
//   next(); // 继续执行后续的路由处理函数  
// });  
app.use(bodyParser.json())
const wss = new WebSocketServer({
  port: 8080
})
const wsClient: { [propsname: string]: any } = {}
wss.on('connection', (ws, req) => {
  console.log('客户端已连接：', req.socket.remoteAddress)
  const user = req.url!.replace("/?=", "")
  ws.on('message', (data: any) => {
    const dataStr = Buffer.from(data, 'base64').toString('utf8');
    const dataObj = JSON.parse(dataStr);
    console.log('收到客户端发送的消息：', dataObj)
    wsClient[dataObj.to] && wsClient[dataObj.to].send(JSON.stringify(dataObj))
  })
  // ws.send('我是服务端') // 向当前客户端发送消息
  // ws.send('我是bobo')
  // 将用户添加到WebSocket连接集合中 
  wsClient[user] = ws
})
app.use('/user', usersRouter);
app.listen(8000)