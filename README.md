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
| 02 | [replicasets-deployments](02-replicasets-deployments/) | Self-healing and scaling with ReplicaSets |

## Quick start

```bash
kind create cluster --name k8s-lab --config 00-setup/cluster.yaml
kubectl cluster-info --context kind-k8s-lab
kubectl get nodes
```

Clean up each lab before starting the next one:

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

## 02 · ReplicaSets

```bash
kubectl apply -f 02-replicasets-deployments/replicaset.yaml
kubectl get rs,pods
kubectl delete pod <one-of-the-pods>  # the ReplicaSet recreates it
kubectl scale rs nginx-rs --replicas=5
kubectl delete -f 02-replicasets-deployments/replicaset.yaml
```

## Clean up

```bash
kind delete cluster --name k8s-lab
```
