from django.urls import path

from .views import predict, check_ngrok_status

urlpatterns = [
    path('api/predict/', predict, name='predict'),
    path('api/check-ngrok-status/', check_ngrok_status, name='check-ngrok-status')
]