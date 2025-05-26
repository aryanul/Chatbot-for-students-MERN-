import app from './app';
import { connectDatabase } from './db/connections';
const PORT = process.env.PORT || 3000;

connectDatabase().then(() => {
    app.listen(PORT, () => console.log("Server is running on Port 3000 & connected to DataBase"));
}).catch((err) => console.log(err));

