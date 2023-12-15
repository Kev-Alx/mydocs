import React, { useRef, useState, useEffect } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useDebounce } from "usehooks-ts";
import useDocument from "@/hooks/useDocument";
import { MDoc } from "@/lib/store";
import { User } from "@/types";
import { Button } from "./ui/button";
import { CheckCircle2, Save, XCircle } from "lucide-react";
type Props = {
    editable?: boolean;
    document: MDoc | null;
    user: User;
};

const Editor = ({ editable, document, user }: Props) => {
    const _titleRef = useRef<HTMLTextAreaElement>(null);
    const [title, setTitle] = useState(
        document ? (document as MDoc).title : undefined
    );
    const [content, setContent] = useState(
        document ? (document as MDoc).content : undefined
    );
    const debouncedTitle = useDebounce(title, user.autosave_interval);
    const debouncedContent = useDebounce(content, user.autosave_interval);
    const { updateDocument } = useDocument();

    useEffect(() => {
        if (!user.is_autosave || document == null) {
            return;
        }
        const shouldUpdate =
            debouncedTitle !== document.title ||
            debouncedContent !== document.content;

        if (shouldUpdate) {
            updateDocument({
                id: document?.id,
                content: debouncedContent,
                title: debouncedTitle,
                is_folder: !!document?.is_folder,
                is_published: !!document?.is_published,
            });
        }
    }, [debouncedTitle, debouncedContent, document]);

    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent: content
            ? (JSON.parse(content) as PartialBlock[])
            : undefined,
        onEditorContentChange: (editor) => {
            setContent(JSON.stringify(editor.topLevelBlocks, null, 2));
        },
    });
    return (
        <div className="min-h-full pt-16 w-full">
            <ReactTextareaAutosize
                ref={(e) => {
                    // @ts-ignore
                    _titleRef.current = e;
                }}
                placeholder="Untitled"
                className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold border-l-0 border-r-0 border-t-0 border-b border-slate-200 outline-none text-slate-950 pt-8 pl-12"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <BlockNoteView
                className="bg-white"
                editor={editor}
                theme={"light"}
            />
            <p className="absolute bottom-20 right-8 text-xs font-semibold">
                {document?.is_published ? "Published" : "Not published"}
                {document?.is_published ? (
                    <CheckCircle2 className="inline ml-2" size={16} />
                ) : (
                    <XCircle className="inline ml-2" size={16} />
                )}
            </p>
            {!user.is_autosave && (
                <Button
                    variant={"secondary"}
                    className="absolute bottom-8 right-8"
                    onClick={() => {
                        updateDocument({
                            id: document?.id,
                            content: content,
                            title: title,
                            is_folder: !!document?.is_folder,
                            is_published: !!document?.is_published,
                        });
                    }}
                >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                </Button>
            )}
        </div>
    );
};

export default Editor;
