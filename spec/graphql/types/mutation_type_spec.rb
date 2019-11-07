require "rails_helper"

RSpec.describe Types::MutationType do
  subject { described_class }

  it { is_expected.to implement(::Types::GraphqlAuth) }
  it { is_expected.to have_field(:createProduct) }
end
