//App.js
import React, { useEffect, useState } from "react";
import FlowEditor from "./FlowEditor";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div style={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px"
            }}>
                ⏳ Loading AI Flow Builder…
            </div>
        );
    }

    return <FlowEditor />;
}

export default App;
