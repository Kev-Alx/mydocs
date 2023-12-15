import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
            documents={[]}
        >
            <Head title="Profile" />

            <div className="pt-16">
                <header className="bg-white shadow mb-4">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 ">
                        <h1 className="font-bold text-3xl">Profile</h1>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white shadow sm:rounded-lg max-w-2xl">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div className="shadow sm:rounded-lg w-full max-w-2xl">
                        <UpdatePasswordForm />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg max-w-2xl">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                    <div className="h-4" aria-hidden />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
