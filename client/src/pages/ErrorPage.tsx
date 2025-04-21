const ErrorPage = () => {
  return (
    <section style={{ textAlign: 'center', padding: '4rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404: Page Not Found</h1>
      <p style={{ fontSize: '2rem' }}>¯\_(ツ)_/¯</p>
      <p style={{ marginTop: '2rem' }}>
        <a href="/" style={{ textDecoration: 'underline', color: '#007bff' }}>
          Go back home
        </a>
      </p>
    </section>
  );
};

export default ErrorPage;
