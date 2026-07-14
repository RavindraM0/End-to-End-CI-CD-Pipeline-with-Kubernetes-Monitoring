Absolutely. In an interview, it's not enough to explain the architecture—you should also be able to demonstrate the project and explain the commands you used. Here's a structured guide.

---

# Important Commands Used in the Project

## 1. Clone the Repository

```bash
git clone https://github.com/RavindraM0/End-to-End-CI-CD-Pipeline-with-Kubernetes-Monitoring.git

cd End-to-End-CI-CD-Pipeline-with-Kubernetes-Monitoring
```

**Purpose:** Download the project from GitHub.

---

## 2. Install Dependencies

```bash
npm install
```

**Purpose:** Installs all Node.js packages from `package.json`.

---

## 3. Run the Application

```bash
npm start
```

or

```bash
node server.js
```

Application runs at:

```
http://localhost:3000
```

---

## 4. Run Tests

```bash
npm test
```

**Purpose:** Executes all 23 Jest unit tests.

---

## 5. Build Docker Image

```bash
docker build -t devops-app .
```

Check images:

```bash
docker images
```

---

## 6. Run Docker Container

```bash
docker run -d -p 3000:3000 devops-app
```

Check running containers

```bash
docker ps
```

Stop container

```bash
docker stop <container-id>
```

Remove container

```bash
docker rm <container-id>
```

---

## 7. Docker Compose

Start

```bash
docker compose up -d
```

Stop

```bash
docker compose down
```

View logs

```bash
docker compose logs
```

---

## 8. Push Docker Image

Login

```bash
docker login
```

Tag image

```bash
docker tag devops-app YOUR_USERNAME/devops-app:v1
```

Push

```bash
docker push YOUR_USERNAME/devops-app:v1
```

---

# Kubernetes Commands

## Create Namespace

```bash
kubectl create namespace devops
```

---

## Deploy Application

```bash
kubectl apply -f k8s/
```

---

## Check Pods

```bash
kubectl get pods -n devops
```

Expected

```
2/2 Running
```

---

## View Deployments

```bash
kubectl get deployments -n devops
```

---

## View Services

```bash
kubectl get svc -n devops
```

---

## Describe Deployment

```bash
kubectl describe deployment devops-app -n devops
```

---

## View Logs

```bash
kubectl logs -n devops -l app=devops-app -f
```

---

## Restart Deployment

```bash
kubectl rollout restart deployment devops-app -n devops
```

---

## Check Rollout

```bash
kubectl rollout status deployment devops-app -n devops
```

---

## Scale Pods

```bash
kubectl scale deployment devops-app --replicas=5 -n devops
```

---

## Delete Deployment

```bash
kubectl delete -f k8s/
```

---

# HPA Commands

View HPA

```bash
kubectl get hpa -n devops
```

Watch Scaling

```bash
kubectl get hpa --watch
```

View CPU

```bash
kubectl top pods -n devops
```

---

# Helm Commands

Install

```bash
helm install devops-app helm/devops-app -n devops
```

Upgrade

```bash
helm upgrade devops-app helm/devops-app -n devops
```

List

```bash
helm list -n devops
```

Uninstall

```bash
helm uninstall devops-app -n devops
```

---

# Monitoring Commands

Prometheus Metrics

```
http://localhost:3000/metrics
```

Health

```
http://localhost:3000/health
```

Readiness

```
http://localhost:3000/ready
```

Users API

```
http://localhost:3000/api/users
```

Data API

```
http://localhost:3000/api/data
```

---

# Git Commands

Status

```bash
git status
```

Add

```bash
git add .
```

Commit

```bash
git commit -m "Added Kubernetes deployment"
```

Push

```bash
git push origin main
```

---

# GitHub Actions

After

```bash
git push origin main
```

Pipeline automatically

✅ Install dependencies

↓

✅ Run Tests

↓

✅ Build Docker Image

↓

✅ Push Docker Image

↓

✅ Ready for Deployment

---

# How to View the Application Live (Step by Step)

### Option 1: Run Locally (Simplest)

### Step 1

Clone the project.

```bash
git clone https://github.com/RavindraM0/End-to-End-CI-CD-Pipeline-with-Kubernetes-Monitoring.git
```

### Step 2

Go inside the project.

```bash
cd End-to-End-CI-CD-Pipeline-with-Kubernetes-Monitoring
```

### Step 3

Install dependencies.

```bash
npm install
```

### Step 4

Start the application.

```bash
npm start
```

### Step 5

Open your browser.

```
http://localhost:3000
```

Try these endpoints:

```
http://localhost:3000/health
http://localhost:3000/ready
http://localhost:3000/api/users
http://localhost:3000/api/data
http://localhost:3000/metrics
```

---

## Option 2: Run Using Docker

Build:

```bash
docker build -t devops-app .
```

Run:

```bash
docker run -d -p 3000:3000 devops-app
```

Visit:

```
http://localhost:3000
```

---

## Option 3: Run Using Kubernetes (Local Cluster)

Start your local cluster (e.g., Minikube, Kind, Docker Desktop Kubernetes, or Floci).

Apply the manifests:

```bash
kubectl apply -f k8s/
```

Verify pods:

```bash
kubectl get pods -n devops
```

Forward the service to your local machine:

```bash
kubectl port-forward -n devops svc/devops-app 3000:80
```

Now open:

```
http://localhost:3000
```

You can also test:

```
http://localhost:3000/health
http://localhost:3000/metrics
```

---

# How to Explain the Live Demo in an Interview

> "First, I clone the repository and install the dependencies. Then I run the application locally using Node.js or Docker. For Kubernetes, I apply the deployment manifests, verify that the pods are in the Running state, and expose the service using `kubectl port-forward`. Once the application is accessible on `localhost:3000`, I verify the health endpoint, API endpoints, and Prometheus metrics. Finally, I demonstrate Kubernetes features like viewing logs, checking deployments, and scaling the application with HPA."

This flow shows that you understand not only the code but also how to build, deploy, verify, monitor, and operate the application end to end—exactly what interviewers look for in a DevOps project discussion.
