import { ReformattedDoc, containsDocument } from "@/lib/utils";
import { useMemo } from "react";
import articlePicture from "@/assets/undraw_articles_wbpb.svg";
import writerPicture from "@/assets/undraw_writer_q06d.svg";

type Props = {
    documents: ReformattedDoc[];
};

const NoDoc = ({ documents }: Props) => {
    const hasDocument = useMemo(
        () => containsDocument(documents),
        [containsDocument, documents]
    );
    return (
        <div className="min-h-full pt-16 w-full">
            <section className="w-full items-center h-[calc(100vh-4rem)] justify-center flex flex-col">
                {hasDocument ? (
                    <>
                        <img
                            src={articlePicture}
                            className="w-56 h-56"
                            aria-hidden
                        />
                        <p className="font-semibold text-center">
                            Select a document to start editing.
                        </p>
                    </>
                ) : (
                    <>
                        <img
                            src={writerPicture}
                            className="w-56 h-56"
                            aria-hidden
                        />
                        <p className="font-semibold ">
                            You don't have any documents to write to.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Create a new one from the sidebar.
                        </p>
                    </>
                )}
            </section>
        </div>
    );
};

export default NoDoc;
