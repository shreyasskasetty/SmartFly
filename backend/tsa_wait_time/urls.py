# tsa_wait_time/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('get-wait-time/', views.simulated_tsa_wait_time, name='simulated_tsa_wait_time'),
]