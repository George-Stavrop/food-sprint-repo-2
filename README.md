# Food Sprint

Online restaurant ordering platform built with **Spring Boot**, **React**, **MySQL**, **Docker**, and **Kubernetes**.

## Overview

Food Sprint is a full-stack ordering system that includes:

* React frontend served by Nginx
* Spring Boot backend with REST API
* MySQL database with persistent storage
* Kubernetes manifests for local deployment with MicroK8s
* Docker Compose setup for local development/demo

## Features

* User authentication and role-based access
* Restaurant browsing and food ordering
* Stripe payment integration
* REST API backend
* MySQL persistence
* Containerized deployment
* Kubernetes manifests with ConfigMaps, Secrets, Services, Deployments, and PVCs

## Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* Validation
* JWT
* Stripe Java SDK
* MySQL
* H2 for tests

### Frontend

* React
* Nginx
* Tailwind CSS

### Infrastructure

* Docker
* Docker Compose
* Kubernetes
* MicroK8s
* MySQL persistent volume

## Project Structure

```text
food-sprint/
├── backend/
├── frontend/
├── k8s/
│   ├── mysql/
│   ├── springboot/
│   ├── frontend/
│   ├── configmaps/
│   ├── secrets/
│   └── services/
├── docker-compose.yml
└── README.md
```

## Prerequisites

* Java 17+
* Node.js 18+
* Maven 3.9+
* Docker
* Kubernetes cluster or MicroK8s
* kubectl

## Local Development

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Docker Compose

Run the full stack locally with:

```bash
docker compose up -d
```

### Services

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:8080`
* MySQL: `localhost:3306`

## Kubernetes Deployment

This project includes Kubernetes manifests designed for MicroK8s or any compatible cluster.

### What is included

* MySQL Deployment
* Spring Boot Deployment
* React Deployment
* ClusterIP Services
* NodePort Service for frontend
* PersistentVolumeClaim for MySQL data
* ConfigMaps for non-sensitive configuration
* Secrets for sensitive values

### Example apply order

```bash
kubectl apply -f k8s/secrets/
kubectl apply -f k8s/configmaps/
kubectl apply -f k8s/pv/
kubectl apply -f k8s/deployments/
kubectl apply -f k8s/services/
```

### Access the application

If the frontend is exposed through NodePort:

```text
http://<node-ip>:30007
```

## Kubernetes Configuration

### ConfigMap

Used for non-sensitive values such as:

* database URL
* Hibernate settings
* app configuration

### Secrets

Used for sensitive values such as:

* MySQL root password
* MySQL user password
* Stripe API key
* JWT secret

## Important Notes

* Do not commit real secrets to GitHub.
* Use example secret files or create secrets manually with `kubectl`.
* If you change MySQL credentials or database name after the PVC is created, you may need to delete the PVC so the database initializes again.
* For production, prefer Flyway or Liquibase instead of `spring.jpa.hibernate.ddl-auto=update`.

## Example Kubernetes Secrets

### MySQL Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-config-secret
type: Opaque
stringData:
  MYSQL_ROOT_PASSWORD: root
  MYSQL_USER: appuser
  MYSQL_PASSWORD: apppassword
```

### Stripe Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: stripe-secret
type: Opaque
stringData:
  STRIPE_KEY: sk_test_xxx
```

## Example Spring Boot ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: springboot-configmap
data:
  SPRING_DATASOURCE_URL: jdbc:mysql://mysql-cluster-ip-service:3306/foodsprint
  SPRING_JPA_HIBERNATE_DDL_AUTO: update
```

## Environment Variables

### Backend

* `SPRING_DATASOURCE_URL`
* `SPRING_DATASOURCE_USERNAME`
* `SPRING_DATASOURCE_PASSWORD`
* `STRIPE_API_KEY`

### MySQL

* `MYSQL_DATABASE`
* `MYSQL_ROOT_PASSWORD`
* `MYSQL_USER`
* `MYSQL_PASSWORD`

## API Documentation

If Springdoc OpenAPI is enabled, Swagger UI is available at:

```text
http://localhost:8080/swagger-ui/index.html
```

## Logging

The backend uses standard Spring Boot logging through SLF4J / Logback.

Recommended production settings:

* `INFO` for business events
* `DEBUG` for development
* `ERROR` for failures and exceptions

## Future Improvements

* Flyway migrations
* Readiness and liveness probes
* Resource limits and requests
* Ingress controller
* Horizontal Pod Autoscaling
* Structured JSON logging
* CI/CD pipeline

## License

This project is created for educational and portfolio purposes.
