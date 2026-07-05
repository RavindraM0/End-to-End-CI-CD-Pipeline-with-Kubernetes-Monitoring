# 📊 Monitoring Configuration

This directory contains Prometheus and Grafana configuration for the DevOps CI/CD Pipeline.

## Contents

- `prometheus-values.yaml` - Helm chart values for Prometheus Stack
- `dashboards/` - Grafana dashboards JSON
- `servicemonitor.yaml` - Kubernetes ServiceMonitor configuration
- `alert-rules.yaml` - Prometheus alert rules
- `PROMETHEUS-SETUP.md` - Setup and installation guide

## Quick Start

```bash
# Install Prometheus Stack
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  -f monitoring/prometheus-values.yaml

# Port forward Grafana
kubectl port-forward -n monitoring svc/prometheus-grafana 3001:80 &

# Open Grafana
# http://localhost:3001
# Login: admin / admin
```

## Dashboards

### DevOps App Metrics
- Real-time request metrics (RPS)
- Pod CPU and Memory usage
- Error rate and latency
- Pod replica count

## Alerts

Alert rules are defined in `alert-rules.yaml`:
- High error rate (>10% of requests)
- High latency (p95 >1s)
- Pod crashing
- High memory usage (>200Mi)

## Metrics Available

From your application (/metrics endpoint):
- `http_requests_total` - Total HTTP requests
- `http_request_duration_seconds_bucket` - Request latency
- `http_requests_total{status="5xx"}` - Error requests

From Kubernetes:
- `container_cpu_usage_seconds_total` - Pod CPU
- `container_memory_usage_bytes` - Pod Memory
- `kube_pod_info` - Pod information

## Useful Links

- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001
- Prometheus Docs: https://prometheus.io/docs
- Grafana Docs: https://grafana.com/docs

---

**Last Updated**: July 5, 2026
