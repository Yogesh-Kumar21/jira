'use client'

import { Dialog, Portal, Button, CloseButton, RadioGroup, HStack } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { useState } from "react"
import Spinner from "../utils/Spinner"
import axios from "axios"

export default function CreateTicket({ userId }: any) {

    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [assigner, setAssigner] = useState<string>("")
    const [priority, setPriority] = useState<string>("medium")

    const ps = [
        'low',
        'medium',
        'high'
    ]

    const handleSubmit = async () => {

        console.log({
            name,
            description,
            userId,
            priority
        })

        if (name == "" || userId == "" || priority == "") {
            setError("Please fill out all fields")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const res: any = await axios.post('http://localhost:3000/api/createticket', {
                name: name,
                description: description,
                assigner: userId,
                priority
            })
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
        <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger asChild>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-[#0052CC] text-white rounded font-medium text-base hover:bg-[#0747A6] transition-all"
                    onClick={() => setOpen(true)}
                >
                    <Plus size={18} />
                    Create
                </button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content className="bg-white text-black">
                        <Dialog.Header>
                            <Dialog.Title className="text-xl">Create a ticket</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-base">Ticket Name</span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e: any) => setName(e.target.value)}
                                        className="bg-gray-50 text-gray-800 border border-gray-200 px-2 py-1 text-base"
                                        placeholder=""
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-base">Description</span>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e: any) => setDescription(e.target.value)}
                                        className="bg-gray-50 text-gray-800 border border-gray-200 px-2 py-1 text-base"
                                        placeholder=""
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-base">Priority</span>
                                    <RadioGroup.Root value={priority} onValueChange={(e: any) => setPriority(e.value)}>
                                        <HStack gap="6">
                                            {ps.map((p: any) => (
                                                <RadioGroup.Item key={p} value={p}>
                                                    <RadioGroup.ItemHiddenInput/>
                                                    <RadioGroup.ItemIndicator className="border-2 border-gray-400"/>
                                                    <RadioGroup.ItemText>{p}</RadioGroup.ItemText>
                                                </RadioGroup.Item>
                                            ))}
                                        </HStack>
                                    </RadioGroup.Root>
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
                            >
                                {
                                    loading ? <Spinner /> : "Create Ticket"
                                }
                            </Button>
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