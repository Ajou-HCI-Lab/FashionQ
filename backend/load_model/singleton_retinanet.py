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

	def columns_from_attribute_detector(selfd, dataFrame):
		# input data 변경 필요
		###########################################################
		prediction_df = dataFrame
		###########################################################

		# parmeters
		threthold_para = 0.15

		# 컬럼 개수 확인
		# 파일위치: Retinnet -> keras-retinanet-master -> examples
		class_df = pd.read_csv("mydataset_classmapping.csv")

		# Confidence 기준 filtering
		a = prediction_df.loc[0, "confidence"]
		a = ast.literal_eval(a)
		float_a = int_confidence = list(map(float, a))

		def find_index(confidence):
			threthold = threthold_para
			confidence = ast.literal_eval(confidence)
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
			predict_class = ast.literal_eval(i)
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

	def columns_from_color_detector(self):

		####################
		# input data 변경 필요
		df = pd.read_csv("color_final_fasion14.csv")
		####################

		df = df[["img_name", "colors"]]

		# part2. function 설정
		def error_check(x):
			x = x.replace("['", "").replace("']", "")
			if x[:9] == "/anaconda":
				x = "complex"
			elif x[:6] == "Unable":
				x = "complex"
			elif x[:6] == "/Users":
				x = "complex"
			elif x[0] == "[":
				x = "complex"

			return x

		def multi_check(x):
			num = x.count(",")
			if num > 0:
				result = x.split(",")[1].replace(" ", "")
			else:
				result = "None_color"
			return result

		def multi_check2(x):
			num = x.count(",")
			if num > 0:
				result = x.split(",")[0].replace(" ", "")
			else:
				result = x
			return result

		# part3. 전처리
		# 에러 찾아내기 - "None_color"로 표기
		df["color"] = df["colors"].apply(error_check)
		# 멀티 컬러 나누기 1
		df["color2"] = df["color"].apply(multi_check)
		# 멀티 컬러 나누기 2
		df["color"] = df["color"].apply(multi_check2)

		# pivot 위한 전처리 - color1, color2 df를 나누어 행기준 concat
		df_color1 = df[["img_name", "color"]]
		df_color2 = df[["img_name", "color2"]]
		df_color2.rename(columns={"color2": "color"}, inplace=True)

		# concat
		df_concat = pd.concat([df_color1, df_color2])
		# one hot
		one_hot = pd.get_dummies(df_concat['color'])
		# 최종 df
		df_name = pd.DataFrame(df_concat["img_name"])
		df_one_hot = pd.concat([df_name, one_hot], axis=1)
		df_one_hot_sum = df_one_hot.pivot_table(index="img_name", aggfunc=sum)
		df_one_hot_sum = df_one_hot_sum.drop("None_color", axis=1)

		# 전체 컬러 기준으로 컬럼 생성
		cols = ["black", "blue", "brown", "complex", 'gray', 'green', 'maroon', 'mustard', 'orange', 'pink',
				'purple', 'red', 'white', 'yellow']
		df_col = list(df_one_hot_sum.columns)

		for i in df_col:
			cols.remove(i)

		for i in cols:
			df_one_hot_sum[i] = 0

		# Multi color feature 만들기 (컬러값이 2개 나온 경우)
		def multi_color_feature(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14):
			sum_a = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11 + a12 + a13 + a14
			if sum_a > 1:
				z = 1
			else:
				z = 0
			return z

		# 사용자 함수 적용
		df_one_hot_sum["multi_color"] = df_one_hot_sum.apply(
			lambda x: multi_color_feature(x["black"], x["blue"], x["brown"], x["complex"],
										  x['gray'], x['green'], x['maroon'], x['mustard'], x['orange'], x['pink'],
										  x['purple'], x['red'], x['white'], x['yellow']), axis=1)

	# test_result_grey_shapening.csv

		# print(i)