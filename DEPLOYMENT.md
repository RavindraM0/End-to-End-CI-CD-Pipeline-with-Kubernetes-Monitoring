# 🚀 Deployment Guide

## Deploy with kubectl

```bash
kubectl create namespace devops
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
minikube addons enable metrics-server
kubectl apply -f k8s/hpa.yaml
```

## Deploy with Helm

```bash
helm install devops-app helm/devops-app -n devops
```

## Verify Deployment

```bash
kubectl get pods -n devops
kubectl get svc -n devops
kubectl get hpa -n devops
```

## Port Forward & Test

```bash
kubectl port-forward -n devops svc/devops-app 3000:80 &
curl http://localhost:3000/health
curl http://localhost:3000/api/data
curl http://localhost:3000/api/users
```

## Troubleshooting

**Pods not starting**: `kubectl describe pod <POD> -n devops`
**View logs**: `kubectl logs -n devops -l app=devops-app -f`
**Check HPA**: `kubectl get hpa -n devops --watch`

## Scaling

Edit `k8s/hpa.yaml` to change minReplicas/maxReplicas

**Version**: 1.0 | **Last Updated**: July 4, 2026
