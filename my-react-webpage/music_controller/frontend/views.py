# This file will render the index template , and let react take care of it
from django.shortcuts import render

def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')
