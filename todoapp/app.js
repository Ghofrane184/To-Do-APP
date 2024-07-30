// index.js
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());


app.use('/api', projectRoutes);
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
