import mysql from "mysql"
const connection = mysql.createPool({
    host: '124.220.197.152', //数据库地址
    port: 3306, //端口号
    user: 'chat_db', //用户名
    password: 'gs940527!', //密码
    database: 'chat_db', //数据库名称
    timezone: "08:00", //设置时区
    // connectionLimit: 10, // 连接数量限制
});
export async function dbQuery<T>(queryString:string):Promise<T>{
    return new Promise((resolve,reject)=>{
        connection.query(queryString,(err,res)=>{
            if(err){
                reject(err)
            }else{
                resolve(res)
            }
        })
    })
}

export default connection