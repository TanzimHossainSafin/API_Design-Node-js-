import {body,param,query,validationResult} from 'express-validator';

export const signupMiddleware = [
    body("username").isString().exists(),
    body("email").isString().exists(),
    body("password").isString().exists()
];
export const loginMiddleware = [
    body("email").isString().exists(),
    body("password").isString().exists()
];
export const getuserMiddleware=[
    query("email").isString().exists(),
];
export const deleteMiddleware=[
    query("email").isString().exists(),
];

// error handeling
export const errorhandel=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}
