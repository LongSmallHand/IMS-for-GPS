import numpy as np
import pandas as pd
from datetime import datetime
from keras.models import Sequential
from keras.layers import Dense, Flatten
from tensorflow.keras.layers import Conv1D, MaxPooling1D

# Assuming your data is in a DataFrame df and has been normalized
# Convert 'Time' to a numerical format
df = pd.read_csv("D:\DATN\IMS-for-GPS\src\components\AI//4.csv")
# df['Time'] = df['Time'].apply(lambda x: datetime.strptime(x, '%Y-%m-%d %H:%M:%S.%f').timestamp())
# print(df['Time'][0])
# Split into input and output
X = df[['Latitude', 'Longitude', 'Altitude', 'Speed']].values
print(X[0])
y = df['Speed'].values

# Reshape input to be [samples, time steps, features]
X = X.reshape(X.shape[0], 1, X.shape[1])

n_steps, n_features = X.shape[1], X.shape[2]

print("X shape:", X.shape)
print("y shape:", y.shape)
print(n_steps)
print(n_features)


# define model
model = Sequential()
model.add(Conv1D(filters=128, kernel_size=1, activation='relu', input_shape=(n_steps, n_features)))
#model.add(Conv1D(filters=64, kernel_size=2, activation='relu'))
model.add(MaxPooling1D(pool_size=1))
model.add(Flatten())
model.add(Dense(100, activation='relu'))
model.add(Dense(1))
model.compile(optimizer='adam', loss='mse')

# fit model
model.fit(X, y, epochs=2000, verbose=0)

# demonstrate prediction
# you need to provide your own new data here
x_input = np.array([[10.7811855, 106.6322779, 6.300000190734863, 4.412963390350342]])
# print(x_input.dtype)  # example data
x_input = x_input.reshape((1, n_steps, n_features))
# print(x_input.dtype)
yhat = model.predict(x_input, verbose=0)
print("Predicted Speed:", yhat[0][0])
print(yhat)

model.save('no_time_model.keras')