import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import LSTM, Dense, Input, Concatenate
from tensorflow.keras.models import Model

# Generate synthetic data (replace with your real data)
# X_speed: historical speed sequences, X_loc: location features
X_speed = np.random.rand(100, 10, 1)  # (samples, timesteps, features)
X_loc = np.random.rand(100, 2)  # (samples, location_features)
y_speed = np.random.rand(100, 1)  # (samples, target)

# Build LC-RNN model
input_speed = Input(shape=(10, 1))
input_loc = Input(shape=(2,))
concatenated = Concatenate()([input_speed, input_loc])
rnn_output = LSTM(64)(concatenated)
output = Dense(1)(rnn_output)

model = Model(inputs=[input_speed, input_loc], outputs=output)
model.compile(optimizer='adam', loss='mean_squared_error')

# Train the model
model.fit([X_speed, X_loc], y_speed, epochs=10, batch_size=32, validation_split=0.2)

# Make predictions
new_speed_seq = np.random.rand(1, 10, 1)
new_loc = np.random.rand(1, 2)
predicted_speed = model.predict([new_speed_seq, new_loc])
print("Predicted speed:", predicted_speed[0][0])
