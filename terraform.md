# Terraform Notes

## Intro to IaC (Infrastructure as Code)

business -> business analyst -> solutions architect -> would be deployed on-premises, where new hardware would have to be ordered

Challenges: 

* Originally, there was very slow deployment and scaling up and down is very slow
* Very expensive, limited automation, chances of human error are high
* Wasted Resources

Solution:

* Moving to cloud computing, as you do not need to manage hardware, just use what you need
* Infrastructure can be provisioned in seconds
* Can provision in the cloud providers console but is not consistent and automated
* IaC comes to solve this^ issue

### Infrastructure as Code

* Codifying entire provisioning process is *better* than using the console of cloud providers

* Terraform makes this type of code human readable and easy to learn.

#### Types of IaC: Configuration Management, server templating, provisioning tools**

Config management tools: Ansible, Puppet, Saltstack

* Manage software on existing servers; consistent, reusable;
* idempotent - only makes changes that are necessary to make environment in defined state, will not do anything unnecessary when run

Server Templating Tools: Docker, Vagrant, Packer

* Create images of VM or container; contain all dependencies in image;
* promote *immutable infrastructure* - when deployed, containers designed to not change

Provisioning Tools: CloudFormation, Terraform

* Deploy immutable infrastructure resources; Terraform is cloud-agnostic
