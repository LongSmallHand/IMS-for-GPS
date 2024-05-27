import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, SimpleRNN

# Đọc dữ liệu từ file CSV hoặc DataFrame
df = pd.read_csv("D:\DATN\IMS-for-GPS\src\components\AI//4.csv")

# Tạo các cột đầu vào và đầu ra
X = df[['Latitude', 'Longitude', 'Altitude', 'Speed']].values
y = df['Speed'].shift(-1).fillna(method='ffill').values  # Dịch dữ liệu tốc độ lên một hàng

# Chuẩn hóa dữ liệu
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)
y_scaled = scaler.fit_transform(y.reshape(-1, 1)).flatten()

# Chia dữ liệu thành tập huấn luyện và tập kiểm tra
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y_scaled, test_size=0.2, random_state=42)

# Reshape dữ liệu cho phù hợp với đầu vào của mạng nơ-ron
X_train = X_train.reshape((X_train.shape[0], 1, X_train.shape[1]))
X_test = X_test.reshape((X_test.shape[0], 1, X_test.shape[1]))

# Tạo mô hình RNN
model_rnn = Sequential([
    SimpleRNN(50, activation='relu', input_shape=(X_train.shape[1], X_train.shape[2])),
    Dense(1)
])

# Biên dịch mô hình
model_rnn.compile(optimizer='adam', loss='mse')

# Huấn luyện mô hình RNN
history_rnn = model_rnn.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_test, y_test), verbose=1)

# Dữ liệu mới
new_data = np.array([[10.78119, 106.6314042, 6.5, 3.2687315940856934]])  # Đây là một ví dụ, bạn cần phải có dữ liệu thực tế

# Chuẩn hóa dữ liệu mới mà không cần fit lại
new_data_scaled = scaler.transform(new_data)

# Reshape dữ liệu mới
new_data_reshaped = new_data_scaled.reshape((1, 1, new_data_scaled.shape[1]))

# Dự đoán kết quả với mô hình RNN
predicted_result_rnn = model_rnn.predict(new_data_reshaped)

print("Predicted Speed (RNN):", predicted_result_rnn[0][0])
