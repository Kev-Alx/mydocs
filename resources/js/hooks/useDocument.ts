import { toast } from "@/Components/ui/use-toast";
import { router } from "@inertiajs/react";
import { useState } from "react";

type FolderCreationReq = {
    title: string;
    content?: string;
    document_id?: number | null;
    icon?: string;
};

type FolderDeletionReq = {
    id: number;
    is_folder: number;
};

type ItemUpdateReq = {
    id?: number;
    title?: string;
    content?: string;
    is_folder?: boolean;
    is_published?: boolean;
};

const useDocument = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const createNewFolder = async (payload: FolderCreationReq) => {
        setIsLoading(true);
        // console.log(payload);
        router.post(
            "/documents",
            {
                ...payload,
                is_folder: true,
            },
            {
                onSuccess: () => {
                    toast({
                        title: "Folder succesfully created.",
                    });
                    setIsLoading(false);
                },
                onError: () => {
                    setError(error);
                    toast({
                        title: "Folder is unable to be created.",
                        variant: "destructive",
                        duration: 800,
                    });
                    setIsLoading(false);
                },
            }
        );
    };

    const createNewDocument = async (payload: FolderCreationReq) => {
        setIsLoading(true);
        router.post(
            "/documents",
            {
                ...payload,
                is_folder: false,
            },
            {
                onSuccess: () => {
                    toast({
                        title: "Document succesfully created.",
                    });
                    setIsLoading(false);
                },
                onError: () => {
                    setError(error);
                    toast({
                        title: "Document is unable to be created.",
                        variant: "destructive",
                        duration: 800,
                    });
                    setIsLoading(false);
                },
            }
        );
    };

    const updateDocument = async (payload: ItemUpdateReq) => {
        const { id } = payload;
        setIsLoading(true);
        router.put(
            `/documents/${id}`,
            {
                ...payload,
            },
            {
                onError: () => {
                    setError(error);
                    toast({
                        title: "Auto save failed.",
                        variant: "destructive",
                        duration: 800,
                    });
                    setIsLoading(false);
                },
                onSuccess: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    const deleteDocument = async (payload: FolderDeletionReq) => {
        setIsLoading(true);
        const { id, is_folder } = payload;
        const result = window.confirm(
            `Are you sure you want to delete this ${
                is_folder ? "Folder" : "Document"
            }`
        );
        if (!result) return;
        router.delete(`/documents/${id}`, {
            onSuccess: () => {
                toast({
                    title: `${
                        is_folder ? "Folder" : "Document"
                    } successfully deleted.`,
                    duration: 800,
                });
                setIsLoading(false);
            },
            onError: () => {
                setError(error);
                toast({
                    title: `${
                        is_folder ? "Folder" : "Document"
                    } is unable to be deleted.`,
                    variant: "destructive",
                    duration: 800,
                });
                setIsLoading(false);
            },
        });
    };

    return {
        isLoading,
        error,
        createNewDocument,
        createNewFolder,
        updateDocument,
        deleteDocument,
    };
};

export default useDocument;
