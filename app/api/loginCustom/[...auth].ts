// pages/api/auth/[...auth].ts
import { NextApiRequest, NextApiResponse } from 'next'
import { getPayload } from 'payload'
import jwt from 'jsonwebtoken'
import configPromise from "@payload-config";

if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET is not set in environment variables');
}

const SECRET_KEY: string = process.env.PAYLOAD_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const payload = await getPayload({
    config: configPromise,
  });

  const { auth } = req.query;

  if (Array.isArray(auth)) {
    const [action] = auth;

    switch (req.method) {
      case 'POST':
        if (action === 'login') {
          return handleLogin(req, res, payload)
        } else if (action === 'register') {
          return handleRegister(req, res, payload)
        }
        break
      case 'GET':
        if (action === 'verify') {
          return handleVerify(req, res)
        }
        break
    }
  }

  res.setHeader('Allow', ['POST', 'GET'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}

async function handleLogin(req: NextApiRequest, res: NextApiResponse, payload: any) {
  const { email, password } = req.body

  try {
    const user = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    const token = generateToken(user)

    res.status(200).json({ user, token })
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' })
  }
}

async function handleRegister(req: NextApiRequest, res: NextApiResponse, payload: any) {
  const { email, password } = req.body

  try {
    const user = await payload.create({
      collection: 'users',
      data: { email, password },
    })

    const token = generateToken(user)

    res.status(201).json({ user, token })
  } catch (error) {
    res.status(400).json({ message: 'Registration failed' })
  }
}

function handleVerify(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    res.status(200).json({ user: decoded })
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

function generateToken(user: any) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1d' })
}