User.create(
  email: "admin@admin",
  first_name: "Admin",
  last_name: "Administrator",
  password: "12345678",
  role: :admin,
)

burger = Product.new(
  name: "Burger",
  weight: 40,
  price: 20,
  preview_description: Faker::Food.description,
  description: Faker::Lorem.paragraph(sentence_count: 2)
)

cheeseburgerer = Product.new(
  name: "Cheeseburgerer",
  weight: 40,
  price: 30,
  preview_description: Faker::Food.description,
  description: Faker::Lorem.paragraph(sentence_count: 2)
)

products = []
54.times do
  products << Product.new(
    name: Faker::Food.unique.dish,
    weight: rand(10..150),
    price: rand(1..15),
    preview_description: Faker::Food.description,
    description: Faker::Food.description,
  )
end

products << burger
products << cheeseburgerer
Product.import products
burger.image.attach(io: File.open("public/burger.jpg"), filename: "burger.jpg", content_type: "image/jpg")
cheeseburgerer.image.attach(io: File.open("public/cheeseburger.jpg"), filename: "cheeseburger.jpg", content_type: "image/jpg")

users = []
30.times do
  users << User.new(
    email: Faker::Internet.email,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    password: "12345678",
  )
end

User.import users

reviews = []

products.each_with_index do |product, i|
  reviews << Review.new(
    body: Faker::Lorem.paragraph,
    rating: rand(1..5),
    user: users[i % users.length],
    product: product,
  )
end

3.times do |i|
  4.times do
    reviews << Review.new(
      body: Faker::Lorem.paragraph,
      rating: rand(1..5),
      user: users[i],
      product: cheeseburgerer,
    )
  end

  4.times do
    reviews << Review.new(
      body: Faker::Lorem.paragraph,
      rating: rand(1..5),
      user: users[i],
      product: cheeseburgerer,
    )
  end

  4.times do
    reviews << Review.new(
      body: Faker::Lorem.paragraph,
      rating: rand(1..5),
      user: users[i],
      product: cheeseburgerer,
    )
  end
end

Review.import reviews

Product.reindex
