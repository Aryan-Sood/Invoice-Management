from django.db import models

class Invoices(models.Model):
    id = models.AutoField(primary_key=True)
    invoice_number = models.CharField(max_length=50, unique=True)
    customer_name = models.CharField(max_length=255)
    date = models.DateField()

    def __str__(self):
        return f"Invoice {self.invoice_number} - {self.customer_name}"


class InvoiceDetails(models.Model):
    id = models.AutoField(primary_key=True)
    invoice = models.ForeignKey(Invoices, related_name='details', on_delete = models.CASCADE)
    description = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def line_total(self):
        return self.quantity * self.unit_price

    def __str__(self):
        return f"{self.description} - {self.line_total}"