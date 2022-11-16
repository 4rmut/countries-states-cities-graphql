import app from './api/index.js';
import dotenv from 'dotenv';

dotenv.config();

app.listen(3000, () => console.log('Server is ready!'));
