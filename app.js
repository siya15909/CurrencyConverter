base_url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amnt = document.querySelector(".amount input");
  let amtVal = amnt.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amnt.value = "1";
  }
  let from = fromCurr.value.toLowerCase();
  let to = toCurr.value.toLowerCase();
  const URL = `${base_url}/${from}.json`;
  const rate = await fetching(URL, from, to);
  let finalAmt = amtVal * rate;
  msg.innerText = `${amtVal} ${from.toUpperCase()} = ${finalAmt} ${to.toUpperCase()}`;
});
const fetching = async (URL, from, to) => {
  let result = await fetch(URL);
  let data = await result.json();
  let rate = data[from][to];
  return rate;
};
