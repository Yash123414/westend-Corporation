from django.contrib.admin import AdminSite

class WestendAdminSite(AdminSite):
    site_header = "Acornpensy Exports Admin"
    site_title = "Acornpensy Admin"
    index_title = "Dashboard"

# Create custom admin instance
westend_admin_site = WestendAdminSite(name='westend_admin')
