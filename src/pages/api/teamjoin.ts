"use server"

import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    try {
        const { teamId } = req.body

        const cookie = req.cookies['id']
        
        const data:any = await axios.post('http://localhost:5000/api/team/join', {
            teamId: teamId
        }, {
            headers: {
                Cookie: `id=${cookie}`
            }
        })
        console.log("[DATA]: ", data)
        if (data && data.status == 200) {
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