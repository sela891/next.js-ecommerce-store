'use client';

export default function RootError() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <span style={{ fontSize: '50px' }}>🧸</span>
      <h2>Oh no! The bear got lost.</h2>
      <p>Something went wrong while loading this page.</p>
      <br />
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
}
