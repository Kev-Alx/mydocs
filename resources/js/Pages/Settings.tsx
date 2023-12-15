import NavBar from "@/Components/NavBar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MDoc } from "@/lib/store";
import { reformatData } from "@/lib/utils";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import EditUserPreferences from "./Profile/Partials/EditUserPreferences";

export default function Settings({ auth }: PageProps) {
    const reformattedDocuments = reformatData([]);
    // console.log(documents, auth);
    return (
        <AuthenticatedLayout user={auth.user} documents={reformattedDocuments}>
            <Head title="Settings" />
            <section className="pt-16 ">
                <header className="bg-white shadow mb-4">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 ">
                        <h1 className="font-bold text-3xl">Settings</h1>
                    </div>
                </header>
                <main className="p-8 max-w-7xl mx-auto grid grid-cols-1 gap-4">
                    <EditUserPreferences
                        user={auth.user}
                        className="max-w-2xl"
                    />
                </main>
            </section>
        </AuthenticatedLayout>
    );
}
