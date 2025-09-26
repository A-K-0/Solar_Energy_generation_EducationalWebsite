import pickle
import os
from django.conf import settings

model = None

def load_model():
    global model
    if model is None:
        model_path = os.path.join(settings.BASE_DIR, '.\Solar_Website_Backend\app_name\svr_model.pkl')
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
    return model

def make_prediction(input_data):
    model = load_model()
    # Preprocess input_data as needed
    prediction = model.predict([input_data])[0]
    return prediction

