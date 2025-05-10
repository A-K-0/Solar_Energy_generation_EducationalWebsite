import json
from django.http import HttpResponse, JsonResponse
from matplotlib import pyplot as plt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from wordcloud import WordCloud
from .models import PaperRank
from .serializers import PaperRankSerializer
import csv, io
from django.db import transaction
from django.db.models import Min, Max, Count
from collections import Counter
from rest_framework.decorators import api_view
from rest_framework.response import Response
import google.generativeai as genai
from dotenv import load_dotenv
import re
import io
import base64
import atexit
import os
import csv
import io
import pandas as pd
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
from .models import PaperRank
import re
from django.db import transaction
from wordcloud import WordCloud
from collections import Counter
import matplotlib.pyplot as plt
import base64
from django.db.models import Min, Max, Count
import io
from .serializers import PaperRankSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import google.generativeai as genai
from dotenv import load_dotenv
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
import os

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .model_loader import make_prediction

@api_view(['POST'])
def Predict_Solargeneration(request):
    print("Predict_Solargeneration called")
    
    try:
        # Access the JSON data from the request
        data = request.data
        print("Received data:", data)
        
        # Validate required fields (example)
        required_fields = ['latitude', 'longitude', 'temperature', 'solar_radiation', 'humidity', 'precipitation','solar_energy','cloud_cover','dew_point']
        for field in required_fields:
            if field not in data:
                return Response({'error': f'Missing field: {field}'}, status=status.HTTP_400_BAD_REQUEST)
        
        prediction = make_prediction(input_data)
        
        return Response({'prediction': prediction}, status=status.HTTP_200_OK)
        
    except Exception as e:
        print("Error:", str(e))
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    