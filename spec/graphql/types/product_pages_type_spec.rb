require "rails_helper"

RSpec.describe Types::ProductPagesType do
  subject { described_class }

  it { is_expected.to have_field(:id).of_type("ID!") }
  it { is_expected.to have_field(:products).of_type("[Product!]!") }
end
