import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const SECRET = process.env.JWT_SECRET || 'dev-secret-min-32-chars-long-key-marinho'
export function signToken(payload:any){ return jwt.sign(payload, SECRET, {expiresIn:'7d'}) }
export function verifyToken(token:string){ try{ return jwt.verify(token, SECRET) as any } catch{ return null } }
export async function hashPassword(p:string){ return bcrypt.hash(p,10) }
export async function comparePassword(p:string, h:string){ return bcrypt.compare(p,h) }
