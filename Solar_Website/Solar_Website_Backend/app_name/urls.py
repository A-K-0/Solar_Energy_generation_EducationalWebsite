from django.urls import path

from .views import Predict_Solargeneration

urlpatterns = [
    path('api/Predict_Solargeneration/', Predict_Solargeneration, name='predict-solargeneration')
]