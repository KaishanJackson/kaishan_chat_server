import jwt, { JwtPayload } from "jsonwebtoken"
const SEARCH_KEY = 'SEARCH_KEY'


export function createToken(user: string): string {
    const token = jwt.sign({ user }, SEARCH_KEY
        // , { expiresIn: '1h' }
    )
    return token
}

export function verifyToken(token: string): Promise<JwtPayload | string | undefined> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SEARCH_KEY, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}