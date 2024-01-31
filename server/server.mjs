import express from 'express';
import { createConnection } from 'mysql2/promise';
import cors from 'cors';

const app = express();
const port = 3001;
const router = express.Router();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'restauracja',
};

let connection;

const initializeDatabaseConnection = async () => {
  try {
    connection = await createConnection(connectionConfig);
    console.log('Połączono z bazą danych MySQL');
  } catch (error) {
    console.error('Błąd połączenia z bazą danych:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const [result] = await connection.query('INSERT INTO users SET ?', [userData]);
    return result.insertId;
  } catch (error) {
    console.error('Błąd podczas tworzenia użytkownika:', error);
    throw error;
  }
};

const getUsers = async () => {
  try {
    const [rows] = await connection.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('Błąd zapytania do bazy danych:', error);
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error('Błąd zapytania do bazy danych:', error);
    throw error;
  }
};

const getMenu = async () => {
  try {
    const [rows] = await connection.query('SELECT * FROM menu');
    return rows;
  } catch (error) {
    console.error('Błąd zapytania do bazy danych:', error);
    throw error;
  }
};

const getOrders = async () => {
  try {
    const [rows] = await connection.query('SELECT * FROM orders');
    return rows;
  } catch (error) {
    console.error('Błąd zapytania do bazy danych:', error);
    throw error;
  }
};

const getCartDetailsForUser = async (name) => {
  try {
    const [rows] = await connection.query(`
      SELECT M.*, CI.count, C.id AS idCart
      FROM CART C
      JOIN CART_CARTITEMS CC ON C.id = CC.idCart
      JOIN CARTITEMS CI ON CC.idCartItem = CI.id
      JOIN MENU M ON CI.idItemMenu = M.id
      WHERE C.id = ?; 
    `, [name]);
    console.log("ROW: ", rows);
    const groupedData = rows.reduce((acc, row) => {
      if (!acc[row.idCart]) {
        acc[row.idCart] = { idCart: row.idCart, orderData: [] };
      }

      acc[row.idCart].orderData.push({
        id: row.id,
        namePL: row.namePL,
        nameEN: row.nameEN,
        price: row.price,
        hotprice: row.hotprice,
        count: row.count,
      });

      return acc;
    }, {});
    const resultArray = Object.values(groupedData);
    console.log("Result: ", resultArray);
    return resultArray;
  } catch (error) {
    console.error('Błąd zapytania do bazy danych:', error);
    throw error;
  }
};

const getTotalPriceForCart = async (idCart) => {
  try {
    const [rows] = await connection.query('SELECT totalPrice FROM cart WHERE id = ?', [idCart]);
    return rows;
  } catch (error) {
    console.error('Błąd zapytania do bazy danych:', error);
    throw error;
  }
};

const getOrdersForUser = async (customerName) => {
  try {
    const [rows] = await connection.query('SELECT * FROM orders WHERE name = ?', [customerName]);
    console.log("orders or user: ", rows);
    return rows;
  } catch (error) {
    console.error('Błąd zapytania do bazy danych:', error);
    throw error;
  }
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//USERS
app.get('/api/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Błąd podczas pobierania użytkowników:', error);
    res.status(500).send('Błąd pobierania użytkowników');
  }
});

app.post('/api/login', async (req, res) => {
  console.error(' logowania req.body:', req.body);
  const { username, password } = req.body;
  console.error(' logowania username:', username);
  console.error(' logowania password:', password);

  try {
    const [rows] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

    if (rows.length > 0) {
      const user = rows[0];
      res.status(200).json({ message: 'Logowanie udane!', user });
    } else {
      res.status(401).json({ message: 'Nieprawidłowe dane logowania.' });
    }
  } catch (error) {
    console.error('Błąd podczas logowania:', error);
    res.status(500).json({ message: 'Błąd podczas logowania.' });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, password, confirmPassword, email, phoneNumber } = req.body;

    if (password !== confirmPassword) {
      console.error('Hasło i potwierdzenie hasła są różne');
      return res.status(400).json({ error: 'Hasło i potwierdzenie hasła są różne' });
    }

    const userExists = await getUserByUsername(username);
    if (userExists) {
      console.error('Użytkownik o podanej nazwie już istnieje');
      return res.status(400).json({ error: 'Użytkownik o podanej nazwie już istnieje' });
    }

    const userId = await createUser({
      username,
      password,
      role: 'client',
      email,
      phoneNumber,
    });

    return res.status(201).json({ success: true, userId });
  } catch (error) {
    console.error('Błąd podczas rejestracji:', error.message);
    return res.status(500).json({ error: 'Błąd podczas rejestracji' });
  }
});

