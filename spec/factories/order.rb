FactoryBot.define do
  factory :order do
    transient do
      item_count { 1 }
    end

    user

    after :create do |order, evaluator|
      create_list :order_item, evaluator.item_count, order: order
    end
  end
end
