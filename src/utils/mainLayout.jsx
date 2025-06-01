// components/MainLayout.jsx
import React from "react";
import Header from "./header";

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div style={{ paddingTop: "64px" }}>
                {children}
            </div>
        </>
    );
};

export default MainLayout;
