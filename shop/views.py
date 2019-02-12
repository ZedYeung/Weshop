from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics, mixins, viewsets
from rest_framework.throttling import UserRateThrottle
from rest_framework_extensions.cache.mixins import CacheResponseMixin
from .models import Category, Product
from .filter import ProductFilter
from .paginator import ProductPagination
from .serializers import CategorySerializer, ProductSerializer


# Create your views here.
class ProductViewSet(CacheResponseMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """
    Product
    """
    queryset = Product.objects.all()
    throttle_classes = (UserRateThrottle, )
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    filter_class = ProductFilter
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('name', 'description')
    ordering_fields = ('price', 'created')


class CategoryViewSet(CacheResponseMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """
    Category
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

