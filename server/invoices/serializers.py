from rest_framework import serializers
from .models import Invoices, InvoiceDetails

class InvoiceDetailsSerializer(serializers.ModelSerializer):
    # invoice = serializers.PrimaryKeyRelatedField(queryset=Invoices.objects.all())
    class Meta:
        model = InvoiceDetails
        fields = ['id', 'description', 'quantity', 'unit_price', 'line_total']
    

class InvoiceSerializer(serializers.ModelSerializer):
    # invoice_details = InvoiceDetailsSerializer(many=True)
    class Meta:
        model = Invoices
        fields = ['id', 'invoice_number', 'customer_name', 'date', 'invoice_details']
    
    def create(self, validated_data):
        details_data = validated_data.pop('invoice_details',[])
        invoice = Invoices.objects.create(**validated_data)

        for detail_data in details_data:
            InvoiceDetails.objects.create(invoice = invoice, **detail_data)
        
        return invoice