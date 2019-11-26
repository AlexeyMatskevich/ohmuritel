User.create!(
  [
    {
      email: "admin@admin",
      first_name: "Jane",
      last_name: "Doe",
      password: "12345678",
      role: :admin,
    },
  ]
)

user = User.create(
  email: "john.doe@example.com",
  first_name: "John",
  last_name: "Doe",
  password: "12345678",
)
user2 = User.create(
  email: "jane.doe@example.com",
  first_name: "Jane",
  last_name: "Doe",
  password: "12345678",
)
user3 = User.create(
  email: "dane.doe@example.com",
  first_name: "Jane",
  last_name: "Doe",
  password: "12345678",
)

burger = Product.create(
  name: "Burger",
  weight: 40,
  price: 20,
  preview_description: Faker::Food.description,
  description: Faker::Lorem.paragraph(sentence_count: 2)
)
burger.image.attach(io: File.open("public/burger.jpg"), filename: "burger.jpg", content_type: "image/jpg")
cheeseburger = Product.create(
  name: "Cheeseburger",
  weight: 40,
  price: 30,
  preview_description: Faker::Food.description,
  description: Faker::Lorem.paragraph(sentence_count: 2)
)
cheeseburger.image.attach(io: File.open("public/cheeseburger.jpg"), filename: "cheeseburger.jpg", content_type: "image/jpg")

100.times do
  Product.create(
    name: Faker::Food.dish,
    weight: rand(10..150),
    price: rand(1..15),
    preview_description: Faker::Food.description,
    description: Faker::Food.description,
  )
end

3.times do
  4.times do
    Review.create(
      body: Faker::Lorem.paragraph(sentence_count: 2),
      rating: rand(1..5),
      user: user,
      product: cheeseburger,
    )
  end

  4.times do
    Review.create(
      body: Faker::Lorem.paragraph(sentence_count: 2),
      rating: rand(1..5),
      user: user2,
      product: cheeseburger,
    )
  end

  4.times do
    Review.create(
      body: Faker::Lorem.paragraph(sentence_count: 2),
      rating: rand(1..5),
      user: user3,
      product: cheeseburger,
    )
  end
end