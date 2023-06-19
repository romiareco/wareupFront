import React from "react";

export function UserLayout(props) {
    const { children } = props;

    return (
        <div className="user-layout">
            <div className="user-layout__left">
                <span>LOGO</span>
                <span>USER MENU</span>
            </div>
            <div className="user-layout__right">
                <div className="user-layout__right-header"> 
                    <span>LOGOUT</span>
                </div>
                <div className="user-layout__right-content">
                    {children}
                </div>
            </div>
        </div>
    )
}