# 📊 DevOps App Monitoring Guide

## Components Installed

### Loki
- **Purpose**: Log aggregation and storage
- **Status**: Running in monitoring namespace
- **Pod**: loki-0
- **Port**: 3100 (internal)

### Promtail
- **Purpose**: Collect logs from all pods
- **Status**: Running as DaemonSet
- **Port**: 9080 (internal)

## Accessing Logs

### Option 1: kubectl logs (Recommended)
```bash
# View app logs in real-time
kubectl logs -n devops -l app=devops-app -f

# View recent logs (last 50 lines)
kubectl logs -n devops -l app=devops-app --tail=50

# View logs from specific pod
kubectl logs -n devops <POD_NAME>
```

### Option 2: Use Monitoring Script
```bash
./monitoring/monitor.sh
```

## Monitoring Metrics

### Resource Usage
```bash
# Pod resource usage
kubectl top pods -n devops

# Node resource usage
kubectl top nodes
```

### Pod Status
```bash
# Check pod status
kubectl get pods -n devops -o wide

# Describe specific pod
kubectl describe pod <POD_NAME> -n devops
```

### HPA Status
```bash
# Check auto-scaling
kubectl get hpa -n devops

# Watch HPA changes
kubectl get hpa -n devops --watch
```

## Useful Commands

```bash
# Monitor logs in real-time
kubectl logs -n devops -l app=devops-app -f

# Get pod events
kubectl get events -n devops

# Check pod startup logs
kubectl logs -n devops <POD_NAME> --previous

# Resource usage trend
watch kubectl top pods -n devops
```

## Common Tasks

### View All Logs
```bash
./monitoring/monitor.sh
```

### Check Pod Health
```bash
kubectl get pods -n devops
kubectl describe pod <POD_NAME> -n devops
```

### Monitor Real-Time Logs
```bash
kubectl logs -n devops -l app=devops-app -f
```

### Check Resource Limits
```bash
kubectl describe node
kubectl top nodes
```

## Next Steps

When system resources improve, can add:
- Prometheus (metrics collection)
- Grafana (dashboards)
- AlertManager (alerting)
