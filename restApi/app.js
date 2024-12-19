const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import the CORS middleware
const app = express();

app.use(express.json());

app.use(cors());  

mongoose.connect('mongodb://localhost:27017/carProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  tel: String,
  email: String,
  username: String,
  password: String,
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
});

const User = mongoose.model('User', userSchema);

const carSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_ad: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  carBrand: String,
  carModel: String,
  carColor: String,
  carYear: Number,
});

const Car = mongoose.model('Car', carSchema);

// Routes

// GET /users - Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('cars');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /users/:id - Get a user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('cars');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /users - Create a new user
app.post('/users', async (req, res) => {
  try {
    const { tel, email, username, password } = req.body;
    const newUser = new User({ tel, email, username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /cars - Get all cars
app.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find().populate('userId');
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /cars/:id - Get a car by ID
app.get('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('userId');
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /cars - Create a new car for a user
app.post('/cars', async (req, res) => {
  try {
    const { userId, carBrand, carModel, carColor, carYear } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the new car
    const newCar = new Car({
      userId,
      carBrand,
      carModel,
      carColor,
      carYear,
    });

    await newCar.save();

    // Add the new car to the user's car list
    user.cars.push(newCar._id);
    await user.save();

    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /cars/:id - Update a car by ID
app.put('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const { carBrand, carModel, carColor, carYear } = req.body;
    car.carBrand = carBrand || car.carBrand;
    car.carModel = carModel || car.carModel;
    car.carColor = carColor || car.carColor;
    car.carYear = carYear || car.carYear;

    car.updatedAt = Date.now();

    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /cars/:id - Delete a car by ID
app.delete('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    await car.remove();
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /users/:id - Delete a user and their cars
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user's cars first
    await Car.deleteMany({ userId: user._id });

    // Delete the user
    await user.remove();
    res.json({ message: 'User and their cars deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});