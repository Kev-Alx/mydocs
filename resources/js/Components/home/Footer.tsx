import React, { Suspense, useState } from "react";
import Spline from "@splinetool/react-spline";
import { Link } from "@inertiajs/react";
import { ArrowUpRight } from "lucide-react";

type Props = {};
const Footer = (props: Props) => {
    const [show, setShow] = useState(false);
    return (
        <section
            onMouseEnter={() => {
                setShow(true);
            }}
            className="text-white w-full h-96 px-8 py-16 md:p-24"
        >
            {show ? (
                <Spline
                    className="mt-32 inset-0 absolute"
                    scene="https://prod.spline.design/eCGisRamRISv5kDO/scene.splinecode"
                />
            ) : null}
            <p className="text-zinc-500 font-semibold">@ 2023</p>
            <div className="flex w-full gap-4 justify-between">
                <p className="text-3xl md:text-5xl font-bold lg:w-2/5">
                    Experience the freedom of simplicity with Mdocs.
                </p>
                <div className="flex flex-col gap-2">
                    <Link
                        href={route("login")}
                        className=" hover:text-zinc-950 gap-8 min-w-max hoverFooter"
                    >
                        <span className="z-10">get started</span>
                        <ArrowUpRight className="inline z-10 hover:text-zinc-950" />
                    </Link>
                    <a className="hover:text-zinc-950  min-w-max hoverFooter">
                        <span className="z-10 ">instagram</span>
                        <ArrowUpRight className="z-10 inline hover:text-zinc-950" />
                    </a>
                    <a className="  min-w-max hoverFooter hover:text-zinc-950">
                        <span className="z-10 ">facebook</span>
                        <ArrowUpRight className="inline z-10" />
                    </a>
                </div>
            </div>
            <p className="text-zinc-500 font-semibold">
                Your words, our canvas – the perfect partnership for your
                writing journey.
            </p>
        </section>
    );
};

export default Footer;
