#!/bin/bash

function docker_tag_exists() {
    curl --silent -f -lSL https://hub.docker.com/v2/repositories/$1/tags/$2 > /dev/null
}

if docker_tag_exists "$DOCKER_USERNAME"/ohmuritel-rails-base $GEMFILE_SHA; then
  echo "Docker image $DOCKER_USERNAME/ohmuritel-rails-base:$GEMFILE_SHA exist"
else
  DOCKER_BUILDKIT=1 docker build --quiet --file=.docker/Dockerfile.rails_base . --tag "$DOCKER_USERNAME"/ohmuritel-rails-base:"$GEMFILE_SHA"
  docker push "$DOCKER_USERNAME"/ohmuritel-rails-base:"$GEMFILE_SHA"
fi
