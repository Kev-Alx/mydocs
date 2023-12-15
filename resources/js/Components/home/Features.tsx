import { motion } from "framer-motion";
import {
    BrainCircuit,
    Folder,
    Globe,
    Layers3,
    Paintbrush,
    Text,
    Waypoints,
} from "lucide-react";

export default function Features() {
    return (
        <>
            <p className="text-[10px] text-zinc-600 mb-1">@ FEATURES</p>
            <section className="grid grid-cols-2">
                <div className="col-span-2 border border-zinc-600 text-center py-4 px-2">
                    <div className="flex gap-2 w-full justify-center items-center">
                        <h1 className="font-bold text-[3vw]">
                            Write what's on your mind
                        </h1>
                        <BrainCircuit size={24} className="text-purple-500" />
                    </div>
                    <h1 className="font-bold text-[3vw]">
                        Publish globally, instantly
                        <Globe
                            className="text-pink-500 inline ml-2"
                            size={24}
                        />
                        , Keep documenting
                        <Text
                            className="text-yellow-500 inline ml-2"
                            size={24}
                        />
                    </h1>
                </div>
                <div className="border border-zinc-600 text-center py-16 px-2 flex items-center justify-center gap-2">
                    <Layers3 /> Minimalistic workspace
                </div>
                <div className="border border-zinc-600 text-center py-16 px-2 flex items-center justify-center gap-2">
                    <Folder /> Structured file system
                </div>
                <div className="border border-zinc-600 text-center py-16 px-2 flex items-center justify-center gap-2">
                    <Paintbrush /> Rich WYSWYG text editor
                </div>
                <div className="border border-zinc-600 text-center py-16 px-2 flex items-center justify-center gap-2">
                    <Waypoints /> Publish your notes
                </div>
            </section>
        </>
    );
}
