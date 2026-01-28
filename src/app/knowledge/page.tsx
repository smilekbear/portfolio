import { Suspense } from "react";
import KnowledgePageClient from "./KnowledgePageClient";

export default function Page() {
    return (
        <Suspense fallback={<div className="p-10 text-gray-500">Loading...</div>}>
            <KnowledgePageClient />
        </Suspense>
    );
}