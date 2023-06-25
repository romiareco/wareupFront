import React from "react";

export function AuthLayout(props) {
    const { children } = props;

    return (
        <div>
            <h2>
                Se está usando el AuthLayout
            </h2>
            {children}
        </div>
    )
}