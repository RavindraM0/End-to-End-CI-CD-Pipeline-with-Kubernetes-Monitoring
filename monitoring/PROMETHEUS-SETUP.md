# Prometheus & Grafana Setup Guide

## Installation

### Prerequisites
- Kubernetes cluster (Minikube or cloud)
- Helm 3 installed
- kubectl configured

### Install Prometheus Stack

```bash
# Add Helm repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install with custom values
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  -f monitoring/prometheus-values.yaml
```

### Verify Installation

```bash
# Check pods
kubectl get pods -n monitoring

# Expected: All pods should be Running
```

## Access Grafana

```bash
# Port forward
kubectl port-forward -n monitoring svc/prometheus-grafana 3001:80 &

# Open browser
# URL: http://localhost:3001
# Username: admin
# Password: admin
```

## Access Prometheus

```bash
# Port forward
kubectl port-forward -n monitoring svc/prometheus-kube-prometheus-prometheus 9090:9090 &

# Open browser
# URL: http://localhost:9090
```

## Import Dashboard

1. Open Grafana (http://localhost:3001)
2. Click "+" → "Import"
3. Paste content of `dashboards/devops-app-dashboard.json`
4. Select "Prometheus" as datasource
5. Click "Import"

## Useful Prometheus Queries

```promql
# Request rate
rate(http_requests_total[5m])

# Latency p99
histogram_quantile(0.99, http_request_duration_seconds_bucket)

# Pod CPU
rate(container_cpu_usage_seconds_total{pod=~"devops-app.*"}[5m])

# Pod Memory
container_memory_usage_bytes{pod=~"devops-app.*"} / 1024 / 1024

# Error rate
rate(http_requests_total{status=~"5.."}[5m])
```

## Uninstall

```bash
helm uninstall prometheus -n monitoring
kubectl delete namespace monitoring
```

---

**Last Updated**: July 5, 2026
**Status**: Production Ready
