import { useState, useRef, FormEventHandler } from "react";
import { Button } from "./ui/button";
import useDocument from "@/hooks/useDocument";
import { useForm } from "@inertiajs/react";
import Modal from "./ui/Modal";
import InputLabel from "./ui/InputLabel";
import InputError from "./ui/InputError";
import TextInput from "./ui/TextInput";
import { useFolderModalStore } from "@/lib/store";
import { NewDocIcon, NewFolderIcon } from "./Svgs";

type Props = {
    document_id: number | null;
};

const NewModal = ({ document_id }: Props) => {
    const { createNewDocument, createNewFolder, isLoading } = useDocument();

    const [isOpen, setisOpen] = useState(false);
    const [typeIsFolder, setTypeIsFolder] = useState(false);
    const passwordInput = useRef<HTMLInputElement>();

    const itemInput = useRef<HTMLInputElement>();
    const {
        isActive,
        closeModal: closeModalItemZ,
        isFolder,
        document_id: doc_id,
    } = useFolderModalStore((state) => state);

    const {
        data: folder,
        setData,
        reset,
        errors,
    } = useForm({
        title: "",
    });

    const {
        data: item,
        setData: setItem,
        reset: itemReset,
        errors: itemError,
    } = useForm({
        title: "",
    });

    const newFolderHandler: FormEventHandler = (e) => {
        e.preventDefault();
        if (typeIsFolder) {
            createNewFolder({ ...folder, document_id });
        } else {
            createNewDocument({ ...folder, document_id });
        }
        closeModal();
    };

    const newItemHandler: FormEventHandler = (e) => {
        e.preventDefault();
        // console.log(isFolder, doc_id);
        if (isFolder) {
            createNewFolder({ ...item, document_id: doc_id });
        } else {
            createNewDocument({ ...item, document_id: doc_id });
        }
        closeModalItem();
    };

    const closeModal = () => {
        setisOpen(false);
        reset();
    };

    const closeModalItem = () => {
        closeModalItemZ();
        itemReset();
    };

    return (
        <>
            <Button
                onClick={() => {
                    setisOpen(true);
                    setTypeIsFolder(true);
                }}
                className="w-full hover:bg-slate-200 flex  font-semibold justify-start gap-2"
                variant={"secondary"}
                size={"sm"}
            >
                <NewFolderIcon />
                New folder
            </Button>
            <Button
                onClick={() => {
                    setisOpen(true);
                    setTypeIsFolder(false);
                }}
                className="w-full hover:bg-slate-200 flex justify-start gap-2 font-semibold"
                variant={"secondary"}
                size={"sm"}
            >
                <NewDocIcon />
                New Document
            </Button>
            <Modal show={isOpen} onClose={closeModal}>
                <form onSubmit={newFolderHandler} className="p-6">
                    <h2 className="text-lg font-medium text-slate-900">
                        Create a new {typeIsFolder ? "folder" : "document"}.
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Enter a name for your new{" "}
                        {typeIsFolder ? "folder" : "document"}.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="title"
                            value="Title"
                            className="sr-only"
                        />

                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            ref={passwordInput}
                            value={folder.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Folder name..."
                        />

                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            variant={"secondary"}
                            onClick={closeModal}
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="ml-3"
                            disabled={isLoading}
                            type="submit"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal show={isActive} onClose={closeModalItem}>
                <form onSubmit={newItemHandler} className="p-6">
                    <h2 className="text-lg font-medium text-slate-900">
                        Create a new {isFolder ? "Folder" : "Document"}.
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Enter a name for your new{" "}
                        {isFolder ? "Folder" : "Document"}.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="title"
                            value="Title"
                            className="sr-only"
                        />

                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            ref={itemInput}
                            value={item.title}
                            onChange={(e) => setItem("title", e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder={`${
                                isFolder ? "Folder" : "Document"
                            } name...`}
                        />

                        <InputError
                            message={itemError.title}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            variant={"secondary"}
                            onClick={closeModalItem}
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="ml-3"
                            disabled={isLoading}
                            type="submit"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default NewModal;
