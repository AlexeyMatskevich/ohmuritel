require "rails_helper"

RSpec.describe "PageViews", js: true do
  it "shows the number of page views" do
    visit "/login"
    expect(page).to have_text("Sign in to ohmuritel")
  end
end
