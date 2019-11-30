FactoryBot.define do
  factory :product do
    # Use sequence to make sure that the value is unique
    sequence(:name) { |n| "Name-#{n}" }
    weight { 25 }
    price { 15 }
    preview_description { "Description" }

    trait :with_image do
      image { FilesTestHelper.png }
    end

    trait :reindex do
      after(:create) do |product, _evaluator|
        product.reindex(refresh: true)
      end
    end
  end
end
