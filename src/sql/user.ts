import { dbQuery } from ".";
import { SetUserParam, UserInfo } from "../types/user";
import dayjs from "dayjs";

export async function getAllUserInfo(): Promise<UserInfo[]> {
    try {
        const result = await dbQuery<UserInfo[]>('select * from user')
        return result
    } catch (error) {
        return Promise.reject(error)
    }
}
export async function getUserInfoById(id: number): Promise<UserInfo[]> {
    try {
        const result = await dbQuery<UserInfo[]>(`select * from user where id = ${id}`)
        console.log(result)
        return result
    } catch (error) {
        return Promise.reject(error)
    }
}
export async function getUserInfoByUsername(username: string): Promise<UserInfo[]> {
    try {
        const result = await dbQuery<UserInfo[]>(`select * from user where username = '${username}'`)
        return result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function setUser(userParams: SetUserParam): Promise<any> {
    userParams.created_at = dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
    userParams.updated_at = dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
    const keystring = Object.keys(userParams).join()
    const valuestring = Object.values(userParams).reduce((a: string, b: string) => a === "" ? `'${b}'` : a + `,'${b}'`, "")
    let sql = `insert into user (${keystring}) values(${valuestring})`
    try {
        const result = await dbQuery<any>(sql)
        return result
    } catch (error) {
        return Promise.reject(error)
    }
}
export async function setFriend(userParams: SetUserParam) {
    const created_at = dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
    const updated_at = dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
    const sql = `UPDATE user SET friends = '${userParams.friends}',created_at = '${created_at}',updated_at = '${updated_at}' WHERE username = '${userParams.username}'`
    try {
        const result = await dbQuery<any>(sql)
        return result
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}
getUserInfoById(12)