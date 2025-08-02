DOCKER_IMAGE_NAME := next-template
DOCKER_IMAGE_TAG := v1.0.0
DOCKERFILE_PATH := deploy/Dockerfile
DOCKER_COMPOSE_FILE := deploy/docker-compose.yaml

.PHONY: build build-nocache up down re

build:
	@docker build -f $(DOCKERFILE_PATH) \
		-t $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG) .

up:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) up -d

down:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) down

re:
	git pull && \
	docker-compose -f $(DOCKER_COMPOSE_FILE) down || true && \
	docker rmi -f $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG) || true && \
	$(MAKE) build && \
	docker-compose -f $(DOCKER_COMPOSE_FILE) up -d


