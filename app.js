const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/customers', require('./routes/customers'));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));