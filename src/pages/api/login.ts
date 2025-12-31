"use server"

import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    const { email, password } = req.body
    try {
        const data:any = await axios.post('https://jira-backend-knkxrdn1e-yogesh-kumar21s-projects.vercel.app/auth/login', {
          email: email,
          password: password
        })
        
        console.log("node headers: ", data.headers['set-cookie'])
        res.setHeader('set-cookie', data.headers['set-cookie'])
        console.log("response: ", data.data)
        // res.status(200).json({data: data})
        res.status(200).json({data: data.data})
    }
    catch (error: any) {
        console.log(error.response)
        res.status(error.response.status).json({message: error.response.data.message})
    }
}