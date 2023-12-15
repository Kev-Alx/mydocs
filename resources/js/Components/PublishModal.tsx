import React from "react";
import Modal from "./ui/Modal";
import { MDoc, usePublish } from "@/lib/store";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import useDocument from "@/hooks/useDocument";
import { cn } from "@/lib/utils";

type Props = {
    activeDoc?: MDoc;
};

const PublishModal = ({ activeDoc }: Props) => {
    const { isOpen, onClose } = usePublish();
    const { updateDocument, isLoading } = useDocument();
    const isPublished = activeDoc?.is_published;
    // console.log(activeDoc);
    const handlePublish = () => {
        updateDocument({
            id: activeDoc?.id,
            is_published: !activeDoc?.is_published,
        }).then((e) => onClose());
    };
    return (
        <Modal show={isOpen} onClose={onClose}>
            <div
                className={cn(
                    " p-4 ",
                    isPublished ? "bg-red-100" : "bg-slate-100"
                )}
            >
                <h1
                    className={cn(
                        "font-bold text-2xl",
                        isPublished ? "text-red-600" : "text-slate-900"
                    )}
                >
                    {isPublished
                        ? "Unpublish this document?"
                        : "Publish this document?"}
                </h1>

                <p className="text-sm">
                    {isPublished
                        ? "This will make other users unable to view this document."
                        : "Published documents can be viewed by all users."}
                </p>
            </div>
            <Separator />
            <div className="p-4">
                <Button
                    variant={"secondary"}
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    className="ml-2"
                    onClick={() => handlePublish()}
                    disabled={isLoading}
                    variant={isPublished ? "destructive" : "default"}
                >
                    {isPublished ? "Unpublish" : "Publish"}
                </Button>
            </div>
        </Modal>
    );
};

export default PublishModal;
