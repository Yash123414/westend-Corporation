import os
from django.core.management.base import BaseCommand
from django.conf import settings
from api.pdf_generator import generate_catalog_pdf

CATALOG_DIR = os.path.join(settings.MEDIA_ROOT, 'catalog')
CATALOG_PATH = os.path.join(CATALOG_DIR, 'Acornpensy_Exports_Catalog.pdf')


class Command(BaseCommand):
    help = 'Regenerate the static product catalog PDF (with images) and save it to media/catalog/'

    def handle(self, *args, **options):
        os.makedirs(CATALOG_DIR, exist_ok=True)

        self.stdout.write('Generating catalog PDF (this can take a while with product images)...')
        pdf_buffer = generate_catalog_pdf()

        with open(CATALOG_PATH, 'wb') as f:
            f.write(pdf_buffer.read())

        size_kb = os.path.getsize(CATALOG_PATH) / 1024
        self.stdout.write(self.style.SUCCESS(
            f'Catalog regenerated: {CATALOG_PATH} ({size_kb:.0f} KB)'
        ))
