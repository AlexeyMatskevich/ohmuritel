#!/bin/bash

# Don't run build if there were no changes in yarn
git diff --quiet --exit-code origin/master $SEMAPHORE_GIT_BRANCH -- yarn.lock && exit;

docker pull "$DOCKER_USERNAME"/ohmuritel-rails-node:"$GEMFILE_SHA""$YARN_SHA"
DOCKER_BUILDKIT=1 docker build --file=.docker/Dockerfile.rails_node --build-arg GEMFILE_SHA=$GEMFILE_SHA . --tag "$DOCKER_USERNAME"/ohmuritel-rails-node:"$GEMFILE_SHA""$YARN_SHA"
docker push "$DOCKER_USERNAME"/ohmuritel-rails-node:"$GEMFILE_SHA""$YARN_SHA"