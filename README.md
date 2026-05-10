# Food Sprint

Online restaurant ordering platform built with **Spring Boot**, **React**, **MySQL**, **Docker**, and **Kubernetes**.

---

## 📸 Screenshots

> *(Add screenshots here)*

---

## Overview

Food Sprint is a full-stack ordering system that includes:

* React frontend served by Nginx
* Spring Boot backend with REST API
* MySQL database with persistent storage
* Kubernetes manifests for local deployment with MicroK8s
* Docker Compose setup for local development/demo

## Features

###  Customer
- Browse restaurants and food products
- Place and track orders
- Manage personal account
- Secure online payments via **Stripe**

###  Admin Panel
- Manage restaurant menu (add/edit/delete products)
- View and manage incoming orders
- Restaurant dashboard

###  Security
- JWT-based authentication & authorization
- Role-based access control (Customer / Admin)
- Spring Security integration


## Tech Stack

### Backend

* Java 21, Spring Boot, Spring Data JPA / Hibernate, Spring Security + JWT, Stripe API, MySQL, Maven


### Frontend

* React, Redux, Axios, Nginx, Tailwind CSS


### Infrastructure

* Docker, Docker Compose, MicroK8s




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



## Running the app

### Prerequisites

* Java 21+
* Node.js 18+
* Maven 3.9+
* Docker, Docker compose
* Kubernetes cluster or MicroK8s



### Docker Compose

Run the full stack locally with:

```bash
cd FoodSprint
docker compose up -d

```

### Services

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:8080`
* MySQL: `localhost:3306`



## API Testing (Postman)

Import the collection from the `postman/` folder to explore and test all available endpoints.

| File | Description |
|---|---|
| `FoodSprint.postman_collection.json` | All requests |

> Authentication is handled automatically. Run **Signin** first — the JWT token is saved and applied to all subsequent requests.

## Test Credentials
| Role | Email | Password |
|---|---|---|
| Restaurant Owner | lafamiglia@gmail.com | lafamiglia |
| Customer | fate_100@hotmail.com | 123456 |



## API Documentation

 Swagger UI is available at:

```text
http://localhost:8080/swagger-ui/index.html
```



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

### Prerequisites
```bash
# Enable required addons
microk8s enable dns storage ingress
```

```bash
kubectl apply -f k8s/secrets/
kubectl apply -f k8s/configmaps/
kubectl apply -f k8s/db/
kubectl apply -f k8s/springboot/
kubectl apply -f k8s/react/
```

### Access the application

The frontend is exposed through NodePort:

```text
http://<node-ip>:30007
```


##  Architecture

```
                        ┌─────────────────┐
                        │     Internet     │
                        └────────┬────────┘
                                 │
                        ┌────────▼────────┐
                        │   Nginx (React)  │
                        │ Nodeport  :30007 │
                        │ ClusterIP   :80  │
                        └────────┬────────┘
                                 │ proxy_pass /api/, /images/
                        ┌────────▼────────┐
                        │  Spring Boot     │
                        │ ClusterIP :8080  │
                        └────────┬────────┘
                                 │
                        ┌────────▼────────┐
                        │     MySQL        │
                        │  ClusterIP :3306 │
                        │  + PVC (1Gi)     │
                        └─────────────────┘
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



## Future Improvements

* Flyway migrations
* Ingress controller
* Horizontal Pod Autoscaling
* Structured JSON logging
* CI/CD pipeline


## Author

George Stavropoulos — [GitHub](https://github.com/George-Stavrop) | [LinkedIn](https://linkedin.com/in/...)


## License

This project is created for educational and portfolio purposes.
