# # show images inline
# %matplotlib inline
#
# # automatically reload modules when they have changed
# %load_ext autoreload
# %autoreload 2

# import keras
import keras

# import keras_retinanet
from keras_retinanet import models
from keras_retinanet.utils.image import read_image_bgr, preprocess_image, resize_image
from keras_retinanet.utils.visualization import draw_box, draw_caption
from keras_retinanet.utils.colors import label_color

# import miscellaneous modules
import matplotlib.pyplot as plt
import cv2
import os
import numpy as np
import time
import pandas as pd

# set tf backend to allow memory to grow, instead of claiming everything
import tensorflow as tf





class singleton_retinanet:
	_instance = None
	model = None
	nmf_path = None

	@classmethod
	def _getInstance(cls):
		return cls._instance

	@classmethod
	def instance(cls, *args, **kargs):
		cls._instance = cls(*args, **kargs)
		cls.instance = cls._getInstance
		return cls._instance



	def get_session(self):
		config = tf.ConfigProto()
		config.gpu_options.allow_growth = True
		return tf.Session(config=config)



	def __init__(self):
		# use this environment flag to change which GPU to use
		os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
		os.environ["CUDA_VISIBLE_DEVICES"] = '6'
		# set the modified tf session as backend in keras

		# hyperparamet
		backbone = "resnet101"
		season = "2014"

		keras.backend.tensorflow_backend.set_session(self.get_session())

		df_tmp = pd.read_csv("mydataset_classmapping.csv", header=None)
		df = df_tmp.to_dict()[0]

		# adjust this to point to your downloaded/trained model
		# models can be downloaded here: https://github.com/fizyr/keras-retinanet/releases
		# model_path = os.path.join('..', 'snapshots', 'mymodel.h5')

		model_path = os.path.join('mymodel.h5')  # 101로 할지
		# resnet50_csv_20.h5
		# load retinanet model
		self.model = models.load_model(model_path, backbone_name=backbone)
		self.nmf_path = "../images"
		# if the model is not converted to an inference model, use the line below
		# see: https://github.com/fizyr/keras-retinanet#converting-a-training-model-to-inference-model
		# model = models.convert_model(model)

		# print(model.summary())

		# load label to names mapping for visualization purposes
		labels_to_names = df

	def get_list(self):
		# nmf_path = './images'
		# test_list= os.listdir(os.path.join(nmf_path,season))
		test_list = os.listdir(os.path.join(self.nmf_path))
		return test_list

	def run_detection(self):
		# load image

		path = os.path.join(self.nmf_path)
		# path = "/home/jin6491/temp_15/RetinaNet/keras-retinanet-master/data/imgs" #grey+shpening_test
		image_name = []
		prediction = []
		confidence = []
		error = []

		for i, num in zip(self.get_list(), range(0, len(self.get_list()))):
			try:
				image = read_image_bgr(os.path.join(path, i))
			except:
				error.append(i)
				continue

			# copy to draw on
			draw = image.copy()
			draw = cv2.cvtColor(draw, cv2.COLOR_BGR2RGB)

			# preprocess image for network
			image = preprocess_image(image)
			image, scale = resize_image(image)

			# process image
			start = time.time()
			boxes, scores, labels = self.model.predict_on_batch(np.expand_dims(image, axis=0))
			print(num, len(self.get_list()))
			print("processing time: ", time.time() - start)
			print("-----------------------------------------")

			#     # correct for image scale
			#     boxes /= scale

			#     # visualize detections
			#     for box, score, label in zip(boxes[0], scores[0], labels[0]):
			#         # scores are sorted so we can break
			#         if score < 0.7:
			#             break

			#         color = label_color(label)

			#         b = box.astype(int)
			#         draw_box(draw, b, color=color)

			#         caption = "{} {:.3f}".format(labels_to_names[label], score)
			#         draw_caption(draw, b, caption)

			#     plt.figure(figsize=(15, 15))
			#     plt.axis('off')
			# plt.imshow(draw)
			# plt.show()
			image_name.append(i)
			prediction.append(labels[0])
			confidence.append(scores[0])

			prediction_new = []

		for i in prediction:
			new_i = list(i)
			prediction_new.append(new_i)

		confidence_new = []

		for i in confidence:
			new_i = list(i)
			confidence_new.append(new_i)

		df = pd.DataFrame({"image_name": image_name, "prediction": prediction_new, "confidence": confidence_new})
		# df.to_csv("./test_result/test_result_resnet101-e20_2014.csv", index=False)

		print(df)
		return df
	# test_result_grey_shapening.csv

		# print(i)