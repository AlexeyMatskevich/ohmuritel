# Ohmuritel cheesecake

[![Ruby Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/testdouble/standard) 

## Installation
1. [Install docker](https://docs.docker.com/docker-for-mac/install/)
2. [Install docker-compose](https://docs.docker.com/compose/install/)
3. [Install dip](https://github.com/bibendi/dip#installation)
    ```shell script
    brew tap bibendi/dip
    brew install dip
    ```
    or
    ```shell script
    curl -L https://github.com/bibendi/dip/releases/download/3.8.3/dip-`uname -s`-`uname -m` > /usr/local/bin/dip
    chmod +x /usr/local/bin/dip
    ```
4. Use
   - bash command
    ```shell script
    eval "$(dip console)"
    ```
   - or use the prefix `dip` for the following console commands
   ###### It’s preferable to use the first option, it will add hints to your console
5. Run this command for build docker-compose and apply default setting
    ```shell script
    provision
    ```
6. Use default rails command using item 4 of this list
   - Example with `eval`
   ```shell script
   eval "$(dip console)"
   rails s
   RAILS_ENV=production rails c
   ```
   dip will auto provide all command to docker images with setting into dip.yml
   - Example with `dip` prefix
   ```shell script
   dip rails s
   dip RAILS_ENV=production rails c
   ```
## Info
1. [Stage](https://ohmuritel-stage.herokuapp.com/)
2. [Production](https://ohmuritel.herokuapp.com/)

## Development
1. Install [Lefthook](https://github.com/Arkweid/lefthook/blob/master/docs/full_guide.md#referencing-commands-from-lefthookyml)
    for apply git hooks
    ```shell script
    brew install Arkweid/lefthook/lefthook
    ```
    or other way from link
2. Use `lefthook run ${hook name}` for run hooks manual
3. Run `standardrb` to lint a ruby code
4. Run `standard` to lint a js code
4. Run `crystalball` ro run all ruby spec using [Regression Test Selection mechanism](https://tenderlovemaking.com/2015/02/13/predicting-test-failues.html)
5. Run `rspec` to run all ruby spec
###### You can see all supported commands in a `dip.yml`