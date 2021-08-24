import os
os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"]='1'
import sys
import random
import math
import re
import time
import numpy as np
import tensorflow as tf
import matplotlib
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import PIL

from background.Mask_RCNN.mrcnn import utils
from background.Mask_RCNN.mrcnn import visualize
from background.Mask_RCNN.mrcnn.visualize import display_images
import background.Mask_RCNN.mrcnn.model as modellib
from background.Mask_RCNN.mrcnn.model import log

import background.Mask_RCNN.samples.coco.coco as fancy
import cv2
from matplotlib import pyplot as plt # as는 alias 적용시 사용
import time


class PaintBgFall:

	_instance = None
	model = None
	media_path = None
	@classmethod
	def _getInstance(cls):
		return cls._instance

	@classmethod
	def instance(cls, *args, **kargs):
		cls._instance = cls(*args, **kargs)
		cls.instance = cls._getInstance
		return cls._instance


	def __init__(self):

		global model, media_path

		os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"
		os.environ["CUDA_VISIBLE_DEVICES"]='6'
		os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'
		model_path = os.path.join('mask_rcnn_coco.h5')  # 101로 할지

		media_path = "../back/media"
		config = fancy.CocoConfig() # 기본 설정들. hyperparameter

		class InferenceConfig(config.__class__):
			# Run detection on one image at a time
			NAME = "coco"
			NUM_CLASSES = 1 + 80
			GPU_COUNT = 1
			IMAGES_PER_GPU = 1

		config = InferenceConfig()

		DEVICE = "/gpu:1"  # /cpu:0 or /gpu:0
		TEST_MODE = "inference"

		def get_ax(rows=1, cols=1, size=16):
			"""Return a Matplotlib Axes array to be used in
			all visualizations in the notebook. Provide a
			central point to control graph sizes.

			Adjust the size attribute to control how big to render images
			"""
			_, ax = plt.subplots(rows, cols, figsize=(size * cols, size * rows))
			return ax

		with tf.device(DEVICE):
			model = modellib.MaskRCNN(mode="inference", model_dir=model_path,
									  config=config)

		print("Loading weights ", model_path)
		model.load_weights(model_path, by_name=True)
		
	def go(self):

		global model, media_path

		os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"
		os.environ["CUDA_VISIBLE_DEVICES"]='6'
		os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'
		model_path = os.path.join('mask_rcnn_coco.h5')  # 101로 할지

		media_path = "../back/media"
		config = fancy.CocoConfig() # 기본 설정들. hyperparameter

		class InferenceConfig(config.__class__):
			# Run detection on one image at a time
			NAME = "coco"
			NUM_CLASSES = 1 + 80
			GPU_COUNT = 1
			IMAGES_PER_GPU = 1

		config = InferenceConfig()

		DEVICE = "/gpu:1"  # /cpu:0 or /gpu:0
		TEST_MODE = "inference"

		def get_ax(rows=1, cols=1, size=16):
			"""Return a Matplotlib Axes array to be used in
			all visualizations in the notebook. Provide a
			central point to control graph sizes.

			Adjust the size attribute to control how big to render images
			"""
			_, ax = plt.subplots(rows, cols, figsize=(size * cols, size * rows))
			return ax

		with tf.device(DEVICE):
			model = modellib.MaskRCNN(mode="inference", model_dir=model_path,
									  config=config)

		print("Loading weights ", model_path)
		model.load_weights(model_path, by_name=True)


	def apply_mask(self, image, mask, color, alpha=0.5):
		"""apply mask to image"""
		for n, c in enumerate(color):
			image[:, :, n] = np.where(
				mask != 1,
				image[:, :, n] * (1 - alpha) + alpha * c,
				image[:, :, n]
			)
		return image

	def display_instances(self, image, boxes, masks, ids, names, scores, colors=[(0, 0, 0)]):

		n_instances = boxes.shape[0]

		if not n_instances:
			print('NO INSTANCES TO DISPLAY')
		else:
			assert boxes.shape[0] == masks.shape[-1] == ids.shape[0]

		if len(boxes) >= 1:
			largest_S = 0
			lri = 0
			for i, roi in enumerate(boxes):
				xmax, xmin, ymax, ymin = roi[3], roi[1], roi[2], roi[0]
				S = (xmax - xmin) * (ymax - ymin)
				if S > largest_S:
					largest_S = S
					lri = i
		else:
			lri = 0

		for i, color in enumerate(colors):
			mask = masks[:, :, lri]  #
			image = self.apply_mask(image, mask, color, alpha=1)

		return image

	def go(self):

		global model, media_path

		os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"
		os.environ["CUDA_VISIBLE_DEVICES"]='6'
		os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'
		model_path = os.path.join('mask_rcnn_coco.h5')  # 101로 할지

		media_path = "../back/media"
		config = fancy.CocoConfig() # 기본 설정들. hyperparameter

		class InferenceConfig(config.__class__):
			# Run detection on one image at a time
			NAME = "coco"
			NUM_CLASSES = 1 + 80
			GPU_COUNT = 1
			IMAGES_PER_GPU = 1

		config = InferenceConfig()

		DEVICE = "/gpu:1"  # /cpu:0 or /gpu:0
		TEST_MODE = "inference"

		def get_ax(rows=1, cols=1, size=16):
			"""Return a Matplotlib Axes array to be used in
			all visualizations in the notebook. Provide a
			central point to control graph sizes.

			Adjust the size attribute to control how big to render images
			"""
			_, ax = plt.subplots(rows, cols, figsize=(size * cols, size * rows))
			return ax

		with tf.device(DEVICE):
			model = modellib.MaskRCNN(mode="inference", model_dir=model_path,
									  config=config)

		print("Loading weights ", model_path)
		model.load_weights(model_path, by_name=True)


    
    
	def paint_bg3(self, current_filename, colors=[(0, 0, 0)]):
		global model,media_path
		model = None
		self.go()
		path = current_filename

		path = os.path.join(media_path)
		print(os.getcwd())
		fancy_images_path = os.path.join(path, current_filename)  #### 경로(폴더) 수정
		print(fancy_images_path)

		temp_file = current_filename.split(".")
		bg_fall_text = temp_file[0] + "_bgfall." + temp_file[1]
		start = time.time()
		# fancy_path/data/data_type


		img = cv2.imread(os.path.join(path, current_filename))
		b, g, r = cv2.split(img)
		img2 = cv2.merge([r,g,b])

		results = model.detect([img2], verbose=0)
		r= results[0]

		try:
			colored_image = self.display_instances(img2, r['rois'], r['masks'], r['class_ids'], ['person'],
												   r['scores'], colors=[(0, 0, 0)])

			r, g, b = cv2.split(colored_image)
			colored_image = cv2.merge([b, g, r])

			save_path = os.path.join(path, bg_fall_text)
			print(save_path)
			# if os.path.isfile(save_path):
			# 	print("already file exists, {}".format(save_path))
			# 	continue
			cv2.imwrite(save_path, colored_image)
			if os.path.isfile(save_path):
				print('save !!, {}'.format(save_path))

		except:
			print('error: {}'.format(img.path))

		end = time.time()
		print('done: {:.2}m'.format((end - start) / 60))