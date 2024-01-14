import { getUserInfoByUsername, setFriend, setUser } from "../sql/user";
import { addToken } from "../token";
import { ERROR_CODE, SUCCESS_CODE } from "../types/code";
import { ServerResponse } from "../types/http";
import { SetUserParam, UserInfo } from "../types/user";
import { createToken } from "./jwt";

export async function userRegister(userInfo: SetUserParam): Promise<ServerResponse<boolean>> {
    try {
        const result = await getUserInfoByUsername(userInfo.username)
        if (result.length) {
            return Promise.resolve({
                code: ERROR_CODE.REGISTER_USERIS_EXIST,
                data: false,
                message: "the username is exist"
            })
        } else {
            await setUser(userInfo)
            return Promise.resolve({
                code: SUCCESS_CODE.SUCCESS,
                data: true,
                message: ''
            })
        }

    } catch (error) {
        return Promise.resolve({
            code: ERROR_CODE.DB_ERROR,
            data: false,
            message: JSON.stringify(error)
        })
    }
}

export async function userLogin(userInfo: SetUserParam): Promise<ServerResponse<string>> {
    try {
        const result = await getUserInfoByUsername(userInfo.username)
        if (result.length) {
            const token = createToken(userInfo.username)
            const addTokenResult = await addToken(token)
            if (addTokenResult.success) {
                return Promise.resolve({
                    code: SUCCESS_CODE.SUCCESS,
                    data: token,
                    message: 'success'
                })
            } else {
                return Promise.resolve({
                    code: ERROR_CODE.DB_ERROR,
                    data: '',
                    message: 'write token error'
                })
            }
        } else {
            return Promise.resolve({
                code: ERROR_CODE.NO_USER,
                data: '',
                message: 'user have not register'
            })
        }
    } catch (error) {
        return Promise.resolve({
            code: ERROR_CODE.DB_ERROR,
            data: '',
            message: JSON.stringify(error)
        })
    }
}

export async function getUserInfo(username: string) {
    try {
        const result = await getUserInfoByUsername(username)
        if (result.length) {
            const userinfo = result[0]
            return Promise.resolve({
                username: userinfo.username,
                friends: userinfo.friends,
                id: userinfo.id
            })
        } else {
            return Promise.resolve({
                code: ERROR_CODE.NO_USER,
                data: '',
                message: 'user have not register'
            })
        }
    } catch (error) {
        return Promise.resolve({
            code: ERROR_CODE.DB_ERROR,
            data: '',
            message: JSON.stringify(error)
        })
    }
}
export async function addFriend(params: { username: string, friendname: string }): Promise<ServerResponse<boolean>> {
    const { username, friendname } = params
    try {
        const friendResult = await getUserInfoByUsername(friendname)
        const userResult = await getUserInfoByUsername(username)
        if (friendResult.length, userResult.length) {
            const setParam = userResult[0]
            const friends = !!setParam.friends ? `${setParam.friends},${friendname}` : friendname
            setParam.friends = friends
            const friendParam = friendResult[0]
            const friendFriends = !!friendParam.friends ? `${friendParam.friends},${username}` : username
            friendParam.friends = friendFriends
            await setFriend(setParam)
            await setFriend(friendParam)
            return Promise.resolve({
                code: SUCCESS_CODE.SUCCESS,
                data: true,
                message: "success"
            })
        } else {
            return Promise.resolve({
                code: ERROR_CODE.REGISTER_USERIS_EXIST,
                data: false,
                message: "there is not the user"
            })
        }

    } catch (error) {
        return Promise.resolve({
            code: ERROR_CODE.DB_ERROR,
            data: false,
            message: JSON.stringify(error)
        })
    }
}