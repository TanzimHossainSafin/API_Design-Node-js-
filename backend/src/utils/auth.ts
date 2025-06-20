import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//worted some repeated topics 

//compare password's hash
export const comparePasswords = (password, hash) => {
  return  bcrypt.compare(password, hash)
}

//hashed the actual password
export const hashPassword = (password) => {
  return  bcrypt.hash(password, 5)
}

//create jwt
export const createJWT = (user) => {
  const token =  jwt.sign({
      id: user.id,
      username: user.username
    }, 
    process.env.JWT_SECRET
  )
  return token
}

//protect route
export const protect =  (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401)
    res.json({message: 'not authorized'})
    return
  }

  const [, token] = bearer.split(' ')

  if (!token) {
    res.status(401)
    res.json({message: 'not valid token or not authorized'})
    return
  }

  try {
    const user =  jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (e) {
    console.error(e)
    res.status(401)
    res.json({message: 'not valid token'})
    return
  }
}