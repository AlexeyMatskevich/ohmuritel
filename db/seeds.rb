# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
PREVIEW_DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

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
  preview_description: PREVIEW_DESCRIPTION,
  description: DESCRIPTION
)
burger.image.attach(io: File.open("public/burger.jpg"), filename: "burger.jpg", content_type: "image/jpg")
cheeseburger = Product.create(
  name: "Cheeseburger",
  weight: 40,
  price: 30,
  preview_description: PREVIEW_DESCRIPTION,
  description: DESCRIPTION
)
cheeseburger.image.attach(io: File.open("public/cheeseburger.jpg"), filename: "cheeseburger.jpg", content_type: "image/jpg")
Product.create!(
  [
    {
      name: "Echpochmak",
      weight: 40,
      price: 25,
      preview_description: PREVIEW_DESCRIPTION,
      description: DESCRIPTION,
    },
    {
      name: "Bun with cottage cheese",
      weight: 40,
      price: 40,
      preview_description: PREVIEW_DESCRIPTION,
      description: DESCRIPTION,
    },
    {
      name: "Bun with meat",
      weight: 40,
      price: 14,
      preview_description: PREVIEW_DESCRIPTION,
      description: DESCRIPTION,
    },
    {
      name: "Bun with strawberries",
      weight: 40,
      price: 5,
      preview_description: PREVIEW_DESCRIPTION,
      description: DESCRIPTION,
    },
    {
      name: "Muffin roll",
      weight: 40,
      price: 2,
      preview_description: PREVIEW_DESCRIPTION,
      description: DESCRIPTION,
    },
    {
      name: "bread",
      weight: 40,
      price: 3,
      preview_description: PREVIEW_DESCRIPTION,
      description: DESCRIPTION,
    },
  ]
)
