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
import ast
import os

# set tf backend to allow memory to grow, instead of claiming everything
import tensorflow as tf


class SingletonRetinaNet:
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
		global model, nmf_path
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
		model = models.load_model(model_path, backbone_name=backbone)

		nmf_path = "../back/media"
		# if the model is not converted to an inference model, use the line below
		# see: https://github.com/fizyr/keras-retinanet#converting-a-training-model-to-inference-model
		# model = models.convert_model(model)

		# print(model.summary())

		# load label to names mapping for visualization purposes
		labels_to_names = df

	def get_list(self):
		global model, nmf_path
		# nmf_path = './images'
		# test_list= os.listdir(os.path.join(nmf_path,season))
		test_list = os.listdir(os.path.join(nmf_path))
		return test_list

	def run_detection(self, current_filename):
		global model, nmf_path
		# load image

		path = os.path.join(nmf_path)
		print(nmf_path)
		print(path)
		# path = "/home/jin6491/temp_15/RetinaNet/keras-retinanet-master/datas_json/imgs" #grey+shpening_test
		image_name = []
		prediction = []
		confidence = []
		error = []

		image = read_image_bgr(os.path.join(path, current_filename))
		draw = image.copy()
		draw = cv2.cvtColor(draw, cv2.COLOR_BGR2RGB)

		start = time.time()
		boxes, scores, labels = model.predict_on_batch(np.expand_dims(image, axis=0))
		print("processing time: ", time.time() - start)
		print("-----------------------------------------")

		image_name.append(current_filename)
		prediction.append(labels[0])
		confidence.append(scores[0])
		prediction_new = []


		# for i, num in zip(self.get_list(), range(0, len(self.get_list()))):
		# 	try:
		# 		image = read_image_bgr(os.path.join(path, i))
		# 	except:
		# 		error.append(i)
		# 		continue
		#
		# 	# copy to draw on
		# 	draw = image.copy()
		# 	draw = cv2.cvtColor(draw, cv2.COLOR_BGR2RGB)
		#
		# 	# preprocess image for network
		# 	image = preprocess_image(image)
		# 	image, scale = resize_image(image)
		#
		# 	# process image
		# 	start = time.time()
		# 	boxes, scores, labels = model.predict_on_batch(np.expand_dims(image, axis=0))
		# 	print(num, len(self.get_list()))
		# 	print("processing time: ", time.time() - start)
		# 	print("-----------------------------------------")
		#
		# 	#     # correct for image scale
		# 	#     boxes /= scale
		#
		# 	#     # visualize detections
		# 	#     for box, score, label in zip(boxes[0], scores[0], labels[0]):
		# 	#         # scores are sorted so we can break
		# 	#         if score < 0.7:
		# 	#             break
		#
		# 	#         color = label_color(label)
		#
		# 	#         b = box.astype(int)
		# 	#         draw_box(draw, b, color=color)
		#
		# 	#         caption = "{} {:.3f}".format(labels_to_names[label], score)
		# 	#         draw_caption(draw, b, caption)
		#
		# 	#     plt.figure(figsize=(15, 15))
		# 	#     plt.axis('off')
		# 	# plt.imshow(draw)
		# 	# plt.show()
		# 	image_name.append(i)
		# 	prediction.append(labels[0])
		# 	confidence.append(scores[0])
		#
		# 	prediction_new = []

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


	def columns_from_attribute_detector(self, dataFrame):
		# input datas_json 변경 필요
		###########################################################
		prediction_df = pd.DataFrame(dataFrame)
		# print(prediction_df)
		# print(prediction_df.__class__)
		###########################################################

		# parmeters
		threthold_para = 0.15

		# 컬럼 개수 확인
		# 파일위치: Retinnet -> keras-retinanet-master -> examples
		class_df = pd.read_csv("mydataset_classmapping.csv")

		# Confidence 기준 filtering
		a = prediction_df.loc[0, "confidence"]
		# a = ast.literal_eval(a)
		float_a = int_confidence = list(map(float, a))

		def find_index(confidence):
			threthold = threthold_para
			# confidence = ast.literal_eval(confidence)
			float_confidence = list(map(float, confidence))

			for i, num in zip(float_confidence, range(0, len(float_confidence))):
				if i < threthold:
					result = num
					break
			return result

		prediction_df["threthold_index"] = prediction_df["confidence"].apply(find_index)

		# prediction vlaue extractijon
		predict_value = []
		predict_img = []

		for i, num in zip(prediction_df["prediction"], range(0, len(prediction_df))):
			# predict_class = ast.literal_eval(i)
			predict_class = i
			until = prediction_df.loc[num, "threthold_index"]

			for j in range(0, until):
				predict_value.append(predict_class[j])
				predict_img.append(prediction_df.loc[num, "image_name"])

		# GT 값 설정
		gt_img = list(prediction_df["image_name"])
		gt_class = list(class_df["Class"])

		# predction 값 없는 img_name 찾기
		novalue_img = []
		for i in gt_img:
			if i not in predict_img:
				novalue_img.append(i)

		# predction 값 없는 img_name 추가 및 임시값(999) 추가
		for i in novalue_img:
			predict_img.append(i)
			predict_value.append(999)

		# 파일위치: Retinnet -> keras-retinanet-master -> examples 에 있음
		class_df_tmp = pd.read_csv("mydataset_classmapping_tmp.csv")

		# Dataframe 만들기
		df_pred = pd.DataFrame({"image_name": predict_img, "Number": predict_value})

		merge_df = pd.merge(df_pred, class_df_tmp, on="Number")
		cols = ["image_name", "Class"]
		df = merge_df[cols]

		# dummy
		df = pd.get_dummies(df, columns=['Class'])

		# 컬럼명 수정
		col_tmp = df.columns

		col_tmp_new = []

		for i in col_tmp:
			new_i = i.replace("Class_", "")
			col_tmp_new.append(new_i)

		for num, i in zip(range(0, len(col_tmp_new)), col_tmp_new):
			df.columns.values[num] = i

		# pivot
		df_pivot = pd.pivot_table(df, index='image_name', aggfunc=np.sum)
		list_pivot = df_pivot.values.tolist()

		# 중복제거
		for i in range(0, len(list_pivot)):
			for j in range(0, len(list_pivot[i])):
				if list_pivot[i][j] > 1:
					list_pivot[i][j] = 1

		# columns 정리
		pivot_cols = list(df_pivot.columns)
		cols_standard = list(class_df_tmp["Class"])

		for i in pivot_cols:
			cols_standard.remove(i)

		for i in cols_standard:
			df_pivot[i] = 0

		df_pivot = df_pivot.drop("error", axis=1)

		return df_pivot


	# test_result_grey_shapening.csv

		# print(i)