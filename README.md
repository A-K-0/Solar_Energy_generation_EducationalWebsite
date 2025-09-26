# ☀️ Solar Sense: Solar Power Generation Prediction

**Welcome to Solar Sense!** Join India's renewable energy revolution today and explore our cutting-edge prediction tool to discover how much clean energy your location can generate throughout the year.

This advanced platform uses machine learning and real-time weather data to provide accurate, location-specific forecasts, making solar energy planning simple and efficient.

![Welcome to Solar Sense homepage](image_6c1dc6.jpg)

---

## 🎯 Our Mission & Objectives

We are here to revolutionize solar energy planning in India.

### **Aim**
To provide **accurate, location-specific predictions** of solar power generation using cutting-edge **machine learning and weather data analysis**.

### **Objectives**
* Provide **precise solar generation forecasts** to optimize energy planning.
* Integrate **real-time weather data** with robust machine learning models.
* Create an **intuitive interface** for both professionals and homeowners.
* Support **India's transition to renewable energy sources**.

![Solar Power Prediction Guide section with Mission and Objectives](image_6c1de5.png)

---

## 🛠️ Key Features & Technology Stack

### **Key Features**

| Icon | Feature | Description |
| :---: | :--- | :--- |
| 📍 | **Precision Mapping** | Accurate location selection with a clickable map of India that fetches detailed **Latitude** and **Longitude** coordinates. |
| 🌤️ | **Real-time Weather** | Integration of live weather data (Temperature, Solar Radiation, Humidity, etc.) from **Visual Crossing API**. |
| 🧠 | **Advanced ML** | A sophisticated **Support Vector Regression (SVR)** model, trained on historical data, provides highly accurate predictions. |
| 💻 | **User-friendly UI** | Intuitive design built with **React + Vite JS** for a seamless experience. |

### **Technology Stack**

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | **React + Vite JS** | The fast, modern, and interactive user interface. |
| **Backend** | **Django (Python)** | Handles API requests, coordinates data flow, and executes the ML model. |
| **ML Model** | **Python (SVR)** | The core prediction engine, stored as a **pickle file**. |
| **API Endpoint** | **ngrok** | Used to temporarily host the backend ML prediction API as a public endpoint. |
| **Data Source** | **Visual Crossing API** | Provides real-time weather parameters. |

---

## 🚶 How to Use the Prediction Tool (Quick Guide)

Generating a prediction is easy and takes just a few clicks!

### **1. Select Location**
Click anywhere on the map of India. The system instantly detects the coordinates and populates the **Location, Latitude, and Longitude** fields.

![Solar Power Prediction interface showing the India map and the location details](image_6c1dde.jpg)

### **2. Review Weather Data**
The system automatically fetches and displays up-to-the-second weather data for your selected location:
* 🌡️ **Temperature** (e.g., $0^{\circ}C$)
* 💧 **Humidity** (e.g., $0\%$)
* 🌧️ **Precipitation** (e.g., $0\ mm$)
* ☀️ **Solar Radiation** (e.g., $0\ W/m^2$)
* ⚡ **Solar Energy** (e.g., $0\ kWh/m^2$)
* ☁️ **Cloud Cover** (e.g., $0\%$)
* 💦 **Dew Point** (e.g., $0^{\circ}C$)

### **3. Generate Prediction**
Click the green **"Predict Solar Generation"** button to feed the real-time weather data into our advanced SVR machine learning model.

!(image_6c1de2.png)

### **4. Analyze Results**
The predicted value will appear in the **Predicted Solar Power (kWh)** field, providing you with a precise energy forecast.

---

## ⚠️ Developer & Setup Notes

For running or deploying this project, please ensure you handle the API keys and endpoints correctly.

### 🔑 Visual Crossing API Key
The application **must** have a valid API key to fetch weather data.

* **Action:** Obtain a key from **visualcrossing.com** and make sure to **replace the placeholder/default key** in your backend code (where the API is called) with your own valid key.

### 🌐 ML API Hosting (ngrok)
The frontend calls the backend API to get the prediction.

* **Setup:** The current setup uses **ngrok** to create a temporary public URL for the Django backend hosting the SVR model.
* **Crucial Step:** Since ngrok URLs expire and change, if you are running this project locally, you must:
    1.  Start your Django backend.
    2.  Start ngrok to expose your backend port (e.g., `ngrok http 8000`).
    3.  **Update the API endpoint URL** in your React frontend code to use the **current, public ngrok URL** so the website can communicate with the ML model.
* **Production Note:** For a permanent, production deployment, replace the ngrok setup with a stable public cloud hosting solution.
