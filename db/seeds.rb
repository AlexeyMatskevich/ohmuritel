# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
 magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
 commodo consequat."

User.create!(
  [
    {
      email: "john.doe@example.com",
      first_name: "John",
      last_name: "Doe",
      password: "12345678",
    },
    {
      email: "jane.doe@example.com",
      first_name: "Jane",
      last_name: "Doe",
      password: "12345678",
    },
  ]
)

Product.create!(
  [
    {
      name: "Example product 1",
      weight: 40,
      price: 20,
      preview_description: LOREM,
    },
    {
      name: "Example product 2",
      weight: 40,
      price: 30,
      preview_description: LOREM,
    },
    {
      name: "Echpochmak",
      weight: 40,
      price: 25,
      preview_description: LOREM,
    },
    {
      name: "Bun with cottage cheese",
      weight: 40,
      price: 40,
      preview_description: LOREM,
    },
    {
      name: "Bun with meat",
      weight: 40,
      price: 14,
      preview_description: LOREM,
    },
    {
      name: "Bun with strawberries",
      weight: 40,
      price: 5,
      preview_description: LOREM,
    },
    {
      name: "Muffin roll",
      weight: 40,
      price: 2,
      preview_description: LOREM,
    },
    {
      name: "bread",
      weight: 40,
      price: 3,
      preview_description: LOREM,
    },
  ]
)
