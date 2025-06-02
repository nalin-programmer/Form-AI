// components/MainLayout.jsx
import React from "react";
import Header from "./header";

const MainLayout = ({ children }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Header style={{ height: "64px", flexShrink: 0 }} />
            <main style={{ flex: 1, overflow: "auto" }}>
                {children}
            </main>
        </div>
    );
};


export default MainLayout;
