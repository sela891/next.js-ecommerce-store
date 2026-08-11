import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <span style={{ fontSize: '50px' }}>🧸</span>
      <p style={{ margin: '20px 0', fontSize: '18px' }}>
        Sorry, this toy seems to have gone missing! Make sure to visit a page
        that exists.
      </p>

      <Link
        href="/"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#f1f1f1',
          borderRadius: '8px',
          textDecoration: 'none',
          color: '#333',
          fontWeight: 'bold',
          border: '1px solid #ccc',
        }}
      >
        Return Home
      </Link>
    </div>
  );
}
