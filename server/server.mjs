import express from 'express';
import { createConnection } from 'mysql2/promise';
import cors from 'cors';

const app = express();
const port = 3001;
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
    const [rows, fields] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
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

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

initializeDatabaseConnection();

export { getUsers };