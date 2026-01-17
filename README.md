# Kubernetes Lab

Hands-on Kubernetes labs that run on a local [kind](https://kind.sigs.k8s.io/) cluster. Each folder is a self-contained lab with the manifests you apply and the commands to explore the result. Work through them in order: each lab builds on the previous one.

## Prerequisites

| Tool | Used for |
|------|----------|
| [Docker](https://docs.docker.com/get-docker/) | Runs the kind nodes as containers |
| [kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation) | Local multi-node cluster |
| [kubectl](https://kubernetes.io/docs/tasks/tools/) | Talks to the cluster |

## Labs

| # | Lab | Topics |
|---|-----|--------|
| 00 | [setup](00-setup/) | 3-node kind cluster (1 control plane + 2 workers) |
| 01 | [pods](01-pods/) | Pods, image pull errors, `describe` / `logs` / `exec` |
| 02 | [replicasets-deployments](02-replicasets-deployments/) | Self-healing, scaling, rolling updates, rollbacks |
| 03 | [services](03-services/) | ClusterIP, label selectors, in-cluster DNS |
| 04 | [configmaps-secrets](04-configmaps-secrets/) | Storing config and credentials in the cluster |

## Quick start

```bash
kind create cluster --name k8s-lab --config 00-setup/cluster.yaml
kubectl cluster-info --context kind-k8s-lab
kubectl get nodes
```

Several labs reuse names and labels (`app: nginx`, `app: backend`), so **clean up each lab before starting the next one**:

```bash
kubectl delete -f <lab-folder>/
```

## 00 · Setup

```bash
kind create cluster --name k8s-lab --config 00-setup/cluster.yaml
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

```bash
kubectl apply -f 04-configmaps-secrets/configmap.yaml -f 04-configmaps-secrets/secret.yaml
kubectl describe configmap backend-config
kubectl get secret database-secret -o yaml
kubectl get secret database-secret -o jsonpath='{.data.DB_USERNAME}' | base64 -d
```

> Secrets are base64-encoded, **not encrypted**. Never commit real credentials.

## Clean up

```bash
kind delete cluster --name k8s-lab
```
