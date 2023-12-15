import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Editor from "@/Components/Editor";
import { MDoc } from "@/lib/store";
import { reformatData } from "../lib/utils";
import NoDoc from "@/Components/NoDoc";
import SearchCommand from "@/Components/SearchCommand";
import { useMemo } from "react";
import PublishModal from "@/Components/PublishModal";

export default function Dashboard({
    auth,
    documents,
    activeDoc = null,
}: PageProps) {
    const reformattedDocuments = useMemo(
        () => reformatData(documents as MDoc[]),
        [documents]
    );
    // console.log(reformattedDocuments);
    return (
        <AuthenticatedLayout user={auth.user} documents={reformattedDocuments}>
            <Head title="Dashboard" />
            {activeDoc ? (
                <Editor document={activeDoc as MDoc} user={auth.user} />
            ) : (
                <NoDoc documents={reformattedDocuments} />
            )}
            <SearchCommand user={auth.user} documents={reformattedDocuments} />
            <PublishModal activeDoc={activeDoc as MDoc | undefined} />
        </AuthenticatedLayout>
    );
}
