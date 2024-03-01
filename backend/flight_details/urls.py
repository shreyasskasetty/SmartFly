# tsa_wait_time/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('get-flight-details/', views.get_flight_details, name='get_flight_details')
]