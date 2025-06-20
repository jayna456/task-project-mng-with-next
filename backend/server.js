const sequelize = require('./src/config/database.js');
const express = require('express');

// Importing routes
const userRoutes = require('./src/routes/user.js');
const projectRoutes = require('./src/routes/project.js');
const taskRoutes = require('./src/routes/task.js');

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());

sequelize.authenticate().then(() => {
    console.log('Connection to the database has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});

app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/task', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});