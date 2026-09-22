# Production Cloud Deployment Guide: AWS EC2, Docker & CI/CD

This document provides complete, step-by-step instructions for provisioning, configuring, and automating production deployments for the **Multi-Persona Next.js 14 Portfolio** on an **AWS EC2** instance using **Docker**, **Nginx**, and **GitHub Actions**.

---

## 1. Architectural Overview

```
 [ Client Browser ]
        │  (HTTPS :443 / HTTP :80)
        ▼
 [ AWS EC2 (t3.micro / Ubuntu 22.04 LTS) ]
   └── [ Nginx Reverse Proxy Container ]  (Port 80/443, SSL via Let's Encrypt, Gzip, Security Headers)
          │  (Internal Bridge Network: portfolio_network)
          ▼
   └── [ Next.js Standalone Container ]    (Port 3000, Multi-stage Alpine, <120MB)
          ├── Serves "/"        (Personal Persona)
          ├── Serves "/dev"     (Dev & DevOps Brand)
          ├── Serves "/ai"      (AI Engineer Brand)
          └── Serves "/projects/[slug]" & "/api/contact"
```

---

## 2. AWS EC2 Instance Provisioning

### Step 2.1: Launch EC2 Instance
1. Log into the [AWS Management Console](https://aws.amazon.com/console/).
2. Navigate to **EC2** → **Instances** → **Launch Instances**.
3. Choose instance settings:
   - **Name:** `khalid-portfolio-prod`
   - **AMI:** `Ubuntu Server 22.04 LTS (HVM), SSD Volume Type` (64-bit x86 or ARM)
   - **Instance Type:** `t3.micro` (1 vCPU, 1 GB RAM — eligible for Free Tier) or `t4g.micro`
   - **Key Pair:** Create or select an existing key pair (e.g. `portfolio-key.pem`). Save the `.pem` file securely.
   - **Storage:** `20 GB gp3 SSD` (sufficient for system, Docker images, and logs).

### Step 2.2: Configure Security Group (Firewall)
Configure inbound rules on your Security Group:
| Type | Protocol | Port Range | Source | Description |
| :--- | :--- | :--- | :--- | :--- |
| **SSH** | TCP | `22` | `My IP` or `0.0.0.0/0` | Secure shell administration |
| **HTTP** | TCP | `80` | `0.0.0.0/0` (Anywhere IPv4) | Public HTTP traffic & Certbot ACME challenge |
| **HTTPS** | TCP | `443` | `0.0.0.0/0` (Anywhere IPv4) | Public secure HTTPS traffic |

### Step 2.3: Allocate and Associate an Elastic IP
1. In EC2 Console, go to **Network & Security** → **Elastic IPs**.
2. Click **Allocate Elastic IP address**.
3. Select the allocated IP, click **Actions** → **Associate Elastic IP address**, and associate it with your EC2 instance.
4. Note this static public IP (e.g. `54.123.45.67`).

---

## 3. Server Configuration & Docker Installation

SSH into the instance:
```bash
chmod 400 portfolio-key.pem
ssh -i portfolio-key.pem ubuntu@<YOUR_ELASTIC_IP>
```

### Install Docker Engine & Docker Compose Plugin:
```bash
# Update package lists
sudo apt update && sudo apt upgrade -y

# Install prerequisite packages
sudo apt install -y curl gnupg lsb-release ca-certificates

# Add Docker GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker APT repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker CE, CLI, and Compose plugin
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Allow unprivileged user to execute Docker commands
sudo usermod -aG docker ubuntu
newgrp docker

# Verify installation
docker --version
docker compose version
```

---

## 4. Deploying Application Stack

### Step 4.1: Clone Repository & Prepare Directory
```bash
sudo mkdir -p /var/www/portfolio
sudo chown -R ubuntu:ubuntu /var/www/portfolio
cd /var/www/portfolio

# Clone repo
git clone https://github.com/Muhammadkhalid123/portfolio.git .

# Create production .env file
cp .env.example .env
nano .env
```

### Step 4.2: Build and Start Containers
```bash
# Build standalone Next.js container and launch Nginx proxy
docker compose up -d --build

# Verify running services
docker compose ps
docker compose logs -f
```

---

## 5. Domain DNS & SSL Configuration (Let's Encrypt / Certbot)

### Step 5.1: Point DNS Records
In your domain registrar (Namecheap, Cloudflare, GoDaddy, Route 53):
- **A Record:** `@` points to `<YOUR_ELASTIC_IP>`
- **CNAME Record:** `www` points to `@`

### Step 5.2: Issue SSL Certificate via Certbot
```bash
# Install Certbot
sudo apt install -y certbot

# Request certificate
sudo certbot certonly --webroot -w /var/www/portfolio/certbot -d khalid.dev -d www.khalid.dev

# Once certificate is issued, uncomment the HTTPS server block in docker/nginx.conf
# and restart Nginx:
docker compose restart nginx
```

---

## 6. GitHub Actions CI/CD Pipeline Automation

The repository includes an automated workflow at [`.github/workflows/deploy.yml`](file:///c:/Users/User/Desktop/portfolio/.github/workflows/deploy.yml) that triggers on every push to `main`.

### Required Repository Secrets:
Go to **GitHub Repository** → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret Name | Description / Example Value |
| :--- | :--- |
| `SSH_HOST` | Your EC2 Elastic IPv4 Address (e.g. `54.123.45.67`) |
| `SSH_USER` | `ubuntu` |
| `SSH_PRIVATE_KEY` | Entire content of `portfolio-key.pem` (including `-----BEGIN ...` and `-----END ...`) |
| `SSH_PORT` | `22` |

### How the automated workflow executes:
1. Pulls commit, validates TypeScript types (`tsc --noEmit`), and runs ESLint.
2. Builds multi-stage production Docker image and pushes it to GitHub Container Registry (`ghcr.io`).
3. SSHs into the EC2 instance, pulls the new image, and triggers `docker compose up -d --remove-orphans`.
4. Prunes stale images to preserve EC2 disk space.

---

## 7. Useful Server Management Commands

```bash
# View live application logs
docker compose logs -f portfolio_app

# View Nginx access & error logs
docker compose logs -f nginx

# Restart the entire stack
docker compose restart

# Rebuild and restart after manual code modifications
docker compose up -d --build

# Check disk space & prune unused Docker images
docker system df
docker image prune -a --filter "until=72h"
```
