# ⚡ Quick Reference

## Essential Commands

**Logs**: `kubectl logs -n devops -l app=devops-app -f`
**Resources**: `kubectl top pods -n devops`
**HPA Watch**: `kubectl get hpa -n devops --watch`
**Port Forward**: `kubectl port-forward -n devops svc/devops-app 3000:80`
**Dashboard**: `./monitoring/monitor.sh`

## Common Tasks

**Scale pods**: `kubectl scale deployment devops-app --replicas=5 -n devops`
**Update image**: `kubectl set image deployment/devops-app devops-app=YOUR_USERNAME/devops-app:TAG -n devops`
**Restart pods**: `kubectl rollout restart deployment/devops-app -n devops`
**Get pods**: `kubectl get pods -n devops`
**Describe pod**: `kubectl describe pod <POD_NAME> -n devops`

## Helm Commands

**Install**: `helm install devops-app helm/devops-app -n devops`
**Upgrade**: `helm upgrade devops-app helm/devops-app -n devops`
**List**: `helm list -n devops`
**Uninstall**: `helm uninstall devops-app -n devops`

## Useful Aliases

```bash
alias k='kubectl'
alias kgp='kubectl get pods'
alias kl='kubectl logs -f'
alias kwp='kubectl get pods --watch'
alias ktp='kubectl top pods'
```

## Error Solutions

| Error | Fix |
|-------|-----|
| ImagePullBackOff | Image not in registry |
| CrashLoopBackOff | Check pod logs |
| Pending | Check resources |
| Connection refused | Check endpoints |

**Version**: 1.0
