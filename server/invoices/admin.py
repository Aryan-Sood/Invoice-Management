from django.contrib import admin
from invoices.models import Invoices, InvoiceDetails
from invoices.apps import AppConfig

@admin.register(Invoices)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['invoice_number', 'customer_name', 'date']

@admin.register(InvoiceDetails)
class InvoiceDetailAdmin(admin.ModelAdmin):
    list_display = ['invoice', 'description', 'quantity', 'unit_price', 'line_total']