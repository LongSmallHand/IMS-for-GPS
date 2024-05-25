import numpy as np
import pandas as pd
from keras.models import Sequential
from keras.layers import LSTM, Dense, Conv1D, MaxPooling1D, TimeDistributed, Flatten

# Đọc dữ liệu từ file CSV
df = pd.read_csv("D:\DATN\IMS-for-GPS\src\components\AI//4.csv")

# Chia dữ liệu thành input (X) và output (y)
X = df[['Latitude', 'Longitude', 'Altitude', 'Speed']].values
y = df['Speed'].values

# Số bước thời gian bạn muốn sử dụng
n_steps = 3

# Tạo dữ liệu với các bước thời gian
def create_sequences(data, n_steps):
    X, y = [], []
    for i in range(len(data) - n_steps):
        X.append(data[i:i+n_steps])
        y.append(data[i + n_steps][3])  # Dùng 'Speed' làm giá trị đầu ra
    return np.array(X), np.array(y)

# Chuẩn bị dữ liệu
X, y = create_sequences(X, n_steps)

# Cập nhật kích thước đầu vào cho mô hình
n_features = X.shape[2]  # Số đặc trưng trong dữ liệu của bạn

# Xây dựng lại mô hình với kích thước đầu vào cập nhật
model = Sequential()
model.add(TimeDistributed(Conv1D(filters=64, kernel_size=1, activation='relu'), input_shape=(n_steps, n_features, 1)))
model.add(TimeDistributed(MaxPooling1D(pool_size=1)))
model.add(TimeDistributed(Flatten()))
model.add(LSTM(50, activation='relu'))
model.add(Dense(1))
model.compile(optimizer='adam', loss='mse')

# Huấn luyện mô hình
model.fit(X, y, epochs=200, verbose=0)

# Lưu mô hình
model.save('lc_rnn_speed_model.keras')

# Dự đoán tốc độ với dữ liệu mới (thay thế bằng dữ liệu của bạn)
x_input = np.array([[10.7811855, 106.6322779, 6.300000190734863, 4.412963390350342]])
x_input = np.repeat(x_input, n_steps, axis=0).reshape((1, n_steps, n_features, 1))
yhat = model.predict(x_input, verbose=0)
print("Tốc độ dự đoán:", yhat[0][0])
