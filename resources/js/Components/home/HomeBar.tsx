import React, { useEffect, useState } from "react";
import MDocLogo from "../MDocLogo";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import {
    motion,
    useScroll,
    useMotionValue,
    useMotionValueEvent,
} from "framer-motion";
import { buttonVariants } from "../ui/button";
import { NewDocIcon } from "../Svgs";

type Props = { user?: User };

const HomeBar = ({ user }: Props) => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 250) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            initial={{ y: -100 }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut", delay: 0.6 }}
            className="fixed top-0 right-0 p-4 pb-3 text-right bg-transparent text-zinc-100 w-full shadow flex justify-between z-[1000] items-center"
        >
            <MDocLogo theme={"dark"} />
            {user ? (
                <div className="flex gap-4 items-center">
                    <Link
                        href={"/published"}
                        className={
                            " py-2 text-zinc-100 font-bold rounded-md  hover:text-zinc-300 hover:underline transition-all"
                        }
                    >
                        Published
                    </Link>
                    <Link
                        href={route("dashboard")}
                        className="text-zinc-100 px-5 py-2  font-bold rounded-md hover:bg-zinc-100/90 hover:text-zinc-800 transition-colors border border-zinc-100"
                    >
                        Dashboard
                    </Link>
                </div>
            ) : (
                <div className="flex gap-4 items-center">
                    <Link
                        href={"/published"}
                        className={
                            " py-2 text-zinc-100 font-bold rounded-md  hover:text-zinc-300 hover:underline transition-all"
                        }
                    >
                        Published
                    </Link>
                    <Link
                        href={route("login")}
                        className={
                            "text-zinc-100 px-5 py-2  font-bold rounded-md hover:bg-zinc-100/90 hover:text-zinc-800 transition-colors border border-zinc-100"
                        }
                    >
                        Log in
                    </Link>
                    <Link
                        href={route("register")}
                        className={
                            "bg-zinc-100 px-5 py-2 text-zinc-950 font-bold rounded-md hover:bg-zinc-100/80 hover:text-zinc-800 transition-colors"
                        }
                    >
                        Sign up
                    </Link>
                </div>
            )}
        </motion.nav>
    );
};

export default HomeBar;
