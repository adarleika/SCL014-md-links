/*module.exports = () => {
  // ...
};
*/

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<h1> hola mundo </h1>");
});

app.listen(3000, () => console.log("Escuchando el puerto 3000 ..."));