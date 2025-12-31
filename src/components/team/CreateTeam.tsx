'use client'

import { Dialog, Portal, Button, CloseButton } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { useState } from "react"
import Spinner from "../utils/Spinner"
import axios from "axios"

export default function CreateTeam({ userId }: any) {

    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const [name, setName] = useState<string>("")
    const [logo, setLogo] = useState<string>("")

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            // This event fires when the file is successfully read
            reader.onloadend = () => {
                // This is your string to store in the DB
                const base64String = reader.result;
                setLogo(base64String as string);
                console.log("String ready for DB:", base64String);
            };

            reader.readAsDataURL(file); // Converts image to base64 string
        }
    };

    const handleSubmit = async () => {
        console.log("name: ", name)
        console.log("logo: ", logo)

        if (name=="" || logo=="") {
            setError("Please fill out both fields")
            return
        }
        
        setLoading(true)
        setError(null)

        try {
            const res: any = await axios.post('https://jira-mauve.vercel.app/api/createteam', {
                name: name,
                logo: logo
            })
            if (res && res.status == 200) {
                alert('Team Created successfully')
                window.location.reload()
            }
            else {
                setError("Some error occured while creating team. Please try again")
            }
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
        <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger asChild>
                <button
                    className="flex items-center gap-2 text-gray-600 bg-white text-base border px-4 py-2 rounded-md"
                    onClick={() => setOpen(true)}
                >
                    <Plus size={18} />
                    <span>Create a team</span>
                </button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content className="bg-white text-black">
                        <Dialog.Header>
                            <Dialog.Title className="text-xl">Create a team</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-base">Team Logo</span>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/webp"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-base">Team Name</span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e: any) => setName(e.target.value)}
                                        className="bg-gray-50 text-gray-800 border border-gray-200 px-2 py-1 text-base"
                                        placeholder="Atlassian"
                                    />
                                </div>

                                {
                                    error && <span className="text-sm text-red-600">{error}</span>
                                }
                            </div>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                className="bg-blue-700 text-white px-2"
                                onClick={handleSubmit}
                            >Create Team</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}