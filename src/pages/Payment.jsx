import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Payment.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
function detectCardType(number) {
  const re = {
    visa:       /^4/,
    mastercard: /^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]))/,
    amex:       /^3[47]/
  };
  number = number.replace(/\D/g, "");
  if (re.visa.test(number))       return "visa";
  if (re.mastercard.test(number)) return "mastercard";
  if (re.amex.test(number))       return "amex";
  return null;
}

export default function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType]     = useState(null);
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("Canada");
  const [postalCode, setPostalCode] = useState("");
  
  const navigate = useNavigate();

  const handleCardNumberChange = (e) => {
    // format en bancaire
    const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
    const parts  = digits.match(/.{1,4}/g) || [];
    const formatted = parts.join(" ");
    setCardNumber(formatted);


    setCardType(detectCardType(digits));
  };


  // formate la date d’expiration en MM/YY
  const handleExpiryChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) {
      setExpiry(digits.slice(0, 2) + "/" + digits.slice(2));
    } else {
      setExpiry(digits);
    }
  };

  // limite le CVC à 3 chiffres
  const handleCvcChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvc(digits);
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    if (
      cardNumber.replace(/\s/g, "").length !== 16 ||
      expiry.length !== 5 ||
      cvc.length !== 3 ||
      !country ||
      !postalCode
    ) {
      alert("Remplissez complètement vos informations bancaires");
      return;
    }
    navigate("/completion");
  };

  return (
    
    <main className="d-flex justify-content-center align-items-center py-5">
      <form className="payment-form" onSubmit={handlePayNow}>
        <h3 className="mb-4 can">ThriftGaming</h3>

        {/* Card Number */}
        <div className="mb-3 card-number-section">
          <label htmlFor="cardNumber" className="form-label">
            Numéro de Carte
          </label>
          <input
            type="text"
            className="form-control card-number-input"
            id="cardNumber"
            placeholder="1234 1234 1234 1234"
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
          <div className="card-icons">
            {cardType === "visa"       && <img src="/visa.png"       alt="Visa" />}
            {cardType === "mastercard" && <img src="/mastercard.png" alt="Mastercard" />}
            {cardType === "amex"       && <img src="/amex.png"       alt="American Express" />}
          </div>
        </div>


        {/* Expiry & CVC */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="expiry" className="form-label">
              Date d'Expiration
            </label>
            <input
              type="text"
              className="form-control"
              id="expiry"
              placeholder="MM/YY"
              value={expiry}
              onChange={handleExpiryChange}
            />
          </div>
          <div className="col">
            <label htmlFor="cvc" className="form-label">
              Code de Securité
            </label>
            <input
              type="text"
              className="form-control"
              id="cvc"
              placeholder="CVC"
              value={cvc}
              onChange={handleCvcChange}
            />
          </div>
        </div>

        {/* Country */}
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Pays
          </label>
          <select
            className="form-select"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>Canada</option>
            <option>United States</option>
            <option>France</option>
            <option>United Kingdom</option>
            <option>Germany</option>
          </select>
        </div>

        {/* Postal code */}
        <div className="mb-4">
          <label htmlFor="postalCode" className="form-label">
            Code Postal
          </label>
          <input
            type="text"
            className="form-control"
            id="postalCode"
            placeholder="M5T 1T4"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        
        <button type="submit" className="btn btn-primary w-100">
          Payez Maintenant
        </button>
      </form>
    </main>
  );
}