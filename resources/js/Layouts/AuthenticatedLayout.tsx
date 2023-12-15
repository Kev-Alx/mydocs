import { useState, PropsWithChildren, ReactNode } from "react";
import { Toaster } from "@/Components/ui/toaster";
import SideBar from "@/Components/SideBar";
import { User } from "@/types";
import { ReformattedDoc } from "@/lib/utils";
import { TooltipProvider } from "@/Components/ui/tooltip";
export default function Authenticated({
    user,
    children,
    documents,
}: PropsWithChildren<{
    user: User;
    header?: ReactNode;
    documents: ReformattedDoc[];
}>) {
    return (
        <div className="min-h-screen flex dark:bg-slate-600 bg-white overflow-hidden">
            <TooltipProvider>
                <SideBar user={user} documents={documents} />
                <main className="h-full flex-1 overflow-x-hidden">
                    {children}
                </main>
            </TooltipProvider>
            <Toaster />
        </div>
    );
}
