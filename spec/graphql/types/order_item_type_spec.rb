require "rails_helper"

describe Types::OrderItemType do
  subject { described_class }

  it { is_expected.to have_field(:id).of_type("ID!") }
  it { is_expected.to have_field(:product).of_type("Product!") }
  it { is_expected.to have_field(:quantity).of_type("Int!") }
end
