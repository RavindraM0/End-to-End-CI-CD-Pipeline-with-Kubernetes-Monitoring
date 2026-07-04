#!/bin/bash

echo "╔════════════════════════════════════════════════════════╗"
echo "║     DevOps App - Manual Monitoring Dashboard            ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

echo "📊 RESOURCE USAGE"
echo "─────────────────────────────────────────────────────────"
echo "Pod Resources:"
kubectl top pods -n devops
echo ""
echo "Node Resources:"
kubectl top nodes
echo ""

echo "📝 RECENT LOGS (Last 20 lines)"
echo "─────────────────────────────────────────────────────────"
kubectl logs -n devops -l app=devops-app --tail=20
echo ""

echo "🏃 POD STATUS"
echo "─────────────────────────────────────────────────────────"
kubectl get pods -n devops -o wide
echo ""

echo "🔍 LOKI STATUS"
echo "─────────────────────────────────────────────────────────"
kubectl get pods -n monitoring
echo ""

echo "📈 HPA STATUS"
echo "─────────────────────────────────────────────────────────"
kubectl get hpa -n devops
echo ""

echo "✅ Monitoring Dashboard Complete"
