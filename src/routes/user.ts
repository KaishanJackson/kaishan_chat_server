import express from 'express'
import { SetUserParam } from '../types/user'
import { addFriend, getUserInfo, userLogin, userRegister } from '../utils/user'
import { ERROR_CODE } from '../types/code'
import { verifyToken } from '../utils/jwt'
import { JwtPayload } from 'jsonwebtoken'
const router = express.Router()

router.post("/login", async (req, res) => {
    console.log(req.body)
    try {
        const body = req.body
        if (body.username !== '' && body.password !== '') {
            const result = await userLogin(body as SetUserParam)
            res.send(result)
        } else {
            res.send({
                code: ERROR_CODE.PARAMETER_ERROR,
                data: false,
                message: 'parameter error'
            })
        }
    } catch (error) {
        res.send({
            code: ERROR_CODE.HTTP_ERROR,
            data: false,
            message: JSON.stringify(error)
        })
    }
})

router.post("/register", async (req, res) => {
    try {
        const body = req.body
        if (body.username !== '' && body.password !== '') {
            const result = await userRegister(body as SetUserParam)
            res.send(result)
        } else {
            res.send({
                code: ERROR_CODE.PARAMETER_ERROR,
                data: false,
                message: 'parameter error'
            })
        }
    } catch (error) {
        res.send({
            code: ERROR_CODE.HTTP_ERROR,
            data: false,
            message: JSON.stringify(error)
        })
    }
})
router.get("/userinfo", async (req, res) => {
    try {
        const token = await verifyToken(req.headers.token as string) as JwtPayload
        console.log(token)
        if (token) {
            const result = await getUserInfo(token.user)
            res.send({
                code: 200,
                data: result,
                message: "success"
            })
        } else {
            res.send({
                code: ERROR_CODE.PARAMETER_ERROR,
                data: false,
                message: 'parameter error'
            })
        }
    } catch (error) {
        res.send({
            code: ERROR_CODE.HTTP_ERROR,
            data: false,
            message: JSON.stringify(error)
        })
    }
})
router.post("/addfriend", async (req, res) => {
    try {
        const token = await verifyToken(req.headers.token as string) as JwtPayload
        console.log(token)
        if (token) {
            const result = await addFriend({ username: token.user, friendname: req.body.friend })
            res.send({
                code: 200,
                data: result,
                message: "success"
            })
        } else {
            res.send({
                code: ERROR_CODE.PARAMETER_ERROR,
                data: false,
                message: 'parameter error'
            })
        }
    } catch (error) {
        res.send({
            code: ERROR_CODE.HTTP_ERROR,
            data: false,
            message: JSON.stringify(error)
        })
    }
})

export default router