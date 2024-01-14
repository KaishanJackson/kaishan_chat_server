import fs from 'fs'
import path from 'path'

export async function getTokenList(): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'token.json'), 'utf8', (error, data) => {
            if (error) {
                reject(error)
            } else {
                const tokenData: { tokenList: string[] } = JSON.parse(data)
                resolve(tokenData.tokenList)
            }
        })
    })
}

export async function setToken(tokenList: string[]): Promise<{
    success: boolean
}> {
    const setValue = JSON.stringify({
        tokenList
    })
    return new Promise(resolve => {
        fs.writeFile(path.join(__dirname, 'token.json'), setValue, (error) => {
            if (error) {
                resolve({ success: false })
            } else {
                resolve({ success: true })
            }
        })
    })
}

export async function addToken(token: string):Promise<{success: boolean}> {
    try {
        const tokenList = await getTokenList()
        tokenList.push(token)
        const result = await setToken(tokenList)
        return Promise.resolve(result)
    } catch (error) {
       return Promise.reject(error)
    }
}

export async function delToken(token: string):Promise<{success: boolean}> {
    try {
        const tokenList = await getTokenList()
        const index = tokenList.indexOf(token)
        if(index===-1){
            return Promise.resolve({success:true})
        }
        tokenList.splice(index,1)
        const result = await setToken(tokenList)
        return Promise.resolve(result)
    } catch (error) {
       return Promise.reject(error)
    }
}

export async function isToken(token: string):Promise<{isToken: boolean}> {
    try {
        const tokenList = await getTokenList()
        return Promise.resolve({isToken:tokenList.includes(token)})
    } catch (error) {
       return Promise.reject(error)
    }
}