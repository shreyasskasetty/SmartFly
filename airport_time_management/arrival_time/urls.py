from django.urls import path
from . import views

urlpatterns = [
    path('calculate-arrival/', views.calculate_arrival_time, name='calculate_arrival_time'),
]