from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from datetime import datetime
from keras.models import load_model

app = Flask(__name__)

# Load your pre-trained model
model = load_model("D:\DATN\IMS-for-GPS\my_model.keras")

# Assuming your data is in a DataFrame df and has been normalized
# Convert 'Time' to a numerical format
df = pd.read_csv("D:\DATN\IMS-for-GPS\src\components\AI//4.csv")
df['Time'] = df['Time'].apply(lambda x: datetime.strptime(x, '%Y-%m-%d %H:%M:%S.%f').timestamp())

# Define a route for prediction
@app.route('/predict_speed', methods=['POST'])
def predict_speed():
    try:
        data = request.get_json()
        time = data['Time']
        latitude = data['Latitude']
        longitude = data['Longitude']
        altitude = data['Altitude']

        # Reshape input to match model's input shape
        x_input = np.array([[time, latitude, longitude, altitude]])
        x_input = x_input.reshape((1, 1, 4))

        # Make prediction
        predicted_speed = model.predict(x_input)[0][0]

        return jsonify({'predicted_speed': predicted_speed})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
