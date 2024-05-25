import numpy as np
import pandas as pd
from datetime import datetime
from keras.models import Sequential
from keras.layers import LSTM, Dense

# Assuming your data is in a DataFrame df and has been normalized
# Load data
df = pd.read_csv("d:\DATN\IMS-for-GPS\src\components\AI//4.csv")
# Convert 'Time' to a numerical format if needed
# df['Time'] = df['Time'].apply(lambda x: datetime.strptime(x, '%Y-%m-%d %H:%M:%S.%f').timestamp())
# print(df['Time'][0])

# Split into input and output
X = df[['Latitude', 'Longitude', 'Altitude', 'Speed']].values
print(X[0])
y = df['Speed'].values

# Reshape input to be [samples, time steps, features]
X = X.reshape((X.shape[0], 1, X.shape[1]))

n_steps, n_features = X.shape[1], X.shape[2]

print("X shape:", X.shape)
print("y shape:", y.shape)
print(n_steps)
print(n_features)

# Define LSTM model
model = Sequential()
model.add(LSTM(50, activation='relu', input_shape=(n_steps, n_features)))
model.add(Dense(1))
model.compile(optimizer='adam', loss='mse')

# Fit model
model.fit(X, y, epochs=2000, verbose=0)

# Demonstrate prediction
# You need to provide your own new data here
x_input = np.array([[10.7811855, 106.6322779, 6.300000190734863, 4.412963390350342]])
x_input = x_input.reshape((1, n_steps, n_features))
yhat = model.predict(x_input, verbose=0)
print("Predicted Speed:", yhat[0][0])
print(yhat)

# Save the model
model.save('lstm_model.keras')
