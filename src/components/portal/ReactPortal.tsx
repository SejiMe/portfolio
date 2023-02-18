import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

// for creating a wrapper
const createWrapperAndAppendToBody = (wrapperID: string) => {
    if (!document) return null;
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperID);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
};

type ReactPortalProps = {
    children: React.ReactElement;
    wrapperId: string;
};

const ReactPortal = ({ children, wrapperId }: ReactPortalProps) => {
    const [wrapperElement, setWrapperElement] =
        useState<HTMLElement>();

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;

        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setWrapperElement(element!);
        return () => {
            if (systemCreated && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [wrapperId]);

    if (!wrapperElement) return null;

    return createPortal(children, wrapperElement);
};

export default ReactPortal;