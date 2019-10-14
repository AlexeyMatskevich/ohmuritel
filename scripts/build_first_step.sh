#!/bin/bash

# Don't run build if there were no changes in gems
git diff --quiet --exit-code origin/master $SEMAPHORE_GIT_BRANCH -- Gemfile.lock && exit;
#git diff --quiet --exit-code HEAD^ HEAD -- Gemfile.lock && exit;

docker pull "$DOCKER_USERNAME"/ohmuritel-rails-base:"$GEMFILE_SHA"
DOCKER_BUILDKIT=1 docker build --file=.docker/Dockerfile.rails_base . --tag "$DOCKER_USERNAME"/ohmuritel-rails-base:"$GEMFILE_SHA"
docker push "$DOCKER_USERNAME"/ohmuritel-rails-base:"$GEMFILE_SHA"

docker pull "$DOCKER_USERNAME"/ohmuritel-rails-node:"$GEMFILE_SHA""$YARN_SHA"
DOCKER_BUILDKIT=1 docker build --file=.docker/Dockerfile.rails_node --build-arg GEMFILE_SHA=$GEMFILE_SHA . --tag "$DOCKER_USERNAME"/ohmuritel-rails-node:"$GEMFILE_SHA""$YARN_SHA"
docker push "$DOCKER_USERNAME"/ohmuritel-rails-node:"$GEMFILE_SHA""$YARN_SHA"