"use server"

import { cookies } from "next/headers"
import axios from "axios"

export const getProfile = async () => {
    try {
        const cookieStore = await cookies()
        console.log("ID COOKIE: ", cookieStore.get("id"))
        const id_cookie: any = cookieStore.get('id')

        if (id_cookie) {
            const res: any = await axios.get(`https://jira-backend-six.vercel.app/api/profile`, {
                headers: {
                    Cookie: `${id_cookie.name}=${id_cookie.value}`
                }
            })
            // console.log(res)

            if (res && res.status == 200) {
                return {
                    status: true,
                    profile: res.data
                }
            }
            else {
                console.log("REQUEST FAILED!")
            }
        }
        return {
            status: false,
            profile: null
        }
    }
    catch (err) {
        console.error(err)
    }
}

export const getTeams = async () => {
    try {
        const res: any = await axios.get('https://jira-backend-six.vercel.app/api/teams')
        if (res && res.status == 200) {
            return res.data.teams
        }
        else {
            return null
        }
    }
    catch (err) {
        console.error(err)
    }
}

export const getTeam = async (teamId: string) => {
    try {
        const cookieStore = await cookies()
        console.log("ID COOKIE: ", cookieStore.get("id"))
        const id_cookie: any = cookieStore.get('id')

        if (id_cookie) {
            const res: any = await axios.get(`https://jira-backend-six.vercel.app/api/team/${teamId}`, {
                headers: {
                    Cookie: `${id_cookie.name}=${id_cookie.value}`
                }
            })
            // console.log(res)

            if (res && res.status == 200) {
                return res.data
            }
            else {
                console.log("REQUEST FAILED!")
            }
        }
        return null
    }
    catch (err) {
        console.error(err)
    }
}