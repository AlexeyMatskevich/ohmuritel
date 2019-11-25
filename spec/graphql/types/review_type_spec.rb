require "rails_helper"

RSpec.describe Types::ReviewType do
  subject { described_class }

  it { is_expected.to have_field(:id).of_type("ID!") }
  it { is_expected.to have_field(:body).of_type("String!") }
  it { is_expected.to have_field(:rating).of_type("Int!") }
  it { is_expected.to have_field(:user).of_type("User!") }
  it { is_expected.to have_field(:product).of_type("Product!") }
end
