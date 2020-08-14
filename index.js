// code away!
const dotenv = require("dotenv");
const server = require("./server");

dotenv.config({ path: "./dotenv" });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
