# tsa_wait_time/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('get-rec/', views.get_rec, name='get_rec'),
]