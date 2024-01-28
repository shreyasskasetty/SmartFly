# tsa_wait_time/views.py

from django.http import JsonResponse
import random
from datetime import datetime

def simulated_tsa_wait_time(request):
    # Generate a biased random wait time between 10 and 30 minutes
    now = datetime.now()
    
    # Seed the random number generator with a combination of the current hour and the ten-minute interval
    seed_value = now.hour * 6 + now.minute // 10
    random.seed(seed_value)
    
    if random.random() < 0.8:  # 80% chance
        wait_time = random.randint(20, 30)  # Skewed towards 20-30 minutes
    else:
        wait_time = random.randint(10, 19)  # Remaining 20% chance

    return JsonResponse({'tsa_wait_time': wait_time})
