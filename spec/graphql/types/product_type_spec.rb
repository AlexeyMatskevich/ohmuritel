require "rails_helper"

RSpec.describe Types::ProductType do
  subject { described_class }

  it { is_expected.to have_field(:id).of_type("ID!") }
  it { is_expected.to have_field(:name).of_type("String!") }
  it { is_expected.to have_field(:weight).of_type("Int!") }
  it { is_expected.to have_field(:price).of_type("Int!") }
  it { is_expected.to have_field(:previewDescription).of_type("String!") }
  it { is_expected.to have_field(:description).of_type("String") }
end
