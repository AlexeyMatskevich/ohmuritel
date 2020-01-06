Capybara.register_driver :selenium_chrome_in_container do |app|
  Capybara::Selenium::Driver.new app,
    browser: :remote,
    url: ENV["SELENIUM_REMOTE_URL"],
    desired_capabilities: :chrome
end

RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by :rack_test
  end

  config.before(:each, type: :system, js: true) do
    driven_by :selenium_chrome_in_container
    docker_ip = `/sbin/ip route|awk '/default/ { print $3 }'`.strip
    Capybara.server_host = "0.0.0.0"
    Capybara.server_port = 3001
    Capybara.app_host = "http://#{docker_ip}:3001"
  end
end
