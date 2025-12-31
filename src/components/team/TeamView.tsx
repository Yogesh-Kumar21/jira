import { getTeam } from "@/utilities/utils"
import Image from "next/image"
import { LogOut, Smile } from "lucide-react" // Removed unused icons for cleanliness
import CreateTicket from "./CreateTicket"

export default async function TeamView({ teamId, userId }: { teamId: string, userId: string }) {
    const data = await getTeam(teamId)
    const teamData = data?.data

    if (!teamData) return <div className="p-10 text-center font-sans">Team not found.</div>

    // Helper to format the date (e.g., "Jan 12")
    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A"
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })
    }

    const getPriorityIcon = (priority: string) => {
        const styles: any = {
            high: "text-red-600 font-bold",
            medium: "text-orange-500 font-bold",
            low: "text-blue-500 font-bold",
        }
        return <span className={`${styles[priority] || "text-gray-400"} text-base uppercase`}>{priority}</span>
    }

    return (
        <div className="flex flex-col w-full h-full bg-[#FFFFFF] font-sans lg:px-36 px-4 py-4">
            {/* --- Top Navigation / Breadcrumbs --- */}
            <div className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                        <Image
                            alt="Logo"
                            src={teamData.logo || "/placeholder.png"}
                            fill
                            className="rounded-md object-cover border-2 border-gray-200"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Teams / {teamData.name}</span>
                        <h1 className="text-xl font-semibold text-[#172B4D]">{teamData.name} Board</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded text-gray-600 transition-colors">
                        <LogOut size={18} />
                    </button>
                    <CreateTicket userId={userId} />
                </div>
            </div>

            {/* --- Tickets Section --- */}
            <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-4 border-b border-[#0052CC] pb-2">
                        <span className="text-base font-semibold text-[#0052CC] cursor-pointer">All Tickets</span>
                    </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 px-3 py-2 text-xs font-bold text-gray-500 uppercase border-b border-gray-200 bg-gray-50/50">
                    <div className="col-span-6 md:col-span-7">Summary</div>
                    <div className="col-span-3 md:col-span-2">Assignee</div>
                    <div className="col-span-2 md:col-span-2">Priority</div>
                    <div className="col-span-1 text-right">Created on</div>
                </div>

                {/* Tickets List */}
                <div className="flex flex-col">
                    {teamData.tickets?.map((ticket: any) => (
                        <div
                            key={ticket._id}
                            className="grid grid-cols-12 items-center px-3 py-3 border-b border-gray-100 hover:bg-[#F4F5F7] cursor-pointer transition-colors group"
                        >
                            {/* Summary Column */}
                            <div className="col-span-6 md:col-span-7 flex items-center gap-3">
                                <span className="text-blue-600 text-sm font-medium hover:underline shrink-0">
                                    TIC-{ticket._id.slice(-3).toUpperCase()}
                                </span>
                                <span className="text-base text-[#172B4D] font-medium truncate">
                                    {ticket.name}
                                </span>
                            </div>

                            {/* Assignee Column */}
                            <div className="col-span-3 md:col-span-2 flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] text-white font-bold">
                                    {ticket.assigned_by?.name?.charAt(0) || "U"}
                                </div>
                                <span className="text-base text-gray-600 hidden md:block">
                                    {ticket.assigned_by?.name || "Unassigned"}
                                </span>
                            </div>

                            {/* Priority Column */}
                            <div className="col-span-2 md:col-span-2 flex items-center">
                                {getPriorityIcon(ticket.priority)}
                            </div>

                            {/* Created At Column (Replaced the Action Menu) */}
                            <div className="col-span-1 text-right text-base text-gray-500 font-medium whitespace-nowrap">
                                {formatDate(ticket.createdAt)}
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {teamData.tickets?.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                            <Smile size={28} className="text-gray-400" />
                            <p className="text-base">No issues found for this team.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}