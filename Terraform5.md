# Terraform Interview Handbook (Freshers)
## Part 4 – Scenario-Based Interview Questions (Q31–Q40)

> **Interview Level:** B.Tech CSE Fresher
>
> **Focus:** Real-world scenarios frequently asked in DevOps, Cloud, and Terraform interviews.

---

# Q31. A team member manually changed an EC2 instance type in the AWS Console. What will you do?

### Interview Answer

This is called **Infrastructure Drift**.

First, I will run:

```bash
terraform plan
```

Terraform compares the actual infrastructure with the state file and configuration.

If the manual change was intentional:
- Update the Terraform code to match the change.
- Run `terraform apply`.

If the manual change was not required:
- Run `terraform apply` to restore the infrastructure to the desired state.

---

### Interviewer Wants to Hear

- Detect drift using `terraform plan`
- Never edit resources manually
- Keep Terraform as the single source of truth

---

### Follow-up

**Q:** What is Infrastructure Drift?

**Answer:**

Infrastructure Drift occurs when cloud resources are changed outside Terraform.

---

# Q32. Two engineers run `terraform apply` at the same time. What happens?

### Interview Answer

If both engineers use the same local state file, it can cause state corruption.

The solution is to use:

- Remote Backend (Amazon S3)
- State Locking (DynamoDB)

This ensures only one engineer can modify the infrastructure at a time.

---

### Interview Scenario

Developer A:

```bash
terraform apply
```

Developer B:

```bash
terraform apply
```

Developer B waits until Developer A finishes.

---

### Follow-up

**Q:** Which AWS service provides state locking?

**Answer**

Amazon DynamoDB.

---

# Q33. Someone accidentally deleted the Terraform State File. What will you do?

### Interview Answer

Terraform loses track of all managed resources.

If a remote backend is used:

- Restore the previous state file from S3 Versioning.

If using a local state:

- Recover from backup.
- If no backup exists, import resources using:

```bash
terraform import
```

---

### Best Practice

Never store production state locally.

Use:

- Amazon S3
- Versioning
- DynamoDB Locking

---

### Follow-up

**Q:** Can Terraform work without a state file?

**Answer**

No.

The state file is required to track infrastructure.

---

# Q34. A junior developer removed an S3 bucket from the Terraform code. How do you prevent accidental deletion?

### Interview Answer

Use the Lifecycle block.

---

### Code

```hcl
resource "aws_s3_bucket" "logs" {

  bucket = "company-logs"

  lifecycle {
    prevent_destroy = true
  }
}
```

---

### Result

Terraform throws an error instead of deleting the bucket.

---

### Interview Tip

Always protect:

- Production Database
- S3 Buckets
- VPC
- Load Balancer

---

### Follow-up

**Q:** Which lifecycle option prevents deletion?

**Answer**

```hcl
prevent_destroy
```

---

# Q35. Your company has Development, Testing, and Production environments. How will you manage them?

### Interview Answer

Use:

- Variables
- Separate `.tfvars` files
- Terraform Workspaces (or separate directories for larger projects)

Example:

```
dev.tfvars

test.tfvars

prod.tfvars
```

Run:

```bash
terraform apply -var-file=dev.tfvars
```

or

```bash
terraform workspace select dev
```

---

### Interview Scenario

Development:

```
t2.micro
```

Production:

```
t3.large
```

Only the variable file changes.

---

### Follow-up

**Q:** Which feature separates environments?

**Answer**

Terraform Workspaces.

---

# Q36. An EC2 instance already exists in AWS. Your manager wants Terraform to manage it. What will you do?

### Interview Answer

Use:

```bash
terraform import
```

Example:

```bash
terraform import aws_instance.web i-123456789
```

After importing, write the matching Terraform configuration.

---

### Important Point

Import updates the state file only.

Terraform code must still be written manually.

---

### Follow-up

**Q:** Does `terraform import` generate code?

**Answer**

No.

It only updates the state file.

---

# Q37. Your Terraform code contains database passwords. Is this a good practice?

### Interview Answer

No.

Secrets should never be hardcoded.

Use:

- AWS Secrets Manager
- HashiCorp Vault
- Environment Variables
- Sensitive Variables

---

### Example

```hcl
variable "db_password" {

  type = string

  sensitive = true

}
```

---

### Interview Tip

Hardcoding passwords is a security risk.

---

### Follow-up

**Q:** Which AWS service stores secrets?

**Answer**

AWS Secrets Manager.

---

# Q38. Terraform creates an EC2 instance before creating the Security Group. How do you fix it?

### Interview Answer

Use dependencies.

Usually Terraform detects dependencies automatically.

If not, use:

```hcl
depends_on = [
  aws_security_group.web
]
```

---

### Example

```hcl
resource "aws_instance" "web" {

  ami = "ami-123456"

  instance_type = "t2.micro"

  depends_on = [
    aws_security_group.web
  ]

}
```

---

### Interview Tip

Use `depends_on` only when Terraform cannot infer the dependency.

---

### Follow-up

**Q:** Does Terraform automatically manage dependencies?

**Answer**

Yes, in most cases.

---

# Q39. Your company wants reusable Terraform code for multiple projects. What will you use?

### Interview Answer

Use Terraform Modules.

A module contains reusable infrastructure code.

Example:

```
modules/

    ec2/

    vpc/

    s3/
```

Different projects reuse the same modules.

---

### Interview Scenario

Instead of writing EC2 code five times,

create one EC2 module and reuse it everywhere.

---

### Follow-up

**Q:** What is the main advantage of modules?

**Answer**

Code Reusability.

---

# Q40. How would you use Terraform in a CI/CD Pipeline?

### Interview Answer

Terraform is integrated with Jenkins or GitHub Actions.

Typical pipeline:

```
Git Push

↓

terraform fmt

↓

terraform validate

↓

terraform plan

↓

Manual Approval

↓

terraform apply
```

State is stored remotely using:

- Amazon S3
- DynamoDB Locking

---

### Interview Scenario

Developer pushes Terraform code to GitHub.

GitHub Actions automatically:

- Checks formatting
- Validates code
- Generates a plan
- Waits for approval
- Applies infrastructure

---

### Follow-up

**Q:** Why run `terraform plan` in CI/CD?

**Answer**

To review changes before applying them.

---

# ⭐ Quick Revision

| Scenario | Best Solution |
|----------|---------------|
| Manual AWS change | `terraform plan` + `terraform apply` |
| Two engineers applying | S3 + DynamoDB Lock |
| State file deleted | Restore remote state / `terraform import` |
| Prevent accidental deletion | `prevent_destroy` |
| Multiple environments | Workspaces / `.tfvars` |
| Existing AWS resource | `terraform import` |
| Store passwords | Secrets Manager / Vault |
| Dependency issue | `depends_on` |
| Reuse infrastructure | Modules |
| CI/CD | fmt → validate → plan → apply |

---

# Most Repeated Scenario Questions

✅ Manual change in AWS Console

✅ Two developers running `terraform apply`

✅ State file deleted

✅ Prevent accidental deletion

✅ Manage Dev, Test, and Prod

✅ Import existing resources

✅ Secure secrets

✅ Resource dependency problem

✅ Modules for reusable code

✅ Terraform in CI/CD Pipeline

---

**Next:** Part 5 – Tricky & Frequently Asked Terraform Interview Questions (Q41–Q50)
