import { Link } from "@inertiajs/react";
import React from "react";

type Props = {
    title: string;
    author: string;
    id: number;
};

const DocumentCard = ({ author, title, id }: Props) => {
    return (
        <div className="bg-zinc-100 text-zinc-950 rounded py-2 px-4">
            <Link className="font-bold text-4xl" href={`/preview/${id}`}>
                {title}
            </Link>
            <p className="text-muted-foreground">{author}</p>
        </div>
    );
};

export default DocumentCard;
