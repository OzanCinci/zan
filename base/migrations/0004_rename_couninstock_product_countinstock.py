# Generated by Django 4.0.3 on 2022-03-22 12:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_product_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='counInStock',
            new_name='countInStock',
        ),
    ]
