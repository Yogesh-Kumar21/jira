"use server"

import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Hero from '@/components/home/Hero'
import { getProfile } from '@/utilities/utils'
import UserHome from '@/components/home/UserHome'
import TeamView from '@/components/team/TeamView'

export default async function Home() {

    const profile: any = await getProfile()
    console.log("profile: ", profile)

    if (profile && profile.status == true) {
        const d = profile.profile.data

        if (d.team) {
            return (
                <div className='flex flex-1 w-full h-screen flex-col'>
                    <div className="sticky top-0 z-50"> {/* Sticky Navbar */}
                        <Navbar isLoggedIn={true} user={profile.profile} />
                    </div>
                    <div className='flex flex-col h-full'>
                        <TeamView teamId={d.team} userId={d._id} />
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='flex flex-1 w-full h-screen flex-col'>
                    <div className="sticky top-0 z-50"> {/* Sticky Navbar */}
                        <Navbar isLoggedIn={true} user={profile.profile} />
                    </div>
                    <div className='flex flex-col h-full'>
                        <UserHome user={profile.profile} />
                    </div>
                </div>
            )
        }
    }
    else {
        return (
            <div className='flex flex-1 w-full h-screen flex-col'>
                <div className="sticky top-0 z-50"> {/* Sticky Navbar */}
                    <Navbar isLoggedIn={false} />
                </div>
                <div className='flex flex-col h-full bg-blue-100 items-center justify-center'>
                    <Hero />
                </div>
            </div>
        )
    }
}