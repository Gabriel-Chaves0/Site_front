export function Footer() {
  return (
    <footer className="footer">
      <div className="container cols">
        <div>
          <h3>Contato</h3>
          <ul>
            <li>Fixo: (81) 3222-3344</li>
            <li>
              WhatsApp:{" "}
              <a href="https://wa.me/5581999990000" target="_blank" rel="noreferrer">
                +55 81 99999-0000
              </a>
            </li>
            <li>
              E-mail:{" "}
              <a href="mailto:contato@novati.com.br">contato@novati.com.br</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Endereço</h3>
          <address>Av. Boa Viagem, 1000 - Recife/PE - 51011-000</address>
        </div>
        <div>
          <h3>Pagamento</h3>
          <div className="pay-logos">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
              alt="Mastercard"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg/800px-Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg.png"
              alt="PIX"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
