# 🚀 Deployment Guide

## Prerequisites

```bash
Node.js 18+
Docker
Minikube (3GB memory)
kubectl
Helm 3
```

## Deployment Steps

### Step 1: Build & Test Locally

```bash
npm install
npm test
docker build -t devops-app:latest .
docker run -p 3000:3000 devops-app:latest
```

### Step 2: Push to Registry

```bash
docker tag devops-app:latest YOUR_USERNAME/devops-app:latest
docker login
docker push YOUR_USERNAME/devops-app:latest
```

### Step 3: Deploy to Kubernetes

```bash
kubectl create namespace devops
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
minikube addons enable metrics-server
kubectl apply -f k8s/hpa.yaml
```

### Step 4: Verify Deployment

```bash
kubectl get pods -n devops
kubectl get svc -n devops
kubectl get hpa -n devops
```

### Step 5: Access Application

```bash
kubectl port-forward -n devops svc/devops-app 3000:80
curl http://localhost:3000/health
```

## Helm Deployment

```bash
helm install devops-app helm/devops-app -n devops --create-namespace
helm list -n devops
helm upgrade devops-app helm/devops-app -n devops
helm uninstall devops-app -n devops
```

## Troubleshooting

**Pods not starting:**
```bash
kubectl describe pod <POD_NAME> -n devops
kubectl logs <POD_NAME> -n devops
```

**Service not accessible:**
```bash
kubectl get svc -n devops
kubectl get endpoints -n devops
```

**HPA not scaling:**
```bash
kubectl get hpa -n devops
kubectl describe hpa -n devops
```

---

**Version:** 1.0 | **Last Updated:** July 2026
