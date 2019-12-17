require "rails_helper"

describe Types::OrderType do
  subject { described_class }

  it { is_expected.to have_field(:id).of_type("ID!") }
  it { is_expected.to have_field(:user).of_type("User!") }
  it { is_expected.to have_field(:orderItems).of_type("[OrderItem!]!") }
  it { is_expected.to have_field(:orderCount).of_type("Int!") }
end
