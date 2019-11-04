require "rails_helper"

RSpec.describe Types::AttributesError do
  subject { described_class }

  it { is_expected.to have_field(:field).of_type("String!") }
  it { is_expected.to have_field(:message).of_type("String!") }
  it { is_expected.to have_field(:details).of_type("JSON") }
end
