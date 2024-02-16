# Template file for the initial training project

provider "aws" {
  region = "us-east-2"
}

module "aws_compute" {
  source = "../../modules/compute"

  instance_count    = 1
  instance_type     = "t2.micro"
  availability_zone = "us-east-2a"

  // Change this to your key so you can run the deploy scripts
  // If you do not have a key get one.
  key_name = "DB" // name of my key

  project_name = "DBMongo"
  env_name     = "DavesNewInstance"

  // Change this to your name
  creator_name = "David"

  sg_rules_count   = 1
  from_ports       = [27017]
  to_ports         = [27017]
  sg_rule_protocol = ["tcp"]

  sg_rule_cidr_lists_map = {
    "0" = ["98.204.126.49/32"]
    "1" = ["3.137.199.92/32"]
  }

  # if you wanted to set this up for multiple rules it would look like
  # this: 
  # sg_rules_count = 3
  # from_ports = [80, 8060, 8000]
  # to_ports = [80, 8060, 8010]
  # sg_rule_protocol = ["tcp", "tcp", "tcp"]
  # sg_rule_cidr_lists_map = {
  #   "0" = ["0.0.0.0/0"]
  #   "1" = ["0.0.0.0/0"]
  #   "2" = ["0.0.0.0/0"]
  # }
  # this sets up rules for ports 80, 8060, and 8000 - 8010
}
