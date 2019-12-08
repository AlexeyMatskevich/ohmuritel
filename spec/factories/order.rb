FactoryBot.define do
  factory :order do
    user

    after :create do |order|
      create_list :order_item, 2, order: order
    end
  end
end
