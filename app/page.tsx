export default function Home() {
  return (
    <div>
      <h1>Retrokredenc Shop</h1>
      <p>Redirect to main content...</p>
      <script dangerouslySetInnerHTML={{
        __html: 'window.location.href = "/retrokredenc/index.html";'
      }} />
    </div>
  );
}
