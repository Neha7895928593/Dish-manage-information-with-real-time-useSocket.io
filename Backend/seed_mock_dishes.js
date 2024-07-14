const mongoose = require('mongoose');
const Dish = require('./model/dishSchema');
const dotenv = require('dotenv');

dotenv.config();

const dishes = [
  {
    dishName: "Jeera Rice",
    dishId: "1",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg",
    isPublished: true
  },
  {
    dishName: "Paneer Tikka",
    dishId: "2",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg",
    isPublished: true
  },
  {
    dishName: "Rabdi",
    dishId: "3",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg",
    isPublished: true
  },
  {
    dishName: "Chicken Biryani",
    dishId: "4",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg",
    isPublished: true
  },
  {
    dishName: "Alfredo Pasta",
    dishId: "5",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg",
    isPublished: true
  }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to the database');
      })
      .catch((err) => {
        console.error('Database connection error:', err);
      });

    await Dish.deleteMany({});
    await Dish.insertMany(dishes);


    
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}
seedData();
