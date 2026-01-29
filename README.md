# Kubernetes Lab

Hands-on Kubernetes labs that run on a local [kind](https://kind.sigs.k8s.io/) cluster. Each folder is a self-contained lab with the manifests you apply and the commands to explore the result. Work through them in order: each lab builds on the previous one.

## Prerequisites

| Tool | Used for |
|------|----------|
| [Docker](https://docs.docker.com/get-docker/) | Runs the kind nodes as containers |
| [kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation) | Local multi-node cluster |
| [kubectl](https://kubernetes.io/docs/tasks/tools/) | Talks to the cluster |
| [Go](https://go.dev/dl/) 1.24+ | Demo app and its tests (lab 04) |
| `make`, `curl`, `openssl` | Helpers, testing Ingress, TLS certificates |

## Labs

| # | Lab | Topics |
|---|-----|--------|
| 00 | [setup](00-setup/) | 3-node kind cluster (1 control plane + 2 workers) |
| 01 | [pods](01-pods/) | Pods, image pull errors, `describe` / `logs` / `exec` |
| 02 | [replicasets-deployments](02-replicasets-deployments/) | Self-healing, scaling, rolling updates, rollbacks |
| 03 | [services](03-services/) | ClusterIP, label selectors, in-cluster DNS |
| 04 | [configmaps-secrets](04-configmaps-secrets/) | Injecting config and credentials as env vars (Go demo app) |
| 05 | [storage](05-storage/) | `emptyDir`, PersistentVolumeClaims, dynamic provisioning |
| 06 | [statefulsets](06-statefulsets/) | Stable identities, headless Services, per-replica volumes |
| 07 | [ingress](07-ingress/) | ingress-nginx, path/host routing, TLS. Has its own [README](07-ingress/README.md) |

## Quick start

```bash
make cluster                       # kind create cluster --name k8s-lab
kubectl cluster-info --context kind-k8s-lab
kubectl get nodes
```

Labs 01 to 06 share this cluster. Lab 07 creates its own cluster because it needs host ports 80/443.

Several labs reuse names and labels (`app: nginx`, `app: backend`), so **clean up each lab before starting the next one**:

```bash
kubectl delete -f <lab-folder>/
```

## 00 · Setup

```bash
make cluster
kubectl get nodes -o wide
```

## 01 · Pods

```bash
kubectl apply -f 01-pods/nginx.yaml
kubectl get pods -o wide
kubectl describe pod nginx
kubectl logs nginx
kubectl exec -it nginx -- sh

kubectl apply -f 01-pods/nginx-broken.yaml
kubectl get pod broken-nginx          # ErrImagePull / ImagePullBackOff
kubectl describe pod broken-nginx     # read the Events section

kubectl delete -f 01-pods/
```

## 02 · ReplicaSets & Deployments

```bash
kubectl apply -f 02-replicasets-deployments/replicaset.yaml
kubectl get rs,pods
kubectl delete pod <one-of-the-pods>  # the ReplicaSet recreates it
kubectl delete -f 02-replicasets-deployments/replicaset.yaml

kubectl apply -f 02-replicasets-deployments/deployment.yaml
kubectl scale deployment nginx-deployment --replicas=4
kubectl set image deployment/nginx-deployment nginx=nginx:1.29
kubectl rollout status deployment/nginx-deployment
kubectl rollout history deployment/nginx-deployment
kubectl rollout undo deployment/nginx-deployment

kubectl delete -f 02-replicasets-deployments/
```

> Apply the ReplicaSet and the Deployment one at a time: they select the same `app: nginx` label.

## 03 · Services

```bash
kubectl apply -f 03-services/
kubectl get svc,endpointslices
kubectl run client --rm -it --image=curlimages/curl --restart=Never -- \
  sh -c 'for i in 1 2 3 4 5; do curl -s backend-service | grep Hostname; done'
kubectl port-forward svc/backend-service 8080:80   # then: curl localhost:8080

kubectl delete -f 03-services/
```

Each request lands on a different Pod: the Service load-balances across all Pods matching `app: backend`.

## 04 · ConfigMaps & Secrets

The [demo app](04-configmaps-secrets/app/) is a small Go HTTP server that returns its configuration as JSON (never the password) and exposes `/healthz`.

```bash
make test         # go vet + go test
make load-image   # docker build + kind load docker-image config-demo:local

kubectl apply -f 04-configmaps-secrets/
kubectl rollout status deployment/config-demo
kubectl port-forward deploy/config-demo 8080:8080
curl localhost:8080
# {"app_env":"development","log_level":"debug","api_url":"http://api.example.com","db_username":"CHANGE_ME_USERNAME","db_password_set":true}

kubectl get secret database-secret -o jsonpath='{.data.DB_USERNAME}' | base64 -d

kubectl delete -f 04-configmaps-secrets/
```

Change a value in `configmap.yaml`, re-apply it and run `kubectl rollout restart deployment/config-demo`: env vars are only read when the container starts.

> Secrets are base64-encoded, **not encrypted**. Never commit real credentials.

## 05 · Storage

```bash
kubectl apply -f 05-storage/pod.yaml
kubectl exec volume-demo -- sh -c 'echo hello > /data/file && cat /data/file'
kubectl delete pod volume-demo       # emptyDir data is gone with the Pod

kubectl apply -f 05-storage/pvc.yaml -f 05-storage/deployment.yaml
kubectl get pvc,pv                   # kind's local-path provisioner creates the PV
kubectl exec deploy/storage-demo -- sh -c 'echo persisted > /data/file'
kubectl rollout restart deployment/storage-demo
kubectl exec deploy/storage-demo -- cat /data/file   # still there

kubectl delete -f 05-storage/
```

## 06 · StatefulSets

```bash
kubectl apply -f 06-statefulsets/
kubectl get pods -w                  # web-0, web-1, web-2 created in order
kubectl get pvc                      # one PVC per replica: www-web-0, www-web-1, ...

kubectl exec web-0 -- sh -c 'echo web-0 > /usr/share/nginx/html/index.html'
kubectl delete pod web-0             # comes back with the same name and volume
kubectl exec web-0 -- cat /usr/share/nginx/html/index.html

kubectl run client --rm -it --image=busybox:1.36 --restart=Never -- nslookup web-0.nginx

kubectl delete -f 06-statefulsets/
kubectl delete pvc -l app=nginx      # PVCs are kept on purpose; delete them by hand
```

## 07 · Ingress

Follow [07-ingress/README.md](07-ingress/README.md). It uses its own cluster:

```bash
make delete-cluster   # optional, frees resources
kind create cluster --name ingress --config 07-ingress/cluster.yaml
```

## Clean up

```bash
make delete-cluster
kind delete cluster --name ingress
```
