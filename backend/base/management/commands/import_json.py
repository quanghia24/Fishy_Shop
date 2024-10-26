import json
from django.core.management.base import BaseCommand

from base.models import Product

class Command(BaseCommand):
    help = 'Import products from a JSON file'

    def handle(self, *args, **kwargs):
        with open(r'/home/quanghia/unidata/myProjects/pythonDir/Fishy_Shop/backend/json_data.json', 'r', encoding='utf8') as file:
            data = json.load(file)

            print(data)

            for item in data:
                Product.objects.create(**item)

        self.stdout.write(self.style.SUCCESS('DONE'))