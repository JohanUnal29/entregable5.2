import ProductManager from "../managers/productManager.js";
const productManager = new ProductManager();
app.use(express.static(__dirname + '/public'));

module.exports = (io) => {
io.on("connection", (socket) => {
    console.log(`New Client Connection with ID: ${socket.id}`);
  
    socket.on("new-product", async (newProd) => {
      try {
        await productManager.createProduct(newProd);
        // Actualizando lista despues de agregar producto nuevo
        const productsList = await productManager.getProducts();
  
        io.emit("products", productsList);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("delete-product", async (delProd) => {
      try {
        let id = parseInt(delProd)
        // console.log(id)
        // console.log(typeof id)
        await productManager.deleteProduct(id);
        // Actualizando lista despues de agregar producto nuevo
        const productsList = await data.getProducts();
  
        io.emit("products", productsList);
      } catch (error) {
        console.log(error);
      }
    });
  });
}