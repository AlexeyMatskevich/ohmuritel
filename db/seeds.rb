# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
DESCRIPTION = "<div class=\"trix-content\">\n  <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h1><div>Ut enim ad minim <strong>veniam</strong>, quis nostrud exercitation ullamco laboris <strong>nisi</strong> ut aliquip ex ea <em>commodo consequat</em>. Duis aute irure dolor in <del>reprehenderit</del> in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br><br>\n</div><ol>\n<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>\n<li>Aliquam tincidunt mauris eu risus.</li>\n<li>Vestibulum auctor dapibus neque.<ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li></ul>\n</li>\n</ol><ul>\n<li>Aliquam tincidunt mauris eu risus.</li>\n<li>Vestibulum auctor dapibus neque.</li>\n</ul><pre> Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n    Aliquam tincidunt mauris eu risus.\n    Vestibulum auctor dapibus neque.</pre><h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h1><div>Ut enim ad minim <strong>veniam</strong>, quis nostrud exercitation ullamco laboris <strong>nisi</strong> ut aliquip ex ea <em>commodo consequat</em>. Duis aute irure dolor in <del>reprehenderit</del> in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br><br>\n</div><ol>\n<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>\n<li>Aliquam tincidunt mauris eu risus.</li>\n<li>Vestibulum auctor dapibus neque.<ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li></ul>\n</li>\n</ol><ul>\n<li>Aliquam tincidunt mauris eu risus.</li>\n<li>Vestibulum auctor dapibus neque.</li>\n</ul><pre> Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n    Aliquam tincidunt mauris eu risus.\n    Vestibulum auctor dapibus neque.</pre>\n</div>\n"

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
    {
      email: "admin@admin",
      first_name: "Jane",
      last_name: "Doe",
      password: "12345678",
      role: :admin,
    },
  ]
)

burger = Product.create(
  name: "Burger",
  weight: 40,
  price: 20,
  preview_description: Faker::Food.description,
  description: DESCRIPTION
)
burger.image.attach(io: File.open("public/burger.jpg"), filename: "burger.jpg", content_type: "image/jpg")
cheeseburger = Product.create(
  name: "Cheeseburger",
  weight: 40,
  price: 30,
  preview_description: Faker::Food.description,
  description: DESCRIPTION
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
