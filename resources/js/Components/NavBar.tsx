import { User } from "@/types";
import { Link } from "@inertiajs/react";
import {
    ChevronDown,
    LogOut,
    MenuIcon,
    Settings,
    Share,
    UserCircle2,
} from "lucide-react";
import MDocLogo from "./MDocLogo";
import NavLink from "./ui/NavLink";
import Dropdown from "./ui/Dropdown";
import ResponsiveNavLink from "./ui/ResponsiveNavLink";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { usePublish } from "@/lib/store";
type Props = {
    user: User;
    isCollapsed: boolean;
    isNeeded?: boolean;
    resetWidth: () => void;
};

const NavBar = ({ user, isCollapsed, resetWidth, isNeeded }: Props) => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const { onOpen } = usePublish();
    return (
        <nav
            className={cn(
                "bg-white border-b border-gray-100 fixed top-0 w-full",
                !isNeeded && "left-0 right-0"
            )}
        >
            <div
                className={cn(
                    "max-w-7xl mr-auto ml-10 px-4 sm:px-6 lg:px-8",
                    isCollapsed && "lg:ml-24"
                )}
            >
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            {isCollapsed && isNeeded ? (
                                <div
                                    className="absolute left-6 z-10 p-2"
                                    onClick={resetWidth}
                                    role="button"
                                >
                                    <MenuIcon className="h-6 w-6 text-muted-foreground " />
                                </div>
                            ) : null}
                            <Link href="/">
                                <MDocLogo
                                    theme="light"
                                    className="block h-9 w-auto fill-current max-md:ml-12 text-gray-800"
                                />
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                href={route("published")}
                                active={route().current("published")}
                            >
                                Published
                            </NavLink>
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <div className="ml-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user.name}
                                            <ChevronDown
                                                size={20}
                                                className="ml-2"
                                            />
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <div className="p-2 flex flex-col">
                                        <Button
                                            onClick={() => onOpen()}
                                            variant={"secondary"}
                                        >
                                            Publish this document
                                        </Button>
                                    </div>
                                    <Separator />
                                    <Dropdown.Link
                                        href={route("profile.edit")}
                                        className="flex"
                                    >
                                        <UserCircle2
                                            size={16}
                                            className="mr-2"
                                        />
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("settings")}
                                        className="flex"
                                    >
                                        <Settings size={16} className="mr-2" />
                                        Settings
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="flex"
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState
                                )
                            }
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " sm:hidden"
                }
            >
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800">
                            {user.name}
                        </div>
                        <div className="font-medium text-sm text-gray-500">
                            {user.email}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route("profile.edit")}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
