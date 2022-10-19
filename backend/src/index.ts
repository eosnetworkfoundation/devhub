require('dotenv').config();

import app from './app';

const { PORT = 3001 } = process.env;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
