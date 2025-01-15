// index.js
const routes = require("./routes");
require('dotenv').config();

// Porta do servidor
const PORT = process.env.PORT || 3000;
routes.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
