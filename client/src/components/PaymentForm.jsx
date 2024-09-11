import React, { useState } from "react";
import axios from "axios"; // Import axios

const PaymentForm = (props) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!cardNumber || cardNumber.length !== 16 || !cardNumber.match(/^[0-9]+$/)) {
      tempErrors["cardNumber"] = "Card number must be 16 digits";
      formIsValid = false;
    }

    if (!cardName) {
      tempErrors["cardName"] = "Cardholder name is required";
      formIsValid = false;
    }

    if (!expiryDate || !expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
      tempErrors["expiryDate"] = "Invalid date format";
      formIsValid = false;
    }

    if (!cvv || cvv.length < 3 || cvv.length > 4 || !cvv.match(/^[0-9]+$/)) {
      tempErrors["cvv"] = "CVV must be 3 or 4 digits";
      formIsValid = false;
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleFormClick = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      console.log("Validation Failed");
      return;
    }

    props.purchase();
      
  };

  return (
    <div className="w-full fixed top-0 bg-black bg-opacity-[0.5] h-screen flex justify-center items-center" onClick={() => { props.handleClose() }}>
      <form
        onClick={handleFormClick}
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 border rounded-lg bg-white shadow-md z-[100]"
      >
        <div className="mb-4">
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) =>
              setCardNumber(e.target.value.replace(/\s?/g, "").slice(0, 16))
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="1234 5678 9012 3456"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-xs italic">{errors.cardNumber}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="cardName"
            className="block text-sm font-medium text-gray-700"
          >
            Cardholder Name
          </label>
          <input
            type="text"
            id="cardName"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Name on Card"
          />
          {errors.cardName && (
            <p className="text-red-500 text-xs italic">{errors.cardName}</p>
          )}
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700"
            >
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) =>
                setExpiryDate(
                  e.target.value
                    .replace(/[^0-9]/g, "")
                    .replace(/(\d{2})(\d{2})/, "$1/$2")
                    .slice(0, 5)
                )
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="MM/YY"
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-xs italic">{errors.expiryDate}</p>
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-700"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="CVV"
            />
            {errors.cvv && (
              <p className="text-red-500 text-xs italic">{errors.cvv}</p>
            )}
          </div>
        </div>
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => {handleSubmit()}}
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
