import React from "react";

const Fetch = () => {
  const [catFact, setCatFact] = React.useState("");
  const getFetchResponse = async () => {
    const response = await fetch("https://catfact.ninja/fact", {
      method: "GET",
      // if you need a key for your api, it would go here in headers
      // headers: {
      //   'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
      //   'x-rapidapi-key': 'your_api_key',
      // },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    setCatFact(data.fact);
  };
  return (
    <>
      <button onClick={getFetchResponse}>Get Cat Fact</button>
      <h1>Cat Fact:</h1>
      <p>{catFact}</p>
    </>
  );
};

export default Fetch;
