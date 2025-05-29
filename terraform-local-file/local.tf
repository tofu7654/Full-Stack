resource "local_file" "pet" {
    filename = var.filename
    content = var.content
    file_permission = "0700"
}