import DocumentCard from "@/Components/DocumentCard";
import HomeBar from "@/Components/home/HomeBar";
import { Separator } from "@/Components/ui/separator";
import { MDoc } from "@/lib/store";
import { User } from "@/types";
import { Head } from "@inertiajs/react";

type PageProps = {
    auth: {
        user: User;
    };
    documents: MDoc[];
};
export default function Published({ auth, documents }: PageProps) {
    return (
        <>
            <Head title="Published" />
            <HomeBar user={auth?.user} />
            <main className="pt-16 bg-zinc-950 h-screen text-zinc-100">
                <div className="px-8 py-2 mx-auto max-w-7xl">
                    <h2 className="text-4xl font-bold tracking-tight ">
                        Published documents.
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Check out everyone else's published document, you might
                        find something interesting here.
                    </p>
                </div>
                <Separator className="bg-slate-500" />
                <section className="px-8 py-4 mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-3 gap-4">
                    {documents.map((doc) => (
                        <DocumentCard
                            title={doc.title}
                            id={doc.id}
                            author={doc.author || ""}
                            key={doc.id}
                        />
                    ))}
                </section>
            </main>
        </>
    );
}
