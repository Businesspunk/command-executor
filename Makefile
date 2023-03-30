REGISTRY := $(shell echo businesspunk)
TAG := $(shell echo 1.3.3)

prod-build:
	docker build --no-cache --pull --file=docker/prod/Dockerfile -t $(REGISTRY)/command-executor:latest -t $(REGISTRY)/command-executor:$(TAG) .

publish:
	docker push $(REGISTRY)/command-executor:$(TAG)