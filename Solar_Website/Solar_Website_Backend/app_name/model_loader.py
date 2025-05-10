# myapp/models/model_loader.py
import tensorflow as tf
from django.conf import settings
import os
import numpy as np

# Load model only once when the server starts
model = None

def load_model():
    global model
    if model is None:
        model_path = os.path.join(settings.BASE_DIR, 'myapp/models/my_model.h5')
        model = tf.keras.models.load_model(model_path)
    return model

def make_prediction(input_data):
    model = load_model()
    # Preprocess input_data as needed
    prediction = model.predict(np.array([input_data]))
    return prediction