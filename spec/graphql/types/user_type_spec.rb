require "rails_helper"

RSpec.describe Types::UserType do
  subject { described_class }

  it { is_expected.to have_field(:id).of_type("ID!") }
  it { is_expected.to have_field(:email).of_type("String!") }
  it { is_expected.to have_field(:firstName).of_type("String!") }
  it { is_expected.to have_field(:lastName).of_type("String!") }
  it { is_expected.to have_field(:fullName).of_type("String!") }
end