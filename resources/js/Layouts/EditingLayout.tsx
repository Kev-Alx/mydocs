import SideBar from "@/Components/SideBar";
import React from "react";

type Props = { children: React.ReactNode };

export default function EditingLayout({ children }: Props) {
    return (
        <div className="min-h-[calc(100vh-4.2rem)] flex items-stretch dark:bg-slate-800">
            {/* <SideBar /> */}
            <main className="flex-1 min-h-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