//ITEMS
app.get('/api/menu', async (req, res) => {
  try {
    const users = await getMenu();
    res.json(users);
  } catch (error) {
    console.error('Błąd podczas pobierania danych dla menu:', error);
    res.status(500).send('Błąd pobierania menu');
  }
});

app.get('/api/hotprice', async (req, res) => {
  try {
    const query = `SELECT * FROM menu WHERE hotprice IS NOT NULL;`;
    const [results] = await connection.query(query);
    res.json(results);
  } catch (error) {
    console.error('Błąd podczas pobierania danych z hotprice:', error);
    res.status(500).json({ error: 'Błąd podczas pobierania danych z hotprice' });
  }
});

//ORDER
app.post('/api/createOrder', async (req, res) => {
  try {
    const { reservationDetails, cartItems } = req.body;
    const { name, email, phoneNumber, date, time, numberOfPeople, status } = reservationDetails;
    const [cartResult] = await connection.query('INSERT INTO cart (totalPrice) VALUES (0)');
    const cartId = cartResult.insertId;

    let totalPrice = 0;
    for (const cartItem of cartItems) {
      const { idMenu, count, price } = cartItem;

      const [cartItemResult] = await connection.query(
        'INSERT INTO cartItems (idItemMenu, count) VALUES (?, ?)',
        [idMenu, count]
      );

      const cartItemId = cartItemResult.insertId;
      await connection.query('INSERT INTO cart_cartItems (idCart, idCartItem) VALUES (?, ?)', [cartId, cartItemId]);

      totalPrice += parseFloat(String(price)).toFixed(2);
    }

    await connection.query('UPDATE cart SET totalPrice = ? WHERE id = ?', [totalPrice, cartId]);
    const [orderResult] = await connection.query(
      'INSERT INTO orders (idCart, name, email, phoneNumber, date, time, numberOfPeople, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [cartId, name, email, phoneNumber, date, time, numberOfPeople, status]
    );

    const orderId = orderResult.insertId;
    return res.status(201).json({ success: true, orderId });
  } catch (error) {
    console.error('Błąd podczas realizacji zamówienia:', error);
    return res.status(500).json({ error: 'Błąd podczas realizacji zamówienia', details: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const users = await getOrders();
    res.json(users);
  } catch (error) {
    console.error('Błąd podczas pobierania danych zamówień:', error);
    res.status(500).send('Błąd pobierania zamówień');
  }
});

app.get('/api/ordersForUser', async (req, res) => {
  const { name } = req.query;
  try {
    const orders = await getOrdersForUser(name);
    res.json(orders);
  } catch (error) {
    console.error('Błąd podczas pobierania danych zamówień dla klienta: ', name + ", error: ", error);
    res.status(500).send('Błąd pobierania zamówień dla klienta: ' + name);
  }
});

app.get('/api/userOrdersDetails', async (req, res) => {
  const { idCart } = req.query;
  try {
    const orders = await getCartDetailsForUser(idCart);
    res.json(orders);
  } catch (error) {
    console.error('Błąd podczas pobierania szczegółów zamówień dla idCart: ', idCart + ", error: ", error);
    res.status(500).send('Błąd pobierania szczegółów zamówień dla idCart: ' + idCart);
  }
});

app.get('/api/totalCartPrice', async (req, res) => {
  const { idCart } = req.query;
  try {
    const price = await getTotalPriceForCart(idCart);
    res.json(price);
  } catch (error) {
    console.error('Błąd podczas pobierania ceny dla idCart: ', idCart + ", error: ", error);
    res.status(500).send('Błąd pobierania ceny dla idCart: ' + idCart);
  }
})

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

initializeDatabaseConnection();

export { getUsers };