# Terraform

- Install Terraform
  - https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/aws-get-started
    - Resource above shows how to install terraform
- Have a user set up in the organization AWS by a manager
- Create a web server from the existing training environment template file
  - https://learn.hashicorp.com/tutorials/terraform/aws-build?in=terraform/aws-get-started
    - Resource above shows how to make a main.tf file. You already
      have one in the project, use this resource to figure out how to initialize and run main.tf file.
  - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-key-pairs.html
    - Resource above shows you how to create and download a key pair with aws
- Connect to the web server
  - Here you will need to ssh into the web server to connect
  - example of connection string...
    - ssh -i /path/to/pem/file/user.pem centos@Public-IPv4-DNS-here -p 2007
- Configure the web server with ansible. See step 2 in README file at root of project
