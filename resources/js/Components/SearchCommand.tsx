import { useEffect, useMemo } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import { File } from "lucide-react";
import { useSearch } from "@/lib/store";
import { User } from "@/types";
import { ReformattedDoc, extractDocuments } from "@/lib/utils";
import { router } from "@inertiajs/react";
type Props = {
    user: User;
    documents: ReformattedDoc[];
};

const SearchCommand = ({ user, documents }: Props) => {
    const { toggle, isOpen, onClose } = useSearch();

    const formatted = useMemo(
        () => extractDocuments(documents),
        [extractDocuments, documents]
    );

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [toggle]);

    const onSelect = (id: number) => {
        router.visit(`/dashboard/${id}`);
        onClose();
    };

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <div className="py-1">
                <CommandInput
                    placeholder={`Search ${user?.name}'s documents...`}
                    className="outline-none border-none focus:outline-none w-10/12"
                />
            </div>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {formatted?.map((document) => (
                        <CommandItem
                            key={document.id}
                            value={`${document.id}-${document.title}`}
                            title={document.title}
                            onSelect={() => onSelect(document.id)}
                            className="cursor-pointer"
                        >
                            <File className=" text-muted-foreground mr-2 h-4 w-4" />
                            <span>{document.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};

export default SearchCommand;
