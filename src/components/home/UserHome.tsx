import { getTeams } from "@/utilities/utils";
import { Play, ArrowRight, Plus, Users } from "lucide-react";
import CreateTeam from "../team/CreateTeam";
import Image from "next/image";
import TeamCard from "../team/TeamCard";

function UserHero({ username, userId }: { username: string, userId: string }) {
    return (
        <section
            className="flex flex-col bg-slate-50 p-4 items-center overflow-hidden lg:px-36 px-4"
        >
            <div className="flex w-full py-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-black text-2xl sm:text-xl lg:text-2xl leading-tight">
                                Welcome, {username}!
                            </h1>
                            {/* <p className="text-xl text-muted-foreground max-w-xl">
                                Discover skilled professionals, showcase your work, and find the perfect services for your projects. Join thousands of successful collaborations.
                            </p> */}
                        </div>
                    </div>
                </div>
                <div className="flex w-fit ml-auto gap-4">
                    <CreateTeam userId={userId} />
                </div>
            </div>
        </section>
    );
};

async function TeamList({userId} : any) {
    const teams: any = await getTeams()
    console.log("teams: ", teams)

    return (
        <div className="flex flex-col gap-4 lg:px-36 px-4">
            <span className="text-black text-md font-semibold">Join a team</span>
            {
                teams && teams.length > 0 ? (
                    <div className="flex flex-col">
                        {teams.map((t: any) => <TeamCard t={t} userId={userId} />)}
                    </div>
                ) : (
                    <span className="p-2 bg-gray-50 text-base text-gray-600">
                        No active teams found...
                    </span>
                )
            }
        </div>
    )
}

export default async function UserHome({ user }: any) {
    const profile = user.data

    return (
        <div className="flex flex-col gap-8">
            <UserHero username={profile.name} userId={profile._id} />
            <TeamList userId={profile._id} />
        </div>
    )
}