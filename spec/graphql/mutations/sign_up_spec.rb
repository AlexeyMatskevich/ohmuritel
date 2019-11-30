require "rails_helper"

describe Mutations::SignUp do
  subject { described_class }

  it { is_expected.to have_a_field(:user).of_type(Types::UserType) }
end
