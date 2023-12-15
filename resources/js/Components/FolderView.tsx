import { ReformattedDoc, cn } from "@/lib/utils";
import {
    ChevronRight,
    Clipboard,
    Copy,
    File,
    Folder,
    PenBox,
    Plus,
    Trash,
} from "lucide-react";
import { useCopy, useFolderModalStore } from "@/lib/store";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { NewDocIcon, NewFolderIcon } from "./Svgs";
import useDocument from "@/hooks/useDocument";
import { router } from "@inertiajs/react";
import { useLocalStorage } from "usehooks-ts";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/Components/ui/context-menu";
import { toast } from "./ui/use-toast";

type Props = {
    documents: ReformattedDoc[];
    level?: number;
};
const FolderView = ({ documents = [], level = 0 }: Props) => {
    return (
        <ul className="flex flex-col ">
            {documents.map((tree) => (
                <TreeNode key={tree.id} node={tree} level={level} />
            ))}
        </ul>
    );
};

const TreeNode = ({ node, level }: { node: ReformattedDoc; level: number }) => {
    const [childVisible, setChildVisiblity] = useLocalStorage(
        `node-${node.id}`,
        false
    );
    const hasChild = node.isFolder ? true : false;
    const { openModal, updateData } = useFolderModalStore();
    const handleRecOpen = (isFolder: boolean, document_id: number) => {
        openModal();
        updateData(isFolder, document_id);
    };
    const { deleteDocument } = useDocument();
    const handleItemClick = (isFolder: boolean) => {
        if (isFolder) {
            setChildVisiblity((v: boolean) => !v);
            return;
        }
        router.visit(`/dashboard/${node.id}`);
    };
    const { createNewDocument } = useDocument();
    const { onCopy, copyDoc } = useCopy();
    const handlePaste = (doc: ReformattedDoc) => {
        if (!copyDoc) {
            toast({
                title: "Copy a document before pasting!",
                duration: 800,
                variant: "destructive",
            });
            return;
        }
        createNewDocument({
            title: copyDoc.title,
            content: copyDoc.content,
            document_id: doc.id,
        });
        onCopy(null);
    };

    return (
        <div className="border-0" style={{ paddingLeft: `${12 * level}px` }}>
            <ContextMenu>
                <ContextMenuTrigger
                    className="flex items-center px-2 py-1 rounded hover:bg-slate-200 group/item relative"
                    onClick={() => handleItemClick(node.isFolder)}
                >
                    {hasChild && (
                        <div
                            className={cn(
                                "transition-transform",
                                childVisible ? " rotate-90" : "rotate-0 "
                            )}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </div>
                    )}

                    <div className="flex items-center flex-1 select-none">
                        {node.isFolder ? (
                            <Folder className="h-5 w-5 mr-2" />
                        ) : (
                            <File
                                className={cn(
                                    "h-5 w-5 mr-2 ml-5",
                                    level > 0 && "ml-0"
                                )}
                            />
                        )}
                        {node.title}
                    </div>
                    <div className="flex gap-2">
                        {node.isFolder ? (
                            <Tooltip>
                                <TooltipTrigger role="button">
                                    <Plus className="h-6 w-6 opacity-0 group-hover/item:opacity-100 text-muted-foreground hover:bg-slate-300 transition-colors p-1 absolute right-2 top-1 rounded" />
                                </TooltipTrigger>
                                <TooltipContent className="flex flex-col gap-1">
                                    <li
                                        role="button"
                                        className="hover:bg-slate-200 p-1 rounded flex items-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteDocument({
                                                id: node.id,
                                                is_folder: node.isFolder
                                                    ? 1
                                                    : 0,
                                            });
                                        }}
                                    >
                                        <Trash className="h-4 w-4 opacity-0 group-hover/item:opacity-100 mr-2" />
                                        Delete
                                    </li>
                                    <li
                                        role="button"
                                        className="hover:bg-slate-200 p-1 rounded flex items-center"
                                        onClick={() => {
                                            // console.log(node.id);
                                            handleRecOpen(true, node.id);
                                        }}
                                    >
                                        <NewFolderIcon className="h-5 w-5 mr-2" />
                                        Add new folder
                                    </li>
                                    <li
                                        role="button"
                                        className="hover:bg-slate-200 p-1 rounded flex items-center"
                                        onClick={() => {
                                            // console.log(node.id);
                                            handleRecOpen(false, node.id);
                                        }}
                                    >
                                        <NewDocIcon className="h-5 w-5 text-muted-foreground mr-2" />
                                        Add new document
                                    </li>
                                </TooltipContent>
                            </Tooltip>
                        ) : null}
                        <ContextMenuContent>
                            {node.isFolder ? (
                                <>
                                    <ContextMenuItem
                                        role="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePaste(node);
                                        }}
                                    >
                                        Paste{" "}
                                        <Clipboard className="h-6 w-6 text-muted-foreground transition-colors p-1 absolute right-2 top-1" />
                                    </ContextMenuItem>
                                </>
                            ) : (
                                <>
                                    <ContextMenuItem
                                        role="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onCopy(node);
                                            toast({
                                                title: "Document copied.",
                                                description:
                                                    "You can paste it inside of any folder.",
                                                duration: 800,
                                            });
                                        }}
                                    >
                                        Copy{" "}
                                        <Copy className="h-6 w-6 text-muted-foreground transition-colors p-1 absolute right-2 top-1" />
                                    </ContextMenuItem>
                                </>
                            )}
                            <ContextMenuItem
                                role="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteDocument({
                                        id: node.id,
                                        is_folder: node.isFolder ? 1 : 0,
                                    });
                                }}
                                className="text-red-400 "
                            >
                                Delete{" "}
                                <Trash className="h-6 w-6 text-muted-foreground transition-colors p-1 absolute right-2 top-1 text-red-300 " />
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </div>
                </ContextMenuTrigger>
            </ContextMenu>

            {hasChild && childVisible && (
                <ul>
                    <FolderView documents={node.items} level={level + 1} />
                </ul>
            )}
        </div>
    );
};

export default FolderView;
