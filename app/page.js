"use client";
// this InputSelect is a custom component i created
// using the react-select package
import InputSelect from "@/components/InputSelect";
import React, { useEffect, useState } from "react";
// below is a react Icon
import { IoSwapHorizontal } from "react-icons/io5";
// I created a dataTransferObject and imported it here
// more detail is in the file
import { DataTransferObject } from "./DTO";

const page = () => {
  const [amount, setamount] = useState(); // this is the amount inputed to convert
  const [amountConverted, setamountConverted] = useState(); // this is the amount converted by the api
  const [CurrencyToConvert, setCurrencyToConvert] = useState({
    value: "",
    label: "",
  }); // this is the currency spec to convert to
  const [SelectedCurrency, setSelectedCurrency] = useState({
    value: "",
    label: "",
  }); // this is the currency spec to convert from

  // below conatins all the currencies from the api
  // the data goes through the dto before coming here
  const [Currencies, setCurrencies] = useState([]);

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  // this is using fetch api to get all the currencies from the api
  const getCurrencies = async () => {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`,
      { method: "GET" }
    );
    const result = await response.json();

    // below once the request is successful
    // it will store the currencies in the useState()
    if (response.status == 200) {
      setCurrencies(DataTransferObject(result.supported_codes));
    }
  };

  // this is the function i used to convert the currency
  // using exchange rate api
  const convertCurrency = async (value) => {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${SelectedCurrency.value}`;

    const response = await fetch(url, { method: "GET" });
    const result = await response.json();

    if (response.status == 200) {
      setamountConverted(
        handleConversion(result, CurrencyToConvert.value, value)
      );
    }
  };

  // the function below is to handle the currency conversion.
  const handleConversion = (data, toCurrency, amount) => {
    if (data) {
      const conversionRate = data.conversion_rates[toCurrency];
      return amount * conversionRate;
    }
    return 0;
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <>
      <div className="w-full mt-[50px] md:mt-[100px]" />
      <b className="md:text-[40px] w-full text-center text-[30px] px-2">
        Currency Converter
      </b>
      <p className="text-[14px] md:text-[18px] w-full text-center px-2">
        this converter was made with nextjs, tailwindcss and{" "}
        <a className="text-[blue]" href="https://exchangerate-api.com">
          {" "}
          exchange-rate api
        </a>
      </p>

      <div className="w-[90%] max-w-[800px] mt-[20px] min-h-[200px] bg-white p-[35px] rounded-xl flex flex-col ">
        <div className="w-full   flex md:flex-row flex-col items-center md:justify-between gap-4 ">
          {/* below is the custom component i created */}
          <InputSelect
            label={"From"}
            // below is the data mapped from the api
            data={Currencies.filter(
              (currency, index) =>
                currency.value != (CurrencyToConvert?.value || [])
            )}
            // this is the value of the text input
            inputValue={amount}
            // below is to disable the input conditionally
            disabled={SelectedCurrency?.value ? false : true}
            tootip={SelectedCurrency?.value ? "" : "select a value first"}
            // below is to prevent input if the currencies have not be selectd
            onInput={(text) => {
              if (CurrencyToConvert?.value) {
                setamount(text);
                convertCurrency(text);
              } else {
                alert("Select the currency to convert");
              }
            }}
            clearable={true}
            searchable={true}
            onChange={(data) => {
              setamount("");
              setamountConverted("");
              setSelectedCurrency(data);
            }}
          />

          <div className="w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
            <IoSwapHorizontal size={20} color="white" />
          </div>

          {/* below is the custom component i created */}
          <InputSelect
            label={"To"}
            disabled={true}
            // mutiple={true}
            inputValue={amountConverted}
            data={Currencies.filter(
              (currency, index) => currency.value != SelectedCurrency?.value
            )}
            clearable={true}
            searchable={true}
            onChange={(data) => {
              setamount("");
              setamountConverted("");
              setCurrencyToConvert(data);
            }}
          />
        </div>
        <br />
        {/* below is the out put of the conversion
         */}
        {CurrencyToConvert ? (
          <b>
            {" "}
            {SelectedCurrency && amount} {SelectedCurrency?.label} ={" "}
            {amountConverted} {CurrencyToConvert?.value}
          </b>
        ) : (
          ""
        )}
      </div>
      <div className="w-full mt-[100px]" />

      {/* </div> */}
    </>
  );
};

export default page;
