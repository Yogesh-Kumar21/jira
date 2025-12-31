'use client'

import { useState } from "react"
import { Users } from "lucide-react"
import axios from "axios"
import { teamJoin } from "@/utilities/client_utils"
import { Spinner } from "@chakra-ui/react"

export default function TeamCard({ t, userId }: any) {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const f = t.members.find((t: any) => t.memberId._id == userId)

    const handleJoinTeam = async (teamId: string) => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch("/api/team/join", {
                method: "POST",
                credentials: "include", // important to include cookies
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ teamId: teamId })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                return;
            }

            alert('Team Joined successfully')
            window.location.reload()
        }
        catch (err: any) {
            console.error(err)
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="flex p-4 items-center rounded-md shadow-sm border border-gray-200"
            onClick={async () => {
                await handleJoinTeam(t._id)
            }}
        >
            <img src={t.logo} alt="" width={50} height={50} className="rounded-full border border-gray-200" />
            <span className="text-black text-md ml-4">{t.name}</span>
            <div className="flex flex-col w-fit gap-2 ml-auto">
                <div className="flex items-center gap-6 w-fit">
                    <div className="flex items-center gap-1">
                        <Users size={16} color="black" />
                        <span className="text-black text-base">{t.members.length}</span>
                    </div>
                    <span className="text-gray-600 text-sm">Created on: {new Date(t.createdAt).toDateString()}</span>
                </div>
                {!f &&
                    <button
                        disabled={loading}
                        onClick={
                            async () => {
                                await handleJoinTeam(t._id)
                            }
                        } className="flex justify-center items-center text-blue-600 bg-blue-50 border border-blue-600 text-base">
                        {
                            loading ? "Joining team..." : "Join Team"
                        }
                    </button>}
            </div>
        </div>
    )
}