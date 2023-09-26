import React from "react";

export default function BodyCell({
    children,
    className = ''
}) {
    return <div className={`body-cell ${className}`}>{children}</div>;
}
