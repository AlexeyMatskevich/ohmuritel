require "rails_helper"

RSpec.describe Mutations::BaseMutation do
  subject { described_class }

  it { is_expected.to have_a_field(:errors).of_type("[AttributesError!]!") }
end
