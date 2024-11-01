const express = require('express');
const dotenv = require('dotenv');
const equipmentRouter = require('./routes/equipment');
const serenityRouter = require('./routes/serenity');
const configRouter = require('./routes/config');
const logger = require('./utils/logger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/equipment', equipmentRouter);
app.use('/api/serenity', serenityRouter);
app.use('/api/config', configRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});