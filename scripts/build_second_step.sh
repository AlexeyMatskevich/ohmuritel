#!/bin/bash

function docker_tag_exists() {
    curl --silent -f -lSL https://hub.docker.com/v2/repositories/$1/tags/$2 > /dev/null
}

if docker_tag_exists "$DOCKER_USERNAME"/ohmuritel-rails-node "$GEMFILE_SHA""$YARN_SHA"; then
  echo "Docker image $DOCKER_USERNAME/ohmuritel-rails-node:$GEMFILE_SHA$YARN_SHA exist"
else
  DOCKER_BUILDKIT=1 docker build --quiet --file=.docker/Dockerfile.rails_node --build-arg GEMFILE_SHA=$GEMFILE_SHA . --tag "$DOCKER_USERNAME"/ohmuritel-rails-node:"$GEMFILE_SHA""$YARN_SHA"
  docker push "$DOCKER_USERNAME"/ohmuritel-rails-node:"$GEMFILE_SHA""$YARN_SHA"
fi
