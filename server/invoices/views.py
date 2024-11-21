from rest_framework import viewsets
from .models import InvoiceDetails, Invoices
from .serializers import InvoiceDetailsSerializer, InvoiceSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class InvoiceViewSet(viewsets.ModelViewSet):
    
    queryset = Invoices.objects.all()
    serializer_class = InvoiceSerializer

    @action(detail=True, methods=['get'])
    def details(self, request, pk=None):
        invoice = self.get_object()
        details = InvoiceDetails.objects.filter(invoice = invoice)
        serializer = InvoiceDetailsSerializer(details, many = True)
        print('serializer data', serializer.data)
        if serializer.is_valid():
            return Response(serializer.data)
        print('error with serializing', serializer.errors)

class InvoiceDetailViewSet(viewsets.ModelViewSet):
    queryset = InvoiceDetails.objects.all()
    serializer_class = InvoiceDetailsSerializer
    