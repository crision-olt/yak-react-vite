import { FC, MouseEvent, useEffect, useRef }          from "react";
import { getFocusableElements, nextFocus, usePortal } from "@/utils/portal";
import { createPortal }                               from "react-dom";

export type FrameProps = {
    closeOnClickOutside?: boolean;
    closeOnEsc?: boolean;
    onClose: Function;
    open?: boolean;
}
const Frame: FC<FrameProps> = ({ children, closeOnClickOutside = true, closeOnEsc = true, onClose, open = true }) => {
    const portal = usePortal();
    const previousFocus = useRef<HTMLElement | null>(null);

    // close on click outside
    const container = useRef<HTMLDivElement>(null);
    const onOverlayClick = (e: MouseEvent) => {
        if (!container.current?.contains(e.target as Node)) onClose();
    };

    // close on esc
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!open) return;

            switch (e.key) {
                case "Escape": {
                    if (closeOnEsc) onClose();
                    break;
                }
                case "Tab": {
                    e.preventDefault();
                    nextFocus(getFocusableElements(container.current), !e.shiftKey);
                    break;
                }
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [closeOnEsc, onClose, open]);

    useEffect(() => {
        // aria-hidden
        document.getElementById("root")?.setAttribute("aria-hidden", open.toString());
        portal.current?.setAttribute("aria-hidden", (!open).toString());

        if (open) {
            previousFocus.current = (document.activeElement as HTMLElement) ?? null;
            nextFocus(getFocusableElements(container.current));
        } else {
            previousFocus.current?.focus?.();
            previousFocus.current = null;
        }
    }, [open, portal]);

    return createPortal(
        <div
            className={`fixed inset-0 z-10 p-8 text-white bg-gray-600/90 ${open ? "visible" : "invisible"}`}
            onClick={closeOnClickOutside ? onOverlayClick : undefined}
        >
            {/* container: `max-w-sm` to make it reasonably narrow, `mx-auto` to center horizontally */}
            <div className="relative w-full max-w-md mx-auto mt-8" ref={container}>
                {/* contents */}
                <div className="overflow-hidden bg-gray-800 rounded shadow-xl">{children}</div>
                {/* closer in the corner */}
                <button
                    className="absolute -top-2 -right-2 flex justify-center rounded-full h-8 w-8 bg-gray-600 cursor-pointer shadow-xl outline-none border-2 border-gray-600 focus:border-blue-300"
                    onClick={() => onClose()}
                    title="Bye bye ????"
                >
                    <span className="text-2xl leading-6 select-none">&times;</span>
                </button>
            </div>
        </div>,
        portal.current,
    );
};

const Head: FC = ({ children }) => (
    <div className="block px-4 py-2 bg-gray-900">
        <h1 className="text-lg">{children}</h1>
    </div>
);

const Body: FC = ({ children }) => <div className="p-4">{children}</div>;
const Actions: FC = ({ children }) => <div className="p-4">{children}</div>;
export const Modal = { Frame, Head, Body, Actions };
