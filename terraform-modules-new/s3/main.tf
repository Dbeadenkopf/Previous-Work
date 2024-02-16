resource "aws_s3_bucket" "bucket" {
  bucket = local.name

  versioning {
    enabled = var.versioning
  }
  tags = merge(
    {
      Name = local.name
    },
    var.tags
  )
}
