CLUSTER ?= k8s-lab
APP_DIR := 04-configmaps-secrets/app
APP_IMAGE := config-demo:local

.PHONY: cluster delete-cluster test image load-image

cluster:
	kind create cluster --name $(CLUSTER) --config 00-setup/cluster.yaml

delete-cluster:
	kind delete cluster --name $(CLUSTER)

test:
	cd $(APP_DIR) && go vet ./... && go test -v ./...

image:
	docker build -t $(APP_IMAGE) $(APP_DIR)

load-image: image
	kind load docker-image $(APP_IMAGE) --name $(CLUSTER)
