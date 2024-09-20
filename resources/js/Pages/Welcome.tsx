import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Toaster } from "@/Components/ui/toaster";
import Features from "../Components/home/Features";
import Banner from "@/Components/home/Banner";
import HomeBar from "@/Components/home/HomeBar";
import "../Components/home/lightrays.css";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Gallery from "@/Components/home/Gallery";
import Footer from "@/Components/home/Footer";
export default function Welcome({ auth }: PageProps<{}>) {
    const primaryTo = auth.user ? "dashboard" : "login";

    useEffect(() => {
        const lenis = new Lenis();
        const raf = (time: any) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    }, []);

    return (
        <>
            <Head title="Welcome" />
            <Toaster />
            <HomeBar user={auth?.user} />
            {/* <div className="min-h-screen bg-dots-darker bg-center bg-slate-100 dark:bg-dots-lighter dark:bg-gray-900 flex items-center relative">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-10 transform-gpu overflow-hidden blur-3xl "
                >
                    <div
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <section className="p-6 max-w-7xl mx-auto text-center flex flex-col items-center gap-2">
                    <MDocLogo />
                    <h1 className="font-bold text-5xl lg:text-7xl">
                        Your Ideas, Plans, and Notes Unified.
                    </h1>
                    <h2 className="font-semibold lg:text-xl text-muted-foreground">
                        MDocs is the connected workspace where better and faster
                        work happend
                    </h2>
                    <Link
                        className={buttonVariants({
                            className: "mt-4  z-10",
                        })}
                        href={route(primaryTo)}
                    >
                        Get started
                        <ArrowRight size={16} className="ml-2" />
                    </Link>
                </section>
            </div>
            <Features /> */}
            <div className="pr-4 pl-4 relative bg-zinc-950 text-zinc-100 h-[100dvh]">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="jumbo absolute -inset-[10px] opacity-50"></div>
                </div>
                {/* <Banner /> */}
            </div>
            {/* <Gallery /> */}
            <div className="bg-zinc-950">
                <div className="mx-auto max-w-7xl px-4 py-12 text-white">
                    <Features />
                </div>
                <div className="h-screen w-full relative overflow-hidden">
                    <Footer />
                </div>
            </div>
        </>
    );
}
