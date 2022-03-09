import { FC } from "react";

export const Page: FC = ({ children }) => (
    <main className="h-full w-full">
        {children}
    </main>
);