# DevOps-Networks

## Tools and Resources 

### How to validate Kubernetes YAML files
[https://itnext.io/how-to-validate-kubernetes-yaml-files-9a17b9a30f08?gi=b0453c679e10](https://itnext.io/how-to-validate-kubernetes-yaml-files-9a17b9a30f08?gi=b0453c679e10)

### Lens
[https://k8slens.dev/?utm_source=Cloud...](https://k8slens.dev/?utm_source=Cloud...)

### Monokle
[https://github.com/kubeshop/monokle?u...](https://github.com/kubeshop/monokle?u...)

### Datree
[https://datree.io/?utm_source=youtube...](https://datree.io/?utm_source=youtube...)

### Open Container Initiative
[https://opencontainers.org/](https://opencontainers.org/)

### Docker and OCI Runtimes
[https://medium.com/@avijitsarkar123/docker-and-oci-runtimes-a9c23a5646d6](https://medium.com/@avijitsarkar123/docker-and-oci-runtimes-a9c23a5646d6)

### Introducing Container Runtime Interface (CRI) in Kubernetes
[https://kubernetes.io/blog/2016/12/container-runtime-interface-cri-in-kubernetes/](https://kubernetes.io/blog/2016/12/container-runtime-interface-cri-in-kubernetes/)

### User Load Testing with Locust
```bash
locust -f locustfile.py --host=your_url
```

### Nginx Proxy Manager

1. **Install Docker and Docker-Compose**
    - Docker Install documentation
    - Docker-Compose Install documentation

2. **Create a `docker-compose.yml` file similar to this:**
```yaml
version: '3.8'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```
This is the bare minimum configuration required. See the documentation for more.

3. **Bring up your stack by running**
```bash
docker-compose up -d

# If using docker-compose-plugin
docker compose up -d
```

4. **Log in to the Admin UI**
   When your docker container is running, connect to it on port 81 for the admin interface. Sometimes this can take a little bit because of the entropy of keys.
   [http://127.0.0.1:81](http://127.0.0.1:81)

   **Default Admin User:**
   - Email: `admin@example.com`
   - Password: `changeme`
   
   Immediately after logging in with this default user, you will be asked to modify your details and change your password.