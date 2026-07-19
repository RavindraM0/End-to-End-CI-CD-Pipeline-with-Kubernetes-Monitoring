# Terraform Interview Handbook (Freshers)
## Part 3 – Terraform IaC Coding Questions (Q21–Q30)

> **Interview Level:** B.Tech CSE Fresher
>
> **Focus:** Most Asked Terraform Coding Questions with HCL Examples

---

# Q21. Write Terraform code to create an AWS EC2 Instance.

### Interview Answer

The `aws_instance` resource is used to create an EC2 instance.

---

### Code

```hcl
provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "web" {
  ami           = "ami-0f58b397bc5c1f2e8"
  instance_type = "t2.micro"

  tags = {
    Name = "WebServer"
  }
}
```

---

### Explanation

- `provider` → Connects Terraform to AWS
- `resource` → Creates AWS resource
- `ami` → Operating System Image
- `instance_type` → EC2 Size
- `tags` → Resource Name

---

### Interview Scenario

Your manager asks you to launch one EC2 instance.

Use:

```bash
terraform apply
```

Terraform creates it automatically.

---

### Follow-up

**Q:** Which resource creates EC2?

**Answer**

```hcl
aws_instance
```

---

# Q22. How do you create an S3 Bucket?

### Interview Answer

Terraform uses the `aws_s3_bucket` resource.

---

### Code

```hcl
resource "aws_s3_bucket" "bucket" {
  bucket = "ravindra-demo-bucket-12345"

  tags = {
    Environment = "Dev"
  }
}
```

---

### Interview Scenario

Store application logs inside an S3 bucket.

Terraform creates it automatically.

---

### Follow-up

**Q:** Can bucket names be duplicated?

**Answer**

No.

S3 bucket names are globally unique.

---

# Q23. How do you use Variables?

### Interview Answer

Variables make Terraform code reusable.

Instead of hardcoding values, pass them as input.

---

### variables.tf

```hcl
variable "instance_type" {
  default = "t2.micro"
}
```

---

### main.tf

```hcl
resource "aws_instance" "web" {
  ami           = "ami-0f58b397bc5c1f2e8"
  instance_type = var.instance_type
}
```

---

### Interview Scenario

Development uses:

```
t2.micro
```

Production uses:

```
t3.large
```

Only the variable changes.

---

### Follow-up

**Q:** How do you access a variable?

**Answer**

```hcl
var.instance_type
```

---

# Q24. What are Outputs?

### Interview Answer

Outputs display important information after deployment.

Examples:

- Public IP
- VPC ID
- DNS Name
- Bucket Name

---

### Code

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

### Interview Scenario

Need the EC2 Public IP after deployment.

Use an output block.

---

### Follow-up

**Q:** How do you display outputs?

**Answer**

```bash
terraform output
```

---

# Q25. What are Locals?

### Interview Answer

Locals store reusable values within a module.

They reduce duplicate code.

---

### Code

```hcl
locals {
  project = "TerraformDemo"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${local.project}-logs"
}
```

---

### Interview Scenario

Several resources need the same project name.

Store it once in `locals`.

---

### Follow-up

**Q:** Difference between Variable and Local?

**Answer**

Variable → Input from user

Local → Internal reusable value

---

# Q26. What is `count`?

### Interview Answer

`count` creates multiple identical resources.

---

### Code

```hcl
resource "aws_instance" "web" {
  count = 3

  ami           = "ami-0f58b397bc5c1f2e8"
  instance_type = "t2.micro"
}
```

---

### Result

Terraform creates:

- EC2-1
- EC2-2
- EC2-3

---

### Interview Scenario

Need 10 identical servers.

Use `count`.

---

### Follow-up

**Q:** What data type does count accept?

**Answer**

Integer

---

# Q27. What is `for_each`?

### Interview Answer

`for_each` creates resources using unique keys.

It is preferred when each resource has a unique identity.

---

### Code

```hcl
resource "aws_iam_user" "users" {

  for_each = toset([
    "alice",
    "bob",
    "charlie"
  ])

  name = each.key
}
```

---

### Result

Creates three IAM users.

---

### Interview Scenario

Need IAM users for every developer.

Use `for_each`.

---

### Follow-up

**Q:** Which is better for unique resources?

**Answer**

`for_each`

---

# Q28. What is `depends_on`?

### Interview Answer

`depends_on` creates an explicit dependency between resources.

Terraform creates dependent resources in the correct order.

---

### Code

```hcl
resource "aws_security_group" "web" {

  name = "web-sg"

}

resource "aws_instance" "app" {

  ami = "ami-0f58b397bc5c1f2e8"

  instance_type = "t2.micro"

  depends_on = [
    aws_security_group.web
  ]
}
```

---

### Interview Scenario

Security Group must exist before EC2.

Use `depends_on`.

---

### Follow-up

**Q:** Does Terraform create dependencies automatically?

**Answer**

Yes.

If resources reference each other.

Otherwise use:

```hcl
depends_on
```

---

# Q29. What is the Lifecycle Block?

### Interview Answer

The lifecycle block controls how Terraform manages resources.

Common options:

- prevent_destroy
- create_before_destroy
- ignore_changes

---

### Code

```hcl
resource "aws_s3_bucket" "bucket" {

  bucket = "company-data"

  lifecycle {

    prevent_destroy = true

  }

}
```

---

### Interview Scenario

Production database should never be deleted accidentally.

Use:

```hcl
prevent_destroy = true
```

---

### Follow-up

**Q:** Which lifecycle rule prevents accidental deletion?

**Answer**

```hcl
prevent_destroy
```

---

# Q30. What are Data Sources?

### Interview Answer

Data sources retrieve information about existing resources.

Terraform reads them but does not manage them.

---

### Code

```hcl
data "aws_ami" "latest" {

  most_recent = true

  owners = ["amazon"]

}
```

---

### Use Data Source

```hcl
resource "aws_instance" "web" {

  ami = data.aws_ami.latest.id

  instance_type = "t2.micro"

}
```

---

### Interview Scenario

Instead of hardcoding an AMI ID,

Terraform automatically fetches the latest Amazon Linux AMI.

---

### Follow-up

**Q:** Difference between Resource and Data Source?

**Answer**

Resource → Creates and manages infrastructure.

Data Source → Reads existing infrastructure only.

---

# ⭐ Quick Revision Table

| Feature | Purpose |
|----------|---------|
| `resource` | Create infrastructure |
| `variable` | Input values |
| `output` | Display values |
| `locals` | Reusable internal values |
| `count` | Multiple identical resources |
| `for_each` | Multiple unique resources |
| `depends_on` | Explicit dependency |
| `lifecycle` | Control resource behavior |
| `data` | Read existing resources |
| `provider` | Connect Terraform to cloud |

---

# Mini Coding Interview

### Q: Create one EC2 instance.

```hcl
resource "aws_instance" "web" {
  ami           = "ami-0f58b397bc5c1f2e8"
  instance_type = "t2.micro"
}
```

---

### Q: Create three EC2 instances.

```hcl
resource "aws_instance" "web" {
  count         = 3
  ami           = "ami-0f58b397bc5c1f2e8"
  instance_type = "t2.micro"
}
```

---

### Q: Print EC2 Public IP.

```hcl
output "public_ip" {
  value = aws_instance.web.public_ip
}
```

---

### Q: Use a variable.

```hcl
variable "instance_type" {
  default = "t2.micro"
}

instance_type = var.instance_type
```

---

### Q: Prevent accidental deletion.

```hcl
lifecycle {
  prevent_destroy = true
}
```

---

# Most Repeated Coding Questions

✅ Create an EC2 instance

✅ Create an S3 bucket

✅ Use variables

✅ Use outputs

✅ Difference between variable and local

✅ `count` vs `for_each`

✅ `depends_on`

✅ Lifecycle block

✅ Data source

✅ Read the latest AMI dynamically

---

**Next:** Part 4 – Scenario-Based Terraform Interview Questions (Q31–Q40)
