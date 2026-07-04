# 🏗️ System Architecture

## High-Level Design

```
GitHub Repository
    ↓
GitHub Actions (Tests → Build → Push)
    ↓
Docker Hub Registry
    ↓
Kubernetes (Minikube)
├─ Deployment (2 replicas)
├─ Service (ClusterIP)
├─ HPA (2-5 pods)
└─ ServiceMonitor
    ↓
Monitoring Stack (Loki + Promtail)
```

## Components

### Application Layer
- Express.js REST API
- Health check endpoints
- Prometheus metrics
- Error handling & logging

### Container Layer
- Docker multi-stage build
- Non-root user
- Health checks
- Port 3000

### CI/CD Layer
- GitHub Actions workflow
- Automated testing (23 tests)
- Docker build & push
- Automated deployment

### Kubernetes Layer
- Deployment (2 replicas)
- Service (ClusterIP)
- HPA (2-5 pods)
- ServiceMonitor

### Monitoring Layer
- Loki (log aggregation)
- Promtail (log collection)
- ServiceMonitor (metrics)

## Data Flows

**Request Flow:**
```
Client → Service → Pod 1/Pod 2 → Response
```

**Metrics Flow:**
```
Application → ServiceMonitor → Prometheus
```

**Logs Flow:**
```
Application → Promtail → Loki
```

## Scalability

- **Horizontal:** HPA auto-scales 2-5 pods based on CPU
- **Vertical:** Configurable resource limits
- **Performance:** 100+ RPS capacity, <500ms response time

## Security

- Non-root containers
- Read-only filesystem
- Resource limits enforced
- Health checks configured

---

**Version:** 1.0 | **Status:** Production Ready
