# AWS Services Overview

* Cloud Computing - on-demand utilization of IT resources over the internet rather than owning and maintaining physical infrastructure
  * includes compute power, storage, databases on as-needed basis
  * the power to spin up resources allows creativity to flourish, and less time spent on provisioning, configuring server hardware
  * allows access to IT infrastructure for *anyone* as it is so cheap
* elasticity - no need to overprovision resources for heavy workloads, resources scale dynamically to handle traffic
* can deploy applications globally in second, reducing latency
* saves costs as servers do not have to be maintained, only pay for what you use
* **Types of Cloud Computing**: 
  1. Infrastructure as a Service (IaaS) - provides the basic IT resources and allows the greatest flexibility. Access to networking, computers, and storage space
  2. Platform as a Service (PaaS) - removes the need to manage any underlying infrastructure and allows focus on the deployment and management of your applications; give developers runtime environments for testing
  3. Software as a Service (SaaS) - a complete product like gmail or any web application; end-user applications where the cloud provider takes care of everything. Just have to decide how to use it.

* **Cloud Services**: 
  * Compute capacity - cloud instances with varying compute power for variety of workloads; basically like you are renting your own computer on the cloud
    * the operating system, memory, CPU, and storage can all be customized
    * no need to maintain it, just use it
  * Databases and Data Storage
    * cloud services for file, block, object storage.
    * SQL and NoSQL database solutions offered
    * also scale based on need
  * Artificial Intelligence and Machine Learning
  * Network and content delivery
  * Security, Identity, and Compliance
  * Migration and modernization
    * can migrate on-site workloads to cloud without interrupting or causing outages at a fraction of the cost. Also simplifies the decision making process with automation and intelligent recommendations.  

## ECS - Elastic Container Service

* Fully Managed Container orchestration service, easily allows deploying, managing, and scaling of containerized applications.
* Integeration with ECR and Docker
* allows for more focus on building the applications, not the environment

### 3 layers

  1. Capacity - the *infrastructure* where your containers run

    * EC2 instances - choose instances type, number of instance, and manage capacity
    * Serverless (AWS Fargate) - pay-as-you-go, no managing servers,capacity planning, or isolate container workloads
    * On-prem virtual machines - ECS Anywhere can register on-prem servers as servers to ECS clusters
  2. Controller - deploy and manage your apps that run on the containers
    * the ECS scheduler is the software that manages your apps
  3. Provisioning - tools used with scheduler to deploy and manage applications and containers

### Docker & Containerization

* **Containerization** - way to package your application and everything it needs like code, libraries, and other tools; everything is packaged nicely into a *container*
  * ensures everything runs the ssame, regardless of where it is (doesn't just work locally like many programs)

* **Docker** is the most popular tool for creating and managing these containers; packages your app and env, run consistently anywhere, share between machines and teams easily
  * Can run these containers on instances or other ECS options
  * Docker acts as the *operating system* for containers, just use simple command  to build, start, or stop containers 



