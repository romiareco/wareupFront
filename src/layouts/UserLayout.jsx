import React from "react";

export function UserLayout(props) {
    const { children } = props;

    return (
        <div>
            <h2>
                Se está usando el UserLayout
            </h2>
            {children}
        </div>
    )
}