import { cn } from "@/lib/utils";

type Props = { className?: string; theme: string };

const MDocLogo = ({ className, theme }: Props) => {
    return (
        <h1
            className={cn(
                theme === "dark"
                    ? "bg-zinc-950 border-zinc-100"
                    : "border-slate-950 bg-zinc-100",
                "font-bold px-2 py-1 border-2 border-b-4 rounded-md hover:-translate-y-1 transition ",
                className
            )}
        >
            MDocs
        </h1>
    );
};

export default MDocLogo;
