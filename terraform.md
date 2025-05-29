# Terraform Notes

___

## Chapter 1: Intro to IaC (Infrastructure as Code)

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

___

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

## Chapter 3: Getting started with Terraform

By HashiCorp, can provision on-prem and across many cloud providers. Achieved through using **APIs**.

Uses *HCL* - Hashicorp configuration language; declarative language

Ex:

    resource "aws_instance" "webserver" {
    ami = "ami-0edab43b6fa892279"
    instance_type = "t2.micro"
    }
    resource "aws_s3_bucket" "finance" {
    bucket = "finanace-21092020"
    tags = {
    Description = "Finance and Payroll"
        }
    }
    resource "aws_iam_user" "admin-user" {
        name = "lucy"
        tags = {
            Description = "Team Leader"
        }
    }

Is *Declarative* - means we define the desired end state, and terraform does all the processes necessary to get there

Does it in 3 phases:

1. Init - initializes the project and identifies providers
2. Plan - drafts plan to get to target state
3. Apply - makes changes necessary to get to target state

Every object that terraform manages is called a *resource*

* resource can be a file, ec2 instance, services, IAM groups, roles, etc
* 100s of resources that can be provisioned

Terraform records state of infrastructure as it changes in real-time. Ensures that the infrastructure is always in the define state.

Can also import resources outside of terraform.

### HCL Syntax

Consists of blocks and arguments.

Blocks contain information about a platform and set of resources within that platform that we want to create. 

    <block> <parameters> {
        key1 = value1
        key2 = value2
    }

    Ex: 

    resource "local_file" "pet" { //block name, resource type, resource name
    filename = "/root/pets.txt" //define arguments in key-value pair format
    content = "We love pets!"  
    }

Explanation of lines above:

* resource = block name
* resource type has two components: provider and resource; "local" = provider , "file" = resource
* "pet" = resource name; can be named anything, should be descriptive
* the arguments inside the brackets are specific to the *resource type*
  * above, a local_file expects filename and content arguments

Ex:
    //this is a resource block, that provisions an AWS instance and it is named webserver:
    resource "aws_instance" "webserver" {
        ami = "ami-0c2f25c1f66a1ff4d" //it expects ami and instance_type arguments
        instance_type = "t2.micro"
    }

    resource "aws_s3_bucket" "data" {
        bucket = "webserver-bucket-org-2207"
        acl = "private"
    }

Terraform Workflow has 4 steps: 

1. Write config file
2. Run *terraform init* command
  Checks config file and initialzes working directory containing .tf file.
  Understands the provider we are using by checking the resource provider, it installs the plugins necessary.

3. Review execution plan using *terraform plan*
  Examine the changes that will be made. Includes all the arguments we defined and default/optional arguments.
  The "+" symbol neans resources are created.

4. Use *terraform apply* to apply changes
  Proceed with creation of resource and execution of plan.

Can also run terraform show command
  See details of resources we just created

Providers: AWS, Azure, GCP

Each of these providers have unique resources that can be created with arguments for each of these.

Don't have to remember all of these. Use terraform docs which are very comprehensive to see providers, their resources, and resource arguments

### Updating and Destorying Resources

* The "-/+" symbol means that the resource will be destroyed and recreated
* Terraform will delete the *whole file* and create a *new file* with the trivial change. -> immutable infrastructure

*terraform destroy* command destroys all resources

## Chapter 4: Terraform Basics

___

terraform init - terraform downloads plugins given the providers being used; can be run as many times as needed without impacting infrastructure

The plugins are in .terraform/plugins

all providers are listed in registry.terraform.io

3 Types of providers:

1. official providers: AWS, GCP, Azure, local

2. partner providers: 3rd party companies bigip, heroku, digital ocean;

3. community providers: community maintained providers

Plugin names that are downloaded after terraform init:

hashicorp/local -> is organization/type (name of provider); can also optionally have a hostname in front organization. (registry.terraform.io)

### Config files

Can use *multiple providers* in same working directory

* whenever we add a new provider to a config file, we must run *terraform init* again to install plugins

Can create multiple config files per directory. Common practice is to have one single config file. If using one, call it main.tf

Also: variables.tf, outputs.tf, 

### Input Variables

Hard coding is not good practice, because then there is no point of using IaC

Create variables.tf file to contain variable declarations

Ex:

    variable "filename" {
        default = "/root/pets.txt"
    }
    variable "content" {
        default = "My favorite pet is Mr. Whiskers"
    }
    variable "prefix" {
        default = "Mrs"
    }
    variable "separator" {
        default = "."
    }
    variable "length" {
        default = "2"
    }

*Variable Blocks* seen above with variable names and default values

Use var.varname to use variables in main.tf. Update variables.tf to change variable values

Arguments for variables:

* default - default value
* type - number, bool, string (type *any* by default), list, map, object, tuple
* description - optional description of variable

#### Variable Types and Declarations

Ex of list variable:

    variable "prefix" {
        default = ["Mr", "Mrs", "Sir"]
        type = list
    }

Accessed from main.tf:
    prefix = var.prefix[0] //accesses "Mr"

Map is a dictionary, access using:
    var.mapname["key"]

Can define type constraints for these constraints i.e

    variable "prefix" {
        default = ["Mr", "Mrs", "Sir"]
        type = list(string) //will throw exception when wrong types are put in
        //or type = list(number) 
    }

Sets *cannot* have duplicate values

Objects are used to define different features of an object:

Ex:
    variable "bella" {
        type = object({
        name = string //declaring fields
        color = string
        age = number
        food = list(string)
        favorite_pet = bool
        true bool
        })
    default = {
        name ="bella" //initializing the fields
        color = "brown"
        age = 7
        food = ["fish", "chicken", "turkey"]
        favorite_pet = true
        }
    }

Lists use elements of the same variable types, tuples use different variable types; Error will occur if otherwise

Ex:

    variable kitty {
        type = tuple([string, number, bool])
        default = ["cat", 7, true]
    }