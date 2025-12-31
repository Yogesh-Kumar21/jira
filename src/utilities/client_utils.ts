import axios from "axios";

export async function login(email: string, password: string) {
    try {
        const res = await axios.post(
            "https://jira-backend-six.vercel.app/auth/login",
            {
                email,
                password,
            },
            {
                withCredentials: true,
            }
        )

        return res
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed")
    }
}

export async function createTeam(name: string, logo: string) {
    try {
        const data:any = await axios.post('https://jira-backend-six.vercel.app/api/team/create', {
            name: name,
            logo: logo
        }, {
            withCredentials: true
        })
        return data
    }
    catch (error: any) {
        console.log(error.response)
        throw new Error(error.response?.data?.message || "Team Creation failed")
    }
}

export async function createTicket(name: string, description: string, assigner: string, priority: string) {
    try {        
        const data:any = await axios.post('https://jira-backend-six.vercel.app/api/ticket/create', {
            name: name,
            description: description,
            assigned_by: assigner,
            priority: priority
        }, {
            withCredentials: true
        })
        return data
    }
    catch (error: any) {
        console.log(error.response)
        throw new Error(error.response?.data?.message || "Ticket Creation failed")
    }
}

export async function teamJoin(teamId: string) {
    try {
        const data:any = await axios.post('https://jira-backend-six.vercel.app/api/team/join', {
            teamId: teamId
        }, {
            withCredentials: true
        })
        return data
    }
    catch (error: any) {
        console.log(error.response)
        throw new Error(error.response?.data?.message || "Team Join failed")
    }
}