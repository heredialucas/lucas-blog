export const EmailTemplate = ({ name, email, message }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
    }}
  >
    <h1 style={{ color: "#333" }}>Nuevo mensaje de contacto</h1>
    <div style={{ marginBottom: "20px" }}>
      <strong>Nombre:</strong> {name}
    </div>
    <div style={{ marginBottom: "20px" }}>
      <strong>Email:</strong> {email}
    </div>
    <div style={{ marginBottom: "20px" }}>
      <strong>Mensaje:</strong>
      <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
    </div>
  </div>
);
