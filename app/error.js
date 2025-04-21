// app/error.js
'use client'

import { useEffect } from 'react';

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>We encountered an error while processing your request.</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
