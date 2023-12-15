import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MDoc } from "./store";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export interface ReformattedDoc {
    id: number;
    title: string;
    isFolder: boolean;
    content: any; // You can replace 'any' with a specific type for content
    items: ReformattedDoc[];
}

export function reformatData(inputData: MDoc[]): ReformattedDoc[] {
    const itemMap: { [id: number]: ReformattedDoc } = {};
    const result: ReformattedDoc[] = [];

    inputData.forEach((item) => {
        const { id, is_folder, title, content } = item;

        itemMap[id] = {
            id,
            title,
            isFolder: is_folder === 1,
            content,
            items: [],
        };
    });

    inputData.forEach((item) => {
        const { id, document_id } = item;

        if (document_id !== null) {
            const parentItem = itemMap[document_id];
            if (parentItem) {
                parentItem.items.push(itemMap[id]);
            }
        } else {
            result.push(itemMap[id]);
        }
    });

    return result;
}

export function containsDocument(folderStructure: ReformattedDoc[]): boolean {
    for (const item of folderStructure) {
        if (!item.isFolder) {
            return true;
        }

        if (item.items && containsDocument(item.items)) {
            return true;
        }
    }
    return false;
}

export function extractDocuments(
    folderStructure: ReformattedDoc[]
): ReformattedDoc[] {
    const documents: ReformattedDoc[] = [];

    function processItems(items: ReformattedDoc[]) {
        for (const item of items) {
            if (!item.isFolder) {
                documents.push(item);
            }

            if (item.items) {
                processItems(item.items);
            }
        }
    }
    processItems(folderStructure);

    return documents;
}