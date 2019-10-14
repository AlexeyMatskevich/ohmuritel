require "yaml"
require "digest"

heroku_yaml = YAML.safe_load(File.read("heroku.yml"))

heroku_yaml["build"]["config"]["GEMFILE_SHA"] = Digest::SHA256.file("Gemfile.lock").to_s
heroku_yaml["build"]["config"]["YARN_SHA"] = Digest::SHA256.file("yarn.lock").to_s

File.open("heroku.yml", "w") { |file| file.write(heroku_yaml.to_yaml) }
