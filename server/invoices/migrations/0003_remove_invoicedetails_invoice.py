# Generated by Django 4.2.16 on 2024-11-21 13:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0002_alter_invoicedetails_invoice'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invoicedetails',
            name='invoice',
        ),
    ]