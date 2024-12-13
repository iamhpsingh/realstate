import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js"
import propertyRoutes from "./routes/propertyRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoDBURL = process.env.mongoDBURL;

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To Real Estate Full Stack App');
});

app.use('/', userRoutes);
app.use('/api', propertyRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });