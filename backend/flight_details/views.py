from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
import random
from datetime import datetime
from gate_time.models import Gate

import googlemaps
import requests

def get_flight_details(request):
    dict ={
        "fromCode": 'IAH',
        "toCode": 'JFK',
        "flightNumber": 'AB123',
        "destination": 'New York',
        "date": '2024-01-28',
        "departTime": '2:00 pm',
        "duration": "23 h 25 m",
        "price": "$790"
    }
    return JsonResponse(dict)