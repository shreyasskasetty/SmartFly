from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
import random
from datetime import datetime
from gate_time.models import Gate

def get_gate(request):
        shops = Gate.objects.all()
        # Serialize the data to JSON
        shop_list = []
        for shop in shops:
            shop_dict = {
                'name': shop.name,
                'latitude': shop.latitude,
                'longitude': shop.longitude,
            }
            shop_list.append(shop_dict)

        return JsonResponse({'gates': shop_list})