'use client'

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { BoldIcon, ChevronDownIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


const FontFamilyButton = () => {
    const {editor} = useEditorStore();
    const fonts = [
        {label: "Arial", value: "Arial"},
        {label: "Times New Roman", value: "Times New Roman"},
        {label: "Courier New", value: "Courier New"},
        {label: "Verdana", value: "Verdana"}
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").FontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
        </DropdownMenu>
    )
}

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
}: ToolbarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
                isActive && 'bg-neutral-200/80'
            )}
        >
            <Icon className="size-4"/>
        </button>
    )
}

export const Toolbar = ( ) => {
    const {editor} = useEditorStore();
    console.log('toolbar editor',{editor})
    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
        [
            {
            label: "Undo",
            icon: Undo2Icon,
            onClick: () => editor?.chain().focus().undo().run(),
            },
            {
            label: "Redo",
            icon: Redo2Icon,
            onClick: () => editor?.chain().focus().redo().run(),
            },
            {
            label: "Print",
            icon: PrinterIcon,
            onClick: () => window.print(),
            },
            {
            label: "Spell Check",
            icon: SpellCheckIcon,
            onClick: () => {
                const current = editor?.view.dom.getAttribute('spellcheck')
                editor?.view.dom.setAttribute('spellcheck', current === 'false' ? 'true' : 'false' )
            }
            }
        ],
        [
            {
                label: "Bold",
                icon: BoldIcon,
                isActive: editor?.isActive('bold'),
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: "italic",
                icon: ItalicIcon,
                isActive: editor?.isActive('italic'),
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: "Underline",
                icon: UnderlineIcon,
                isActive: editor?.isActive('underline'),
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
            },
        ],
        [
            {
                label: "Comment",
                icon: MessageSquarePlusIcon,
                isActive: false, //enable functionality
                onClick: () => console.log("TODO: COOmMENT"),
            },
            {
                label: "List Todo",
                icon: ListTodoIcon,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive('taskList'),
            },
            {
                label: "Remove Formatting",
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            },
        ]
    ]

    return (
        <div className="bg-[#f1d4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item}/>
            ))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {/* {TODO Font family} */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {/* {TODO Heading} */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {/* {TODO Font size} */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {sections[1].map((item) => (
                <ToolbarButton key={item.label} {...item}/>
            ))}
            {/* TODO TEXT COLOR */}
            {/* TODO HIGHLIGHT COLOR */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {/* TODO LINK */}
            {/* TODO IMAGE */}
            {/* TODO ALIGN */}
            {/* TODO LINE HEIGHT */}
            {/* TODO LIST */}
            {sections[2].map((item) => (
                <ToolbarButton key={item.label} {...item}/>
            ))}
        </div>
    )
}