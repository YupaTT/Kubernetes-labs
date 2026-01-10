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

## Quick start

```bash
kind create cluster --name k8s-lab --config 00-setup/cluster.yaml
kubectl cluster-info --context kind-k8s-lab
kubectl get nodes
```

## 00 · Setup

```bash
kind create cluster --name k8s-lab --config 00-setup/cluster.yaml
kubectl get nodes -o wide
```

## Clean up

```bash
kind delete cluster --name k8s-lab
```
