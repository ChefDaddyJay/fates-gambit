'use client';

import { useState } from "react";

export default function DashboardPage() {
    const [dis, setDis] = useState(true);

    const change = () => {
        setDis(!dis);
    }

    return (
        <div>
            <input type="number" disabled={dis}></input>
            <button onClick={change}>{dis? 'Enable' : 'Disable'}</button>
        </div>
    );
}