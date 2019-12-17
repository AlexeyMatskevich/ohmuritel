require "rails_helper"

describe Mutations::BaseMutation do
  subject { described_class }

  it { is_expected.to have_a_field(:errors).of_type("[AttributesError!]!") }
  it { is_expected.to have_a_field(:success).of_type("Boolean!") }
end
