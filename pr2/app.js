const express = require('express');
const app = express();
const port = 3000;

// Middleware для парсинга JSON
app.use(express.json());


let products = [
    {
        id: 1,
        name: "Кроссовки Fila",
        price: 9990
    },
    {
        id: 2,
        name: "Кроссовки Nike Air",
        price: 12990
    },
    {
        id: 3,
        name: "Кроссовки Adidas",
        price: 8990
    }
];
let nextId = products.length > 0 
    ? Math.max(...products.map(p => p.id)) + 1 
    : 1;
// CRUD операции для товаров:

// GET 
app.get('/products', (req, res) => {
    res.json(products);
});

// GET получить товар по id
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({ message: "Товар не найден" });
    }

    res.json(product);
});

// POST добавить товар
app.post('/products', (req, res) => {
    const { name, price } = req.body;


    if (!name || !price) {
        return res.status(400).json({ message: "Необходимо указать название и стоимость" });
    }

   const newProduct = {
        id: nextId++,  
        name,
        price: Number(price)
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PATCH обновить товар
app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({ message: "Товар не найден" });
    }

    const { name, price } = req.body;

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = Number(price);

    res.json(product);
});

// DELETE удалить товар
app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

    if (productIndex === -1) {
        return res.status(404).json({ message: "Товар не найден" });
    }

    products.splice(productIndex, 1);
    res.json({ message: "Товар удален" });
});


app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});