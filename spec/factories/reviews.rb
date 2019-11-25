FactoryBot.define do
  factory :review do
    sequence(:body) { |n| "Review #{n}" }
    rating { 5 }
    user
    product
  end
end
