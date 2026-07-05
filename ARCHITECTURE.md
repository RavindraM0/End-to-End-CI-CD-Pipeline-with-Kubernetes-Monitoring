# 🏗️ System Architecture

## Architecture Flow
## Components

### Application Layer
- Express.js REST API
- Health endpoints (/health, /ready, /api/data, /api/users)
- Prometheus metrics (/metrics)

### Container Layer
- Docker multi-stage build
- Non-root user (uid: 1001)
- Health checks enabled

### CI/CD Layer
- GitHub Actions automation
- Automated testing (23 tests)
- Docker build & push

### Kubernetes Layer
- Deployment (2 replicas)
- Service (ClusterIP)
- HPA (2-5 pods, 70% CPU, 80% Memory)
- ServiceMonitor

### Monitoring Layer
- Loki (log aggregation)
- Promtail (log collection)
- ServiceMonitor (metrics ready)

## Data Flow

**Requests**: Client → Service → Pod 1/Pod 2 → Response

**Metrics**: Application → ServiceMonitor → Prometheus (ready)

**Logs**: Application → Promtail → Loki

## Scalability

- Horizontal: HPA auto-scales 2-5 pods
- Performance: 100+ RPS capacity
- Response Time: <500ms

## Security

✅ Non-root containers
✅ Read-only filesystem
✅ Resource limits
✅ Health checks
✅ Network policies ready

**Version**: 1.0 | **Status**: Production Ready
