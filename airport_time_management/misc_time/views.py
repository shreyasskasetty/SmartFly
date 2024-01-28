from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
import random
from datetime import datetime
from misc_time.models import Shop

def get_shop(request):
        shops = Shop.objects.all()
        # Serialize the data to JSON
        shop_list = []
        for shop in shops:
            shop_dict = {
                'name': shop.name,
                'latitude': shop.latitude,
                'longitude': shop.longitude,
                'shop_type': shop.shop_type,
                'tags': [tag.name for tag in shop.tags.all()],
            }
            shop_list.append(shop_dict)

        return JsonResponse({'shops': shop_list})