
import fs from 'fs'
import jsonServer from 'json-server'
import bodyParser from 'body-parser'

import jwt from 'jsonwebtoken'
import { ResponseCode, ResponseMessage } from './server/enums/response.js'

const server = jsonServer.create()

const router = jsonServer.router('./db.json')

const userDb = JSON.parse(fs.readFileSync('./server/db/users.json'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'
const expiresIn = '1h'

//create a token from a payload
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

//verify the token
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

//check if the user exists in db
function isAuthenticated({email, password}) {
    return userDb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

server.post('/auth/login', (req, res) => {
    
    const {email, password} = req.body
    if( isAuthenticated({email, password}) === false) {
        const status = ResponseCode.UnAuthorized
        const code = ResponseCode.UnAuthorized
        const message = ResponseMessage.UnAuthorized
        res.json({code, message})
        return
    }
    const access_token = createToken({email, password})
    const code = ResponseCode.Ok
    res.status(200).json({code, access_token})
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if(req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = ResponseCode.UnAuthorized
        const code = ResponseCode.BadAuthorizationHeader
        const message = ResponseMessage.BadAuthorizationHeader
        res.status(status).json({code, message})
        return
    }
    try {
        verifyToken(req.headers.authorization.split(' ')[1])
        next()
    } catch(err) {
        const status = ResponseCode.UnAuthorized
        const code = ResponseCode.AccessTokenNotValid
        const message = ResponseMessage.AccessTokenNotValid
        res.status(status).json({code, message})
    }
})

server.use(router)

server.listen(3000, () => {
    console.log('Run Auth API Server')
})

server.use('/api', router)