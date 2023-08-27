'use client';

import qs from 'query-string';
import { useEffect, useState } from 'react';

export default function FailPage() {
    const [isMount, setisMount] = useState(false);
    useEffect(() => {
        setisMount(true);
    }, []);
    if (!isMount) {
        return null;
    }

    const query = qs.parseUrl(window.location.href).query;

    return (
        <main
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1>결제 실패</h1>
            <p>이유: {query.message ?? '알 수 없음'}</p>
        </main>
    );
}
