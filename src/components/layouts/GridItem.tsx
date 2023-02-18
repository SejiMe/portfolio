import clsx from "clsx";
import React from "react";

const GridItem = ({
    children,
    classname,
    itemPosition,
}: {
    children?: React.ReactNode;
    classname?: string;
    itemPosition: "center" | "start" | "end";
} & React.ComponentPropsWithoutRef<"div">) => {
    return (
        <div
            className={clsx(
                "grid",
                { "place-items-start": itemPosition === "start" },
                { "place-items-end": itemPosition === "end" },
                { "place-items-center": itemPosition === "center" },
                classname
            )}
        >
            {children}
        </div>
    );
};

export default GridItem;
