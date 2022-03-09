import { FC } from "react";

export const Title: FC = ({ children }) => (
    <h2 className="text-3xl text-gray-800 ml-4 font-bold">
        {children}
    </h2>
);