import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";


const Transition: React.FC = () => {

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)

    //fields
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/transaction', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
            })

        } catch (err: any) {

        }

    }
    return <>

    </>
}

export default Transition