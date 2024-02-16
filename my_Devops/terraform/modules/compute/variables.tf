variable "availability_zone" {
  description = "az for instance placement"
}

variable "instance_count" {
  description = "number of instances to build"
}

variable "instance_type" {
  description = "type of instance to build"
}

variable "key_name" {
  description = "aws ssh key name for the instance"
}

variable "project_name" {
  description = "name of project for creation"
}

variable "env_name" {
  description = "environment for instance"
  default     = "onboarding"
}

variable "creator_name" {
  description = "put your last name here"
}

variable "sg_rules_count" {
  description = "number of custom sg rules"
}

variable "from_ports" {
  description = "list of starting port range for custom sg rules"
  type        = list
}

variable "to_ports" {
  description = "list of end port range for custom sg rules"
  type        = list
}

variable "sg_rule_protocol" {
  description = "list of protocols for custom sg rules"
  type        = list
}

variable "sg_rule_cidr_lists_map" {
  description = "map of lists of cidr range for ingress access to custom sg rules"
  type        = map
}
