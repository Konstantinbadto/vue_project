const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Middleware для обработки JSON-тела запроса

// Читаем данные из db.json
function getOrders() {
  try {
    const data = fs.readFileSync('db.json', 'utf8');
    return JSON.parse(data).orders;
  } catch (error) {
    console.error("Ошибка при чтении db.json:", error);
    return [];
  }
}

// Записываем данные в db.json
function saveOrders(orders) {
  try {
    const data = JSON.stringify({ orders: orders }, null, 2);
    fs.writeFileSync('db.json', data, 'utf8');
  } catch (error) {
    console.error("Ошибка при записи в db.json:", error);
  }
}

// Endpoint для получения списка заказов
app.get('/orders', (req, res) => {
  const orders = getOrders();
  console.log("Sending orders:", orders);
  res.json(orders);
});

// Endpoint для создания нового заказа
app.post('/orders', (req, res) => {
  const newOrder = req.body;
  const orders = getOrders();
  newOrder.id = orders.length + 1; // Простое создание ID
  orders.push(newOrder);
  saveOrders(orders);
  console.log("New order created:", newOrder);
  res.status(201).json(newOrder);
});

app.listen(port, () => {
  console.log(`Бэкенд запущен на порту ${port}`);
});
