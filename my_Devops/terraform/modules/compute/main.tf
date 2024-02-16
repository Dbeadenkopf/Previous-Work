# Compute module for templating an EC2 instance

# Get the default t1cg hardened ami
data "aws_ami" "hard_centos" {
  most_recent = true
  owners      = ["269453212324"]

  filter {
    name   = "name"
    values = ["hard-centos"]
  }
}

resource "aws_instance" "ec2" {
  ami               = data.aws_ami.hard_centos.id
  availability_zone = var.availability_zone
  count             = var.instance_count
  instance_type     = var.instance_type
  key_name          = var.key_name
  security_groups   = [aws_security_group.ec2_sg_access.name]

  tags = {
    Name = "${var.project_name}-${var.env_name}-${var.creator_name}-${count.index + 1}"
  }
}

resource "aws_security_group" "ec2_sg_access" {
  name        = "${var.project_name}-${var.env_name}-${var.creator_name}-sg"
  description = "Primary SG for access to ${var.project_name}-${var.env_name}-${var.creator_name}-instance"
}

resource "aws_security_group_rule" "custom_traffic_ingress" {
  security_group_id = aws_security_group.ec2_sg_access.id

  count     = var.sg_rules_count
  type      = "ingress"
  from_port = element(var.from_ports, count.index)
  to_port   = element(var.to_ports, count.index)
  protocol  = element(var.sg_rule_protocol, count.index)

  cidr_blocks = var.sg_rule_cidr_lists_map[count.index]
}

resource "aws_security_group_rule" "ssh_traffic_ingress" {
  security_group_id = aws_security_group.ec2_sg_access.id

  type      = "ingress"
  from_port = 2007
  to_port   = 2007
  protocol  = "tcp"

  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "outbound_traffic" {
  security_group_id = aws_security_group.ec2_sg_access.id

  type      = "egress"
  from_port = 0
  to_port   = 0
  protocol  = "-1"

  cidr_blocks = ["0.0.0.0/0"]
}


// attachting an EBS volume
resource "aws_ebs_volume" "ebs-volume-1" {
  count             = var.project_name == "DBMongo" ? 1 : 0
  availability_zone = var.availability_zone
  size              = 500

  tags = {
    Name = "DB Mongo Volume"
  }
}

resource "aws_volume_attachment" "ebs_att" {
  count       = var.project_name == "DBMongo" ? 1 : 0
  device_name = "/dev/sdh"
  volume_id   = aws_ebs_volume.ebs-volume-1[0].id
  instance_id = aws_instance.ec2[0].id
}
