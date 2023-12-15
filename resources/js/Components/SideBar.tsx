import { ReformattedDoc, cn } from "@/lib/utils";
import { router, usePage } from "@inertiajs/react";
import { ChevronsLeft, Search } from "lucide-react";
import React, { ElementRef, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { User } from "@/types";
import NavBar from "./NavBar";
import NewModal from "./NewModal";
import FolderView from "./FolderView";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useSearch } from "@/lib/store";

type Props = {
    user: User;
    documents: ReformattedDoc[];
};
const routes = ["/profile", "/settings", "/published"];
const SideBar = ({ user, documents }: Props) => {
    const { url } = usePage();
    const isNeeded = !routes.includes(url);
    const isMobile = useMediaQuery("(max-width: 740px)");
    const isResizingRef = useRef(false);
    const sideBarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    const { onOpen } = useSearch();
    //Resizing logic
    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = e.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;
        if (sideBarRef.current && navbarRef.current) {
            sideBarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty(
                "width",
                `calc(100% - ${newWidth}px)`
            );
        }
    };
    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };
    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.preventDefault();
        e.stopPropagation();
        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };
    const resetWidth = () => {
        if (sideBarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);
            sideBarRef.current.style.width = isMobile ? "80%" : "240px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0px" : "calc(100% - 240px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px"
            );
            setTimeout(() => {
                setIsResetting(false);
            }, 300);
        }
    };
    const collapse = () => {
        if (sideBarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sideBarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => {
                setIsResetting(false);
            }, 300);
        }
    };

    return (
        <>
            {isNeeded ? (
                <aside
                    ref={sideBarRef}
                    className={cn(
                        "group/sidebar bg-secondary overflow-y-hidden relative flex w-60 flex-col z-50 overflow-hidden",
                        isResetting &&
                            "transition-all ease-in-out duration-300",
                        isMobile && "w-0"
                    )}
                >
                    <div
                        role="button"
                        onClick={collapse}
                        className={cn(
                            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                            isMobile && "opacity-100"
                        )}
                    >
                        <ChevronsLeft className="h-6 w-6" />
                    </div>
                    <div className="p-8 pt-6 pb-3 pl-6 flex flex-col gap-1">
                        <Button
                            onClick={onOpen}
                            className="w-full hover:bg-slate-200 flex justify-between font-semibold"
                            variant={"secondary"}
                            size={"sm"}
                        >
                            <div className="flex items-center gap-2">
                                <Search className="w-6 h-6" strokeWidth={1.6} />
                                Search
                            </div>
                            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </Button>
                        <NewModal document_id={null} />
                    </div>
                    <Separator className="h-0.5" />
                    <div className="border-primary/20 p-8 pr-4 pt-6">
                        <h2 className="font-bold">My Documents</h2>
                        <section className="overflow-x-auto scrollbar">
                            <FolderView documents={documents} />
                        </section>
                    </div>

                    <div
                        onMouseDown={handleMouseDown}
                        onClick={resetWidth}
                        className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                    />
                </aside>
            ) : null}
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-50 left-60 w-[calc(100%-240px)] overflow-x-hidden",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}
            >
                <NavBar
                    resetWidth={resetWidth}
                    user={user}
                    isCollapsed={isCollapsed}
                    isNeeded={isNeeded}
                />
            </div>
        </>
    );
};

export default SideBar;
