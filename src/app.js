require('dotenv').config();

const express = require('express');
const UserRoutes = require('./routes/userRoutes');
const TransactionRoutes = require('./routes/transactionRoutes');
const UserProfileRoutes = require('./routes/userProfileRoutes');
const serviceRoutes = require("./routes/serviceRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const errorHandler = require('./middlewares/errorHandler');


const app = express();

app.use(express.json());
app.use('/', UserRoutes);
app.use('/', TransactionRoutes);
app.use('/profile', UserProfileRoutes);
app.use("/service", serviceRoutes);
app.use("/banner", bannerRoutes);
app.use(errorHandler.errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
