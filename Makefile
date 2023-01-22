REGISTRY := $(shell echo businesspunk)
TAG := $(shell echo 1.0)

prod-build:
	docker build --pull --file=docker/prod/Dockerfile -t $(REGISTRY)/command-executor:$(TAG) .

publish:
	docker push $(REGISTRY)/command-executor:$(TAG)