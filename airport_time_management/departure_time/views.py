from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
import random
from datetime import datetime
import requests
# from gate_time.models import Gate

def get_dt(request):
    dep_day = datetime(request.GET.get('day')) #expected format - YYYY-MM-DD
    flight_number = request.GET.get('flightNum')
    years = dep_day.year
    month = dep_day.month
    day = dep_day.day

    URL = f'https://american-airlines-data-6d1bb5ff9b3a.herokuapp.com/flights?date={years}-{month}-{day}&flightNumber={flight_number}'
    # edit_url = f'flights?date={years}-{month}-{day}&flightNumber={flight_number}'
    data = requests.get(URL)
    dt = datetime(data[0]['departureTime'])

    return JsonResponse({'departure-time': dt})