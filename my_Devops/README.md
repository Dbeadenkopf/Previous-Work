# T1CG DevOps Onboarding and Training

Repository for training and onboarding exercises for DevOps and SRE tasks

Main tasks:

1. Set up Terraform on your local computer and connect to the web server on AWS.
   - See terraform/README.md for more details
2. Set up Ansible on your local computer and configure the web server on AWS.
   - See ansible/README.md for more details
3. Use MongoDB to deploy a database on new AWS EC2 instance.
   - Refer to your deployed static page on the web server for more details
4. Add an EBS volume to your MongoDB instance
   - Modify the terraform compute module to allow the template file to attach an EBS volume to the instance, and make the volume configurable with variables. Remember, when making changes to terraform and reapplying, use terraform apply
     - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/volume_attachment
   - Set up a playbook to add xfs file system to newly created volume, and then mount mongo to that newly created file system.
     - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/device_naming.html
   - Make sure the volume mount is persistent on boots
   - Set up a playbook for importing data into MongoDB
   - Set up a playbook for exporting data from MongoDB
5. Create a simple hello world API that can read from the database you've deployed
   - Create new environments folder that contains another main.tf and change necessary values to create new terraform server for your api
   - The API doesn't need to be fancy—just one endpoint that retrieves something from the db. Don't spend more than about an hour on creating the it.
     - To connect your api to the mongo, you will have to handle the mongo networking on the mongo instance. This involves changing the mongod config file to allow connections for all ips and enabling authorization. You must also modify the terraform file in the mongo repository to expose the correct port for mongo. Remember to terraform apply the changes!
   - Set up a playbook to deploy api to new terraform server.
   - Add a button to the static page that fetches and displays the API results
     - Remember, when modifying code on static html instance, rerun the init_nginx playbook to apply changes to instance.
6. Dockerize the components (web, db, api) and get them running locally
   - Set up Docker on your local computer
   - Create Dockerfile to for each to get running locally.
7. Install Docker on the AWS servers and deploy your containers
   - Make sure you stop previously started api, mongo and html processes on respective aws instances to make sure they are using the docker containers you will deploy
     - In each instance shell...
     - Download lsof `sudo yum install lsof`
     - Use lsof command to get pid number `sudo lsof -i -P -n | grep LISTEN`
       -Then use kill command with PID number `Kill <PID>`
     - Use lsof command above to check to see if process is gone
   - https://docs.aws.amazon.com/AmazonECS/latest/userguide/create-container-image.html
