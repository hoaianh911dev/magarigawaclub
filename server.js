
import fs from 'fs'
import jsonServer from 'json-server'
import bodyParser from 'body-parser'

import jwt from 'jsonwebtoken'

import Email from 'email-templates'

import { ResponseCode, ResponseMessage } from './server/enums/response.js'

const server = jsonServer.create()

const router = jsonServer.router('./server/db/db.json')
const fileName = './server/db/users.json'
const userDb = JSON.parse(fs.readFileSync(fileName))

const email = new Email({
    message: {
        from: 'hoaianhnek@gmail.com'
    },
    send: true,
    transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        ssl: false,
        tls: true,
        auth: {
            user: '7dbe18c1494488',
            pass: '64cd7410e99a70'
        }
    }
})

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
function getUserByEmailPassword({email, password}) {
    return userDb.users.find(user => user.email === email && user.password === password)
}

server.post('/auth/login', (req, res) => {
    
    const {email, password} = req.body
    const user = getUserByEmailPassword({email, password})
    if(!user) {
        const status = ResponseCode.UnAuthorized
        const code = ResponseCode.UnAuthorized
        const message = ResponseMessage.UnAuthorized
        res.json({code, message})
        return
    }
    const access_token = createToken({email, password})
    const code = ResponseCode.Ok
    const id = user.id
    res.status(200).json({code, access_token, id})
})

server.get('/auth/checkEmailExist', (req, res) => {
    const { email } = req.query
    const user = userDb.users.find(user => user.email === email)
    if(!user) {
        const code = ResponseCode.NoContent
        const message = ResponseMessage.NoContent
        res.json({code, message})
    } else {
        const id = user.id
        const code = ResponseCode.Ok
        res.json({code, id})
    }
})

server.post('/auth/sendmail', (req, res) => {
    const { id } = req.body
    const url = req.headers.origin + "/reset-password/" + id 
    email.send({
        template: 'updatepassword',
        message: {
            to: 'test@example.com'
        },
        locals: { url }
    }).then(() => {
        next()
    }).catch(console.error)
})

server.put('/auth/updatePassword', (req, res) => {
    const { id, password} = req.body
    const lstUser = userDb.users.map(u => {
        if(u.id === parseInt(id)) u.password = password
        return u
    })
    fs.writeFile(fileName, JSON.stringify({users: lstUser }), (err) => {
        if (err) return console.log(err)
        console.log(lstUser)
        const code = ResponseCode.Ok
        res.json({code})
    })
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