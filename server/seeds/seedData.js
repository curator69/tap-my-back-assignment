const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Kudo = require("../models/Kudo");
const connectDB = require("../config/db");
require("dotenv").config();

const users = [
  {
    name: "John Doe",
    email: "john@kudospot.com",
    password: "test123",
    department: "Engineering",
  },
  {
    name: "Jane Smith",
    email: "jane@kudospot.com",
    password: "test123",
    department: "Marketing",
  },
  {
    name: "Mike Wilson",
    email: "mike@kudospot.com",
    password: "test123",
    department: "Sales",
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Kudo.deleteMany();

    // Create users with hashed passwords
    const createdUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return User.create({ ...user, password: hashedPassword });
      })
    );

    // Create sample kudos
    await Kudo.create([
      {
        sender: createdUsers[0]._id,
        receiver: createdUsers[1]._id,
        message: "Great job on the marketing campaign!",
        category: "Innovation",
      },
      {
        sender: createdUsers[1]._id,
        receiver: createdUsers[2]._id,
        message: "Thanks for helping with the client presentation",
        category: "Helpful",
      },
      {
        sender: createdUsers[2]._id,
        receiver: createdUsers[0]._id,
        message: "Excellent team leadership this sprint",
        category: "Leadership",
      },
    ]);

    console.log("Sample data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
