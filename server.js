import fs from 'fs'
import jsonServer from 'json-server'
import bodyParser from 'body-parser'

import jwt from 'jsonwebtoken'

import Email from 'email-templates'

import { ResponseCode, ResponseMessage } from './server/enums/response.js'
import helper from './server/helper.js'

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

server.get('/friends', (req, res) => {
    const { userid } = req.query
    const friendIds =  router.db.get('friends').map(friend => {
        if(friend.userid === parseInt(userid)) {
            return friend.friendid
        }
    })
    let friends = userDb.users.filter(user => friendIds.includes(user.id) == true)
    friends = friends?.map(friend => {
        return {
            fullname: friend.name,
            userid: friend.id
        }
    })
    res.json(friends)
})

server.get('/unfriends', (req, res) => {
    const { userid, nameSearch } = req.query
    const friendIds = router.db.get('friends').map(friend => {
        if(friend.userid === parseInt(userid)) {
            return friend.friendid
        }
    })
    let unfriends = null
    if(nameSearch) {
        unfriends = userDb.users.filter(user => friendIds.includes(user.id) == false && 
                                    helper().formatUnsigned(user.name).toLowerCase().includes( helper().formatUnsigned(nameSearch).toLowerCase()))
    } else {
        unfriends = userDb.users.filter(user => friendIds.includes(user.id) == false)
    }
    unfriends = unfriends?.map(unfriend => {
        return {
            fullname: unfriend.name,
            userid: unfriend.id
        }
    })
    res.json(unfriends)
})

server.get('/customers', (req, res) => {
    
    const { userid } = req.query

    const customers = router.db.get('customers').map(customer => {
        if(customer.userid === parseInt(userid)) {
            return {
                fullname: customer.fullname,
                userid: customer.id
            }
        }
    })
    res.json(customers)
})

server.put('/friends', (req, res) => {
    const { userid } = req.query
    const { friendid } = req.body
    let dbFriends = router.db.get('friends')
    const indexFriend = dbFriends.findIndex(friend => friend.userid === parseInt(userid) && friend.friendid === parseInt(friendid))
    if(indexFriend > -1) {
        let valueFriends = dbFriends.value()
        valueFriends.splice(indexFriend, 1)
        router.db.set('friends', valueFriends).write();
    } else {
        dbFriends.push({userid: parseInt(userid), friendid}).write()
    }
    res.json({userid: parseInt(userid), friendid})
})

server.post('/customers', (req, res) => {
    
    const customers = router.db.get('customers')
    const lastCustomer = customers.value().slice(-1)[0]
    const lastIdCustomer = lastCustomer ? parseInt(lastCustomer.id.slice(1)) : 0
    const newIdCustomer = `C${lastIdCustomer + 1}`

    const newCustomer = { ...req.body, id: newIdCustomer }
    customers.push(newCustomer).write()

    res.json(newCustomer)
})

server.post('/bookings', (req, res) => {

    const bookings = router.db.get('bookings')
    const lastBooking = bookings.value().slice(-1)[0]
    const lastIdBooking = lastBooking ? lastBooking.id : 0
    let newIdBooking = lastIdBooking + 1

    const lstBooking = Object.values(req.body)

    const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: '2-digit', minute: '2-digit' }
    const nowDate = (new Date()).toLocaleDateString("en-US", options)

    lstBooking?.forEach(element => {
        const newBooking = { ...element, id: newIdBooking, createddate: nowDate }
        bookings.push(newBooking).write()
        newIdBooking ++
    });

    res.json(lstBooking)

})

server.use(router)

server.listen(3000, () => {
    console.log('Run Auth API Server')
})

server.use('/api', router)