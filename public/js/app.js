console.log("Client side js ");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:3000/weather?address=Noisiel").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = searchElement.value;
  message2.textContent = message1.textContent = "";

  fetch("http://localhost:3000/weather?address=" + locations + "").then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.textContent = data.error;
        } else {
          message1.textContent = data.location;
          message2.textContent = data.forecastData;
        }
      });
    }
  );
});
