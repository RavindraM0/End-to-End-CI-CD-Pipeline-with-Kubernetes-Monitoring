# ⚡ Quick Reference Guide

## Essential Commands

**Local Development:**
```bash
npm install
npm test
npm start
docker build -t devops-app .
docker run -p 3000:3000 devops-app
```

**Kubernetes:**
```bash
kubectl get pods -n devops
kubectl get svc -n devops
kubectl get hpa -n devops
kubectl logs -n devops -l app=devops-app -f
kubectl top pods -n devops
kubectl port-forward -n devops svc/devops-app 3000:80
```

**Helm:**
```bash
helm install devops-app helm/devops-app -n devops
helm upgrade devops-app helm/devops-app -n devops
helm uninstall devops-app -n devops
helm list -n devops
```

## Common Tasks

**Scale Pods:**
```bash
kubectl scale deployment devops-app --replicas=5 -n devops
```

**Update Image:**
```bash
kubectl set image deployment/devops-app devops-app=YOUR_USERNAME/devops-app:TAG -n devops
```

**Restart Pods:**
```bash
kubectl rollout restart deployment/devops-app -n devops
```

**View Logs (Real-time):**
```bash
kubectl logs -n devops -l app=devops-app -f
```

**Monitor Resources:**
```bash
kubectl top pods -n devops
kubectl get hpa -n devops --watch
```

## Useful Aliases

```bash
alias k='kubectl'
alias kgp='kubectl get pods'
alias kgs='kubectl get svc'
alias kl='kubectl logs -f'
alias kwp='kubectl get pods --watch'
alias ktp='kubectl top pods'
```

## Common Errors

| Error | Solution |
|-------|----------|
| ImagePullBackOff | Image not in registry |
| CrashLoopBackOff | Check pod logs |
| Pending | Check resource availability |
| Connection refused | Check service endpoints |

---

**Version:** 1.0
