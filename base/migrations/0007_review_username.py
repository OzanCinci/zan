# Generated by Django 4.0.3 on 2022-04-04 00:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_alter_product_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='userName',
            field=models.TextField(blank=True, null=True),
        ),
    ]
