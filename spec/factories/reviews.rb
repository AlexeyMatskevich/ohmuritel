FactoryBot.define do
  factory :review do
    body { "Review" }
    rating { 5 }
    user
    product
  end
end
