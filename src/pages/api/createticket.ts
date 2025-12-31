"use server"

import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    try {
        const { name, description, assigner, priority } = req.body

        const cookie = req.cookies['id']
        
        const data:any = await axios.post('http://localhost:5000/api/ticket/create', {
            name: name,
            description: description,
            assigned_by: assigner,
            priority: priority
        }, {
            headers: {
                Cookie: `id=${cookie}`
            }
        })
        console.log("[DATA]: ", data)
        if (data && data.status == 201) {
            // console.log("data: ", data)
            res.status(200).json(data.data)
        }
        else {
            res.status(401).json({
                message: "Not Authorized"
            })
        }
    }
    catch (error: any) {
        console.log(error.response)
        res.status(error.response.status).json({message: error.response.data.message})
    }
}