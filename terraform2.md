# Terraform Interview Handbook (Freshers)
## Part 2 – Terraform Commands & Workflow (Q11–Q20)

> **Interview Level:** B.Tech CSE Fresher
>
> **Focus:** Most Repeated Terraform Commands Asked in Interviews

---

# Q11. What does `terraform init` do?

### Interview Answer

`terraform init` initializes the Terraform project.

It performs three main tasks:

- Downloads required providers
- Configures the backend
- Downloads modules (if used)

It is the first command you run in any Terraform project.

---

### Syntax

```bash
terraform init
```

---

### Interview Scenario

You cloned a Terraform project from GitHub.

Before running any other command, execute:

```bash
terraform init
```

to download all required plugins.

---

### Follow-up

**Q:** Do we run `terraform init` every time?

**Answer**

No.

Run it when:

- Starting a new project
- Provider version changes
- Backend changes
- New modules are added

---

# Q12. What does `terraform plan` do?

### Interview Answer

`terraform plan` compares the Terraform code with the current infrastructure and shows what changes will happen.

It **does not create or modify resources**.

It is called a **Dry Run**.

---

### Syntax

```bash
terraform plan
```

---

### Example Output

```
+ Create EC2

+ Create Security Group

+ Create S3 Bucket
```

Nothing is created yet.

---

### Interview Scenario

Before deploying to production, always run:

```bash
terraform plan
```

to verify changes.

---

### Follow-up

**Q:** Which command previews changes?

**Answer**

```bash
terraform plan
```

---

# Q13. What does `terraform apply` do?

### Interview Answer

`terraform apply` creates or updates infrastructure according to the Terraform configuration.

After showing the execution plan, Terraform asks for confirmation.

---

### Syntax

```bash
terraform apply
```

---

### Auto Approval

```bash
terraform apply -auto-approve
```

Used mainly in CI/CD pipelines.

---

### Interview Scenario

After reviewing the plan,

run

```bash
terraform apply
```

to create AWS resources.

---

### Follow-up

**Q:** Which command actually creates infrastructure?

**Answer**

```bash
terraform apply
```

---

# Q14. What does `terraform destroy` do?

### Interview Answer

`terraform destroy` deletes all resources managed by Terraform.

It should be used carefully because it permanently removes infrastructure.

---

### Syntax

```bash
terraform destroy
```

---

### Interview Scenario

After testing a project,

use

```bash
terraform destroy
```

to avoid unnecessary cloud charges.

---

### Follow-up

**Q:** Does destroy delete resources from AWS?

**Answer**

Yes.

It deletes all resources managed by Terraform.

---

# Q15. What is `terraform validate`?

### Interview Answer

`terraform validate` checks whether the Terraform code is syntactically and logically correct.

It does not create any resources.

---

### Syntax

```bash
terraform validate
```

---

### Example

```
Success!

The configuration is valid.
```

---

### Interview Scenario

Run validation before pushing code to GitHub.

---

### Follow-up

**Q:** Does validate connect to AWS?

**Answer**

No.

It only checks the configuration.

---

# Q16. What is `terraform fmt`?

### Interview Answer

`terraform fmt` automatically formats Terraform code according to HashiCorp standards.

It improves readability and keeps code consistent.

---

### Syntax

```bash
terraform fmt
```

---

### Format All Files

```bash
terraform fmt -recursive
```

---

### Interview Scenario

Your team follows coding standards.

Before committing code,

run:

```bash
terraform fmt
```

---

### Follow-up

**Q:** Does `terraform fmt` change infrastructure?

**Answer**

No.

It only formats the code.

---

# Q17. What is `terraform show`?

### Interview Answer

`terraform show` displays the current Terraform state or execution plan in a readable format.

It helps inspect managed resources.

---

### Syntax

```bash
terraform show
```

---

### Interview Scenario

You want to verify details of the created EC2 instance.

Run:

```bash
terraform show
```

---

### Follow-up

**Q:** Does `terraform show` modify resources?

**Answer**

No.

It only displays information.

---

# Q18. What is `terraform output`?

### Interview Answer

`terraform output` displays output values defined in the Terraform configuration.

Outputs are commonly used to retrieve:

- EC2 Public IP
- VPC ID
- Load Balancer DNS
- S3 Bucket Name

---

### Example Code

```hcl
output "public_ip" {
  value = aws_instance.web.public_ip
}
```

---

### Command

```bash
terraform output
```

---

### Get Specific Output

```bash
terraform output public_ip
```

---

### Interview Scenario

After deploying an EC2 instance,

retrieve its IP using:

```bash
terraform output public_ip
```

---

### Follow-up

**Q:** Why are outputs useful?

**Answer**

They expose important resource information after deployment.

---

# Q19. What is `terraform import`?

### Interview Answer

`terraform import` brings an existing cloud resource under Terraform management.

It updates only the **state file**.

You must still write the corresponding Terraform code manually.

---

### Syntax

```bash
terraform import aws_instance.web i-1234567890abcdef0
```

---

### Interview Scenario

An EC2 instance already exists in AWS.

Instead of recreating it,

import it into Terraform.

---

### Follow-up

**Q:** Does import generate Terraform code?

**Answer**

No.

It only updates the state file.

---

# Q20. Explain the complete Terraform workflow.

### Interview Answer

The standard Terraform workflow is:

```
Write Code

↓

terraform init

↓

terraform validate

↓

terraform fmt

↓

terraform plan

↓

terraform apply

↓

terraform output

↓

terraform destroy
```

---

### Real Interview Scenario

Suppose you need to deploy an EC2 instance.

**Step 1**

Write Terraform code.

**Step 2**

```bash
terraform init
```

Downloads providers.

**Step 3**

```bash
terraform validate
```

Checks configuration.

**Step 4**

```bash
terraform fmt
```

Formats the code.

**Step 5**

```bash
terraform plan
```

Shows planned changes.

**Step 6**

```bash
terraform apply
```

Creates infrastructure.

**Step 7**

```bash
terraform output
```

Displays the EC2 Public IP.

**Step 8**

```bash
terraform destroy
```

Deletes all created resources.

---

### Follow-up

**Q:** What is the safest workflow before deployment?

**Answer**

```
terraform init

↓

terraform validate

↓

terraform fmt

↓

terraform plan

↓

terraform apply
```

---

# ⭐ Interview Tips

### Most Important Commands

| Command | Purpose |
|---------|----------|
| `terraform init` | Initialize project |
| `terraform validate` | Validate configuration |
| `terraform fmt` | Format code |
| `terraform plan` | Preview changes |
| `terraform apply` | Create/Update resources |
| `terraform destroy` | Delete resources |
| `terraform show` | View state details |
| `terraform output` | Display output values |
| `terraform import` | Import existing resources |

---

# Commands You Must Remember

```bash
terraform init

terraform validate

terraform fmt

terraform plan

terraform apply

terraform apply -auto-approve

terraform output

terraform show

terraform destroy

terraform import
```

---

# Most Repeated Interview Questions

✅ What does `terraform init` do?

✅ Difference between `plan` and `apply`

✅ What is `terraform validate`?

✅ What is `terraform fmt`?

✅ What is `terraform output`?

✅ What is `terraform show`?

✅ What is `terraform import`?

✅ What is `terraform destroy`?

✅ Complete Terraform workflow

✅ Which commands are used in CI/CD?

---

**Next:** Part 3 – Terraform IaC Coding Questions (Q21–Q30)
