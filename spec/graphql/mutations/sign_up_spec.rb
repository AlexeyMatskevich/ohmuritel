require "rails_helper"

RSpec.describe Mutations::SignUp do
  subject { described_class }

  it { is_expected.to have_a_field(:user).of_type(Types::UserType) }
  it { is_expected.to have_a_field(:errors).of_type("[Error!]!") }
  it { is_expected.to have_a_field(:success).of_type("Boolean!") }
end
