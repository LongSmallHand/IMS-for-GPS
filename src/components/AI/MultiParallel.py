# multivariate output 1d cnn example
#https://machinelearningmastery.com/how-to-develop-convolutional-neural-network-models-for-time-series-forecasting/
from numpy import array
from numpy import hstack
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import Flatten
from keras.layers.convolutional import Conv1D
from keras.layers.convolutional import MaxPooling1D
import numpy

# split a multivariate sequence into samples
def split_sequences(sequences, n_steps):
	X, y = list(), list()
	for i in range(len(sequences)):
		# find the end of this pattern
		end_ix = i + n_steps
		# check if we are beyond the dataset
		if end_ix > len(sequences)-1:
			break
		# gather input and output parts of the pattern
		seq_x, seq_y = sequences[i:end_ix, :], sequences[end_ix, :]
		X.append(seq_x)
		y.append(seq_y)
	return array(X), array(y)

# define input sequence
#in_seq1 = array([10, 20, 30, 40, 50, 60, 70, 80, 90])
#in_seq2 = array([15, 25, 35, 45, 55, 65, 75, 85, 95])
#out_seq = array([in_seq1[i]+in_seq2[i] for i in range(len(in_seq1))])

in_seq1 = array([34.15 ,25.58 ,25.58 ,25.59 ,25.61 ,25.62 ,25.63 ,25.64,25.65])
in_seq2 = array([100, 61.02, 60.77, 60.64, 60.59, 60.56, 60.55, 60.5, 60.47])
out_seq = array([667.9, 1011.71, 1011.71, 1011.73, 1011.73, 1011.73, 1011.73, 1011.73, 1011.73])
# convert to [rows, columns] structure
in_seq1 = in_seq1.reshape((len(in_seq1), 1))
in_seq2 = in_seq2.reshape((len(in_seq2), 1))
out_seq = out_seq.reshape((len(out_seq), 1))
# horizontally stack columns
dataset = hstack((in_seq1, in_seq2, out_seq))
# choose a number of time steps
n_steps = 3
# convert into input/output
X, y = split_sequences(dataset, n_steps)
# the dataset knows the number of features, e.g. 2
n_features = X.shape[2]
# define model
model = Sequential()
model.add(Conv1D(filters=64, kernel_size=2, activation='relu', input_shape=(n_steps, n_features)))
model.add(MaxPooling1D(pool_size=2))
model.add(Flatten())
model.add(Dense(50, activation='relu'))
model.add(Dense(n_features))
model.compile(optimizer='adam', loss='mse')
# fit model
model.fit(X, y, epochs=3000, verbose=0)
# demonstrate prediction
#x_input = array([[70,75,145], [80,85,165], [90,95,185]])
x_input = array([[25.63,60.55,1011.73], [25.64,60.5,1011.73], [25.65,60.47,1011.73]])

x_input = x_input.reshape((1, n_steps, n_features))
yhat = model.predict(x_input, verbose=0)
yreal = [25.65, 60.47, 1011.73]
dist = numpy.linalg.norm(yreal-yhat)
print(yhat, yreal)
print(dist)