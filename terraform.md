# Terraform Notes

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

##### Variable Assigning Options

Option 1:
If you do *not* provide default values for variables, terraform will prompt you to enter the values in the terminal *interactively*. (when you run terraform apply)

Option 2:
Or can use command-line flags like the following:

    $ terraform apply -var "filename=/root/pets.txt" -var "content=We love Pets!" -var "prefix=Mrs" -var "separator=." -var "length=2"

Option 3:
You can also use environment variables like the following (CLI):

    $ export TF_VAR_filename="/root/pets.txt" //sets the variable 
    called filename to the displayed path
    $ export TF_VAR_content="We love pets!"  
    $ export TF_VAR_prefix="Mrs"
    $ export TF_VAR_separator="."
    $ export TF_VAR_length="2"
    $ terraform apply

Option 4:
Can also use variable definition files like terraform.tfvars or .terraform.tfvars.json file: (Will be automatically loaded in by terraform after running terraform apply)

    In terraform.tfvars: 
    filename = "/root/pets.txt"
    content = "We love pets!"
    prefix = "Mrs"
    separator = "."
    length = "2"

Can use any of these options to define variables, but there is *precedence*

Precedence (lowest priority -> highest priority)

Env. Variables -> terraform.tfvars -> *.auto.tfvars -> -var or -var-file command line flags

### Resource Attributes

What if you want to set one of the arguments for a *resource* to an attribute of another *resource*:

This accesses the id attribute of my-pet resource which is a random_pet resource type

${random_pet.my-pet.id} //syntax is ${resource_type.resource_name.attribute}

The *dependencies* of a resource are created first.
Ex: The random_pet will be created first. This is an **implicit declaration**

    resource "local_file" "pet" {
        filename = var.filename
        content ="My favorite pet is ${random_pet.my-pet.id}"
    }

Note: They are deleted in the *reverse* order of creation. i.e local-file is destored first

Ex: **Explicit Dependency** as denoted by the depends_on; used when there is no implict declaration

    resource "local_file" "pet" {
        filename = var.filename
        content ="My favorite pet is Mr.Cat"
        depends_on = [
            random_pet.my-pet //resource type and name
        ]
    }

### Output Variables

We have used input variables so far, but what about *output variables*

Ex: syntax of declaring an output variable

    output "<variable_name>" {
        value = "<variable_value>"
        <arguments>
    }

The output variables will be printed when using terraform apply

*terraform output* - prints all the defined outputs in the current working directory

* terraform output var-name - prints value of specific output variable

Use Case:

Used to feed variables to other tools or to view a variable *quickly on-screen*

## Chapter 5: Terraform State

When running plan and apply, terraform checks the *state* and creates an execution plan accordingly.

**terraform.tfstate** - state file, which was created as a result of first terraform apply command; JSON file with details of infrastructure; **ALWAYS CREATED AFTER TERRAFORM APPLY ONCE**

* is the single source of truth for terraform to understand current state

Note: Even if you deleted resource blocks with dependencies, terraform uses the state file to remember the dependencies and determine destruction order

Benefits

Improves the performance:

Using --refresh=false makes use of the cache of all the resources rather than referring to the state everytime; increases performance immensely

Collaboration:

Every user in the team should always have the latest terraform.tfstate. Can store this in a remote state store (s3, google cloud, terraform cloud, etc)

May cause *errors* if people use terraform at the same time

The state file contains *sensitive information* like ips and ssh keys, passwords for DBs in *plain text*.

* So we must store the state files in secure locations (like remote backend systems, s3, terraform cloud)

* Do NOT manually edit the state file, use state commands if needed.

## Section 6: Working with Terraform

### Terraform Commands

*terraform validate* - check if syntax used is correct, gives hints to fix any syntax errors

*terraform fmt* - scans config files and puts into more readable format; great for readability

*terraform show* - shows all resources and their attributes; -json flag prints them out in a JSON format

*terraform providers* - lists providers used in this config directory

*terraform providers mirror* - mirrors the provider configs to another directory

*terraform output varname* - print output variables

*terraform apply -refresh-only* - sync terraform to real-world infrastructure; any updates with hardware etc; modifies state file

*terraform graph* - creates visual representation of dependencies of resources; pass through graph visualization software to make sense of it; graphviz (see ppt)

### Mutable vs Immutable Infrastructure

Mutable Infrastructure - software is updated, underlying hardware is not

Config Drift - Some servers may have different versions or configs; leaves infrastructure in complex state; troubleshooting would be difficult

Solution:

Immutable infrastructure - Spin up new web servers with latest update and delete old webservers; if new server updates fail, the old servers are kept

### Lifecycle Rules - go in a resource block

May not want the old resource to be deleted, or want order of deletion to be different:

    lifecycle {
        create_before_destroy = true //ensures that a change in config will result in a new resource to be created before deleting an old one
    }

    lifsssecycle {
        prevent_destroy = true //prevents this resource from being deleted 
    }
    
    lifecycle { 
        ignore_changes = [ //accepts any attribute within this list
            tags 
        ] //prevents resource from being updates, based on an attribute list 
    }

### Data Sources

Terraform only has jurisdiction over the files that it creates. To read attributes from resources out of its control, use *data sources*

Ex: This resource was created with a shell script (not terraform)

    data "local_file" "dog" {
        filename = "/root/dog.txt"
    }

There is a data source category for each resource in documentation.

Data source - only *reads* infrastructure, cannot be used to create, update, or dstreeoy

### Meta Arguments

So far we have only been creating 1 resource at a time. We will now create multiple instances of the same resource using *meta arguments*

types: depends_on, lifecycle rules

*count* - define the number of resources we want to create 

Ex:

    resource "local_file" "pet" {
        filename = var.filename[count.index] //use the count.index to make use of the files in the variable below
        count = 3 //creates the same file three times, with same name too
        count = length(var.filename) //creates the # of files defined in filename variable
    }

    variable "filename"{
        default = [
            "/root/pets.txt",
            "/root/dogs.txt",
            "/root/cats.txt"  //creates three local files with these 3 names
        ]
    }

*Warning* - However, count may cause unwanted behavior when updating and destroying resources. Will get to the desired outcome, but may *delete files unnecessarily*.

*for-each* - can circumvent the issue mentioned above^

for_each only works with *sets* and *maps*

Ex: 

resource "local_file" "pet" {
    filename = each.value //loops through the filename variable
    for_each = toset(var.filename) //turns the list in filename variable to a set then loops through
}

This works because the filename elements are used as maps, not lists. So *keys* are used, *indices are not used*

### Version Constraints 

By default, latest plugin versions are downloaded, but may not want this behavior to occur. Can choose *specific versions* of providers. Instructions in documentation of providers.

Ex: this is how to use a specific version of local provider

    terraform {
        required_providers {
            local = {
                source = "hashicorp/local"
                version = "1.4.0"
            }
        }
    }

Alternatives: Don't use a particular version, many other ways (ask Chat)

    terraform {
        required_providers {
            local = {
                source = "hashicorp/local"
                version = "1.4.0"
            }
        }
    }

## Section 7: Terraform with AWS

Services do not have permission to interact with other services by default. Need to apply *IAM roles* to services in order to get that permission.

Other uses:

* providing access to an iam user in other aws account
* provide access to users outside of AWS

Need: 

    provider "aws" {
        region = "us-west-2"
        access_key = "super-secret"
        secret-Key = "secret" //not good to hard code here, can use *aws configure* or use env variables
    }

Ex: Create an IAM user using Terraform

    resource "aws_iam_user" "admin-user" {
        name = "lucy"
        tags = {
            Description = "Technical Team Leader"
        }
    }

