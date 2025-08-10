import fs from 'fs'
import jwt from 'jsonwebtoken'

const licenseKey = 'SPGqPIcVnsOEJQ'
const privateKey = fs.readFileSync('SPGqPIcVnsOEJQ-private-key.pem')

const issued = new Date()
let expires = new Date()
expires.setMinutes(issued.getMinutes() + 540);

const payload = {
  iat: Math.floor(issued.getTime() / 1000),
  exp: Math.floor(expires.getTime() / 1000),
  aud: 'https://cobrowse.io',
  iss: licenseKey,
  sub: 'andy.jones@cobrowse.io',
  displayName: 'Andy Jones (Support Agent)',
}

const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' })
console.log(token)
