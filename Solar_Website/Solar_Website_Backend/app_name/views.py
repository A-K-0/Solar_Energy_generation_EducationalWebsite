from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
import json

# ngrok URL - Update this with your ngrok URL
NGROK_URL = 'https://5e7f-34-75-95-204.ngrok-free.app'

@api_view(['GET'])
def check_ngrok_status(request):
    """
    Check if the ngrok service is available
    """
    try:
        response = requests.get(f'{NGROK_URL}/health')
        if response.ok:
            return JsonResponse({'status': 'online'})
        else:
            return JsonResponse({'status': 'offline'})
    except Exception as e:
        print(f"Error checking ngrok status: {str(e)}")
        return JsonResponse({'status': 'offline'})

@api_view(['POST'])
def predict(request):
    """
    Forward prediction request to ngrok service
    """
    try:
        # Get the JSON data from the React frontend
        data = request.data
        print("Received data from frontend:", data)
        
        # Forward the request to ngrok with the exact same data structure
        ngrok_response = requests.post(
            f'{NGROK_URL}/weather_prediction',
            json=data,
            headers={
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            timeout=10
        )
        
        print(f"ngrok response status: {ngrok_response.status_code}")
        
        # If ngrok returns an error
        if not ngrok_response.ok:
            try:
                error_data = ngrok_response.json()
                return Response(
                    {'error': error_data.get('error', f'Error from prediction service: {ngrok_response.status_code}')}, 
                    status=ngrok_response.status_code
                )
            except Exception:
                return Response(
                    {'error': f'Error from prediction service: {ngrok_response.status_code}'}, 
                    status=ngrok_response.status_code
                )
        
        # If successful, return the ngrok response to the frontend
        try:
            response_data = ngrok_response.json()
            print("ngrok response data:", response_data)
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error parsing ngrok response: {str(e)}")
            return Response(
                {'error': 'Error parsing response from prediction service'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
    except requests.exceptions.RequestException as e:
        print(f"Connection error to ngrok: {str(e)}")
        return Response(
            {'error': 'Unable to connect to prediction service'}, 
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )