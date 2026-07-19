# Terraform Interview Handbook (Freshers)
## Part 1 – Terraform Basics (Q1–Q10)

> **Interview Level:** B.Tech CSE Fresher
>
> **Focus:** Most Repeated MNC Questions (TCS, Infosys, Accenture, Capgemini, Cognizant, Deloitte, IBM, LTIMindtree, Oracle, Wipro)

---

# Q1. What is Terraform?

### Interview Answer

Terraform is an open-source **Infrastructure as Code (IaC)** tool developed by HashiCorp. It allows us to create, update, and manage cloud infrastructure using code instead of manually creating resources through the cloud console.

It supports multiple cloud providers like AWS, Azure, Google Cloud, Kubernetes, GitHub, and many others.

---

### Real-Life Example

Instead of manually creating:

- EC2
- VPC
- S3 Bucket
- Security Group

I write Terraform code once and Terraform creates everything automatically.

---

### Follow-up

**Q:** Who developed Terraform?

**A:** HashiCorp.

---

# Q2. Why do we use Terraform?

### Interview Answer

Terraform is used to automate infrastructure provisioning.

Benefits include:

- Automation
- Faster deployments
- Less manual work
- Version control using Git
- Easy rollback
- Consistent environments
- Infrastructure becomes reusable

---

### Interview Example

Instead of creating 20 EC2 instances manually,

I write one Terraform file and Terraform creates all 20 automatically.

---

### Follow-up

**Q:** What problem does Terraform solve?

**A:** It eliminates manual infrastructure creation and reduces human errors.

---

# Q3. What is Infrastructure as Code (IaC)?

### Interview Answer

Infrastructure as Code means managing infrastructure using code instead of manually creating resources.

Everything is stored in files and can be version controlled using Git.

---

### Without IaC

Developer manually creates:

- EC2
- VPC
- IAM
- Security Groups

Every time.

---

### With IaC

Run one command:

```bash
terraform apply
```

Terraform creates everything automatically.

---

### Follow-up

**Q:** Name some IaC tools.

**Answer

- Terraform
- AWS CloudFormation
- Pulumi

---

# Q4. What is the difference between Declarative and Imperative?

### Interview Answer

### Declarative

You tell Terraform **what** infrastructure you need.

Terraform decides **how** to create it.

Example:

"I need one EC2 instance."

---

### Imperative

You tell the system every step.

Example:

1. Login
2. Create VPC
3. Create subnet
4. Create EC2
5. Attach Security Group

---

### Interview One-liner

Terraform is **Declarative**.

Shell scripting is **Imperative**.

---

### Follow-up

**Q:** Which approach does Terraform use?

**Answer**

Declarative.

---

# Q5. What are Providers in Terraform?

### Interview Answer

Providers are plugins that allow Terraform to communicate with cloud providers.

Examples:

- AWS
- Azure
- Google Cloud
- Kubernetes
- GitHub

Without a provider Terraform doesn't know where to create resources.

---

### Example Code

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}
```

---

### Follow-up

**Q:** Can Terraform use multiple providers?

**Answer**

Yes.

Example:

- AWS
- GitHub
- Kubernetes

inside the same project.

---

# Q6. What is a Resource?

### Interview Answer

A resource is any infrastructure component Terraform manages.

Examples:

- EC2
- S3 Bucket
- IAM User
- VPC
- Security Group

Every resource has:

- Type
- Name

---

### Example

```hcl
resource "aws_instance" "web" {

  ami           = "ami-0abcdef123456"

  instance_type = "t2.micro"

}
```

Here,

aws_instance → Resource Type

web → Resource Name

---

### Interview Tip

Everything Terraform creates is called a Resource.

---

### Follow-up

**Q:** Give three Terraform resources.

**Answer**

- aws_instance
- aws_s3_bucket
- aws_vpc

---

# Q7. What is a Terraform State File?

### Interview Answer

Terraform stores information about all created resources in a file called

```
terraform.tfstate
```

It keeps track of:

- Resource IDs
- Current infrastructure
- Dependencies

Terraform compares this file with the code before making changes.

---

### Why is it important?

Without the state file,

Terraform doesn't know what resources already exist.

---

### Interview Example

You create:

- EC2
- VPC
- IAM

Terraform stores their IDs inside the state file.

---

### Follow-up

**Q:** Can we delete the state file?

**Answer**

No.

Losing the state file makes Terraform lose track of existing resources.

---

# Q8. What is a Backend?

### Interview Answer

A backend tells Terraform where the state file is stored.

Two types:

### Local Backend

Stores state on your laptop.

### Remote Backend

Stores state remotely.

Example:

- AWS S3
- Terraform Cloud

---

### Why Remote Backend?

In companies multiple developers work together.

Everyone should use the same state file.

---

### Example

```hcl
terraform {

 backend "s3" {

 bucket = "terraform-state"

 key = "prod/terraform.tfstate"

 region = "ap-south-1"

 }

}
```

---

### Follow-up

**Q:** Which backend is commonly used in AWS?

**Answer**

Amazon S3.

---

# Q9. Explain Terraform Workflow.

### Interview Answer

Terraform follows four main steps.

### Step 1

Initialize

```bash
terraform init
```

Downloads providers.

---

### Step 2

Plan

```bash
terraform plan
```

Shows what changes Terraform will make.

---

### Step 3

Apply

```bash
terraform apply
```

Creates infrastructure.

---

### Step 4

Destroy

```bash
terraform destroy
```

Deletes infrastructure.

---

### Interview Flow

Write Code

↓

Init

↓

Plan

↓

Apply

↓

Destroy

---

### Follow-up

**Q:** Which command shows changes without creating resources?

**Answer**

terraform plan

---

# Q10. Why is Terraform better than manually creating resources?

### Interview Answer

Terraform provides:

- Automation
- Faster deployments
- Version control
- Reusable code
- Easy rollback
- Team collaboration
- Less human error
- Multi-cloud support

Manual creation is slow and error-prone.

---

### Interview Scenario

Suppose a company needs 100 EC2 instances.

Manual Method:

Create one by one.

Terraform:

```bash
terraform apply
```

All 100 instances are created automatically.

---

### Follow-up

**Q:** Can Terraform manage multiple cloud providers?

**Answer**

Yes.

It supports:

- AWS
- Azure
- Google Cloud
- Kubernetes
- GitHub
- VMware
- Oracle Cloud
- Many more.

---

# ⭐ Freshers Interview Tips

### Remember this order:

```
IaC
↓

Terraform

↓

Provider

↓

Resource

↓

State File

↓

Backend

↓

Workflow

↓

Commands

↓

Variables

↓

Modules
```

---

# Most Repeated Interview Questions

✅ What is Terraform?

✅ Why Terraform?

✅ What is IaC?

✅ Provider

✅ Resource

✅ State File

✅ Backend

✅ Workflow

✅ Declarative vs Imperative

✅ Why Terraform over Manual Deployment?

---
**Next:** Part 2 – Terraform Commands & Workflow (Q11–Q20)
