import Editor from "@/Components/Editor";
import HomeBar from "@/Components/home/HomeBar";
import { Separator } from "@/Components/ui/separator";
import { MDoc } from "@/lib/store";
import { User } from "@/types";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { Head } from "@inertiajs/react";
import React from "react";

type PageProps = {
    auth: {
        user: User;
    };
    document: MDoc;
};
const Preview = ({ document, auth }: PageProps) => {
    const editor: BlockNoteEditor = useBlockNote({
        editable: false,
        initialContent: JSON.parse(document.content || ""),
    });
    return (
        <>
            <Head title={document.title} />
            <HomeBar user={auth.user} />
            <div className="pt-20 px-8 bg-zinc-950 h-screen">
                <div className="md:max-w-3xl lg:max-w-7xl mx-auto bg-white p-2 rounded-md rounded-b-none">
                    <h1 className="font-bold text-5xl text-zinc-950">
                        {document.title}
                    </h1>
                </div>
                <Separator className="bg-zinc-300 md:max-w-3xl lg:max-w-7xl mx-auto" />
                <div className="md:max-w-3xl lg:max-w-7xl mx-auto bg-white p-2 rounded-md rounded-t-none">
                    <BlockNoteView editor={editor} theme={"light"} />
                    <p className="text-sm text-muted-foreground font-semibold mt-4">
                        By - {document.author}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Preview;
