from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from datetime import datetime
from keras.models import load_model

app = Flask(__name__)

# Load your pre-trained model
model = load_model("D:\DATN\IMS-for-GPS//no_time_model.keras")

# Assuming your data is in a DataFrame df and has been normalized
# Convert 'Time' to a numerical format
# df = pd.read_csv("D:\DATN\IMS-for-GPS\src\components\AI//4.csv")
# df['Time'] = df['Time'].apply(lambda x: datetime.strptime(x, '%Y-%m-%d %H:%M:%S.%f').timestamp())

# Define a route for prediction
@app.route('/predict_speed', methods=['POST'])
def predict_speed():
    try:
        data = request.get_json()
        
        latitude = float(data['Latitude'])  # Convert to float
        longitude = float(data['Longitude'])  # Convert to float
        altitude = float(data['Altitude'])  # Convert to float
        speed = float(data['Speed'])  # Convert to float

        # Reshape input to match model's input shape
        x_input = np.array([[latitude, longitude, altitude, speed]])
        x_input = x_input.reshape((1, 1, 4))

        # Make prediction
        predicted_speed = model.predict(x_input)[0][0]

        return jsonify({'predicted_speed': float(predicted_speed)})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
