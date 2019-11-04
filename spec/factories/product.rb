FactoryBot.define do
  factory :product do
    # Use sequence to make sure that the value is unique
    sequence(:name) { |n| "Name-#{n}" }
    sequence(:weight) { |n| n * 25 }
    sequence(:price) { |n| n * 10 }
    sequence(:preview_description) { |n| "Lorem ipsum desctibe-#{n}" }
  end
end
