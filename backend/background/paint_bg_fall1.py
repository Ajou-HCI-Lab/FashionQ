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

#%matplotlib inline 

# root: 현재 폴더
ROOT_DIR = os.path.abspath("./")
sys.path.append(ROOT_DIR) 

# model 들어있는 폴더
MODEL_DIR = os.path.join(ROOT_DIR, "background/Mask_RCNN")

import background.Mask_RCNN.samples.coco.coco as fancy
config = fancy.CocoConfig() # 기본 설정들. hyperparameter

DATA_DIR = "./images"  # TODO: enter value here
model_name = "mask_rcnn_coco.h5"

# Override the training configurations with a few
# changes for inferencing.
class InferenceConfig(config.__class__):
    # Run detection on one image at a time
    NAME = "coco"
    NUM_CLASSES = 1 + 80
    GPU_COUNT = 1
    IMAGES_PER_GPU = 1
    

config = InferenceConfig()
#config.display()

DEVICE = "/gpu:1"  # /cpu:0 or /gpu:0
TEST_MODE = "inference"

def get_ax(rows=1, cols=1, size=16):
    """Return a Matplotlib Axes array to be used in
    all visualizations in the notebook. Provide a
    central point to control graph sizes.
    
    Adjust the size attribute to control how big to render images
    """
    _, ax = plt.subplots(rows, cols, figsize=(size*cols, size*rows))
    return ax

# dataset = fancy.CocoDataset()
# dataset.load_coco(DATA_DIR, "test") # test로 바꾸기
#
# # Must call before using the dataset
# dataset.prepare()
#
# print("Images: {}\nClasses: {}".format(len(dataset.image_ids), dataset.class_names))

with tf.device(DEVICE):
    model = modellib.MaskRCNN(mode="inference", model_dir=MODEL_DIR,
                              config=config)

# Load weights
model_path = os.path.join(MODEL_DIR, model_name)

print("Loading weights ", model_path)
model.load_weights(model_path, by_name=True)

def apply_mask(image, mask, color, alpha=0.5):
    """apply mask to image"""
    for n, c in enumerate(color):
        image[:, :, n] = np.where(
            mask != 1,
            image[:, :, n] * (1 - alpha) + alpha * c,
            image[:, :, n]
        )
    return image

def display_instances(image, boxes, masks, ids, names, scores, colors=[(0,0,0)]):

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
            S = (xmax-xmin)*(ymax-ymin)
            if S > largest_S:
                largest_S = S
                lri = i
    else:
        lri = 0        
    
    for i, color in enumerate(colors):
        
        mask = masks[:, :, lri] #
        image = apply_mask(image, mask, color, alpha=1)

    return image


import cv2
from matplotlib import pyplot as plt # as는 alias 적용시 사용
import time

def paint_bg(fancy_path, colors=[(0,0,0)]):
    fancy_images_path = os.path.join(fancy_path, 'images')
    bg_dir = 'bg_black_images'
    bg_path = os.path.join(fancy_path, bg_dir)
    if not os.path.isdir(bg_path):
        os.mkdir(bg_path)
    
    start = time.time()
    data_type_list = sorted([folder for folder in os.scandir(fancy_images_path) if '.' not in folder.name], key=lambda x: x.name)
    for data_type in data_type_list:
        bg_data_type_path = os.path.join(bg_path, data_type.name)
        if not os.path.isdir(bg_data_type_path):
            os.mkdir(bg_data_type_path)
        for image_class in sorted([class_ for class_ in os.scandir(data_type) if '.' not in class_.name], key=lambda y: y.name):
            bg_class_path = os.path.join(bg_data_type_path, image_class.name)
            if not os.path.isdir(bg_class_path):
                os.mkdir(bg_class_path)
            
            for image in sorted([i for i in os.scandir(image_class) if '.jpg' in i.name], key=lambda z: z.name):
            
                img = cv2.imread(image.path, cv2.IMREAD_COLOR)
                
                b, g, r = cv2.split(img)   # img파일을 b,g,r로 분리
                img2 = cv2.merge([r,g,b])

                results = model.detect([img2], verbose=0)
                r = results[0]
                
                try:
                    colored_image = display_instances(img2, r['rois'], r['masks'], r['class_ids'], ['person'], r['scores'], colors=[(0,0,0)])
                
                    r, g, b = cv2.split(colored_image)
                    colored_image = cv2.merge([b,g,r])

                    save_path = os.path.join(bg_class_path, image.name)
                    cv2.imwrite(save_path, colored_image)
                
                except:
                    print ('error: {}'.format(image.path))
                
        end = time.time()
        print ('{} folder is done: {:.2}m'.format(data_type.name, (end-start)/60))
        
def paint_bg2(fancy_path, colors=[(0,0,0)]):
    fancy_images_path = os.path.join(fancy_path, 'data') #### 경로(폴더) 수정
    bg_dir = 'bg_black_images'
    bg_path = os.path.join(fancy_path, bg_dir)
    if not os.path.isdir(bg_path):
        os.mkdir(bg_path)
    
    start = time.time()
    # fancy_path/data/data_type
    data_type_list = sorted([folder for folder in os.scandir(fancy_images_path) if '.' not in folder.name], key=lambda x: x.name, reverse=True)
    for data_type in data_type_list:
        bg_data_type_path = os.path.join(bg_path, data_type.name)
        if not os.path.isdir(bg_data_type_path):
            os.mkdir(bg_data_type_path)
        for image_class in sorted([class_ for class_ in os.scandir(data_type) if '.' not in class_.name], key=lambda y: y.name):
            bg_class_path = os.path.join(bg_data_type_path, image_class.name)
            if not os.path.isdir(bg_class_path):
                os.mkdir(bg_class_path)
            
            for image in sorted([i for i in os.scandir(image_class) if '.jpg' in i.name], key=lambda z: z.name):

            
                img = cv2.imread(image.path, cv2.IMREAD_COLOR)
                
                b, g, r = cv2.split(img)   # img파일을 b,g,r로 분리
                img2 = cv2.merge([r,g,b])

                results = model.detect([img2], verbose=0)
                r = results[0]
                
                try:
                    colored_image = display_instances(img2, r['rois'], r['masks'], r['class_ids'], ['person'], r['scores'], colors=[(0,0,0)])
                
                    r, g, b = cv2.split(colored_image)
                    colored_image = cv2.merge([b,g,r])

                    save_path = os.path.join(bg_class_path, image.name)
                    if os.path.isfile(save_path):
                        print ("already file exists, {}".format(save_path))
                        continue
                    cv2.imwrite(save_path, colored_image)
                    if os.path.isfile(save_path):
                        print ('save !!, {}'.format(save_path))
                
                except:
                    print ('error: {}'.format(image.path))
                
        end = time.time()
        print ('{} folder is done: {:.2}m'.format(data_type.name, (end-start)/60))


def paint_bg3(current_filename, colors=[(0, 0, 0)]):
    path = "../back/media/"
    fancy_images_path = os.path.join(path)  #### 경로(폴더) 수정
    bg_dir = 'bg_black_images'
    bg_path = os.path.join(path, bg_dir)
    print(os.getcwd())
    print(os.listdir(path))
    print(bg_path)
    if not os.path.isdir(bg_path):
        os.mkdir(bg_path)

    start = time.time()
    # fancy_path/data/data_type
    data_type_list = sorted([folder for folder in os.scandir(fancy_images_path) if '.' not in folder.name],
                            key=lambda x: x.name, reverse=True)
    for data_type in data_type_list:
        bg_data_type_path = os.path.join(bg_path, data_type.name)
        if not os.path.isdir(bg_data_type_path):
            os.mkdir(bg_data_type_path)
        for image_class in sorted([class_ for class_ in os.scandir(data_type) if '.' not in class_.name],
                                  key=lambda y: y.name):
            bg_class_path = os.path.join(bg_data_type_path, image_class.name)
            if not os.path.isdir(bg_class_path):
                os.mkdir(bg_class_path)

            for image in sorted([i for i in os.scandir(image_class) if '.jpg' in i.name], key=lambda z: z.name):

                img = cv2.imread(image.path, cv2.IMREAD_COLOR)

                b, g, r = cv2.split(img)  # img파일을 b,g,r로 분리
                img2 = cv2.merge([r, g, b])

                results = model.detect([img2], verbose=0)
                r = results[0]

                try:
                    colored_image = display_instances(img2, r['rois'], r['masks'], r['class_ids'], ['person'],
                                                      r['scores'], colors=[(0, 0, 0)])

                    r, g, b = cv2.split(colored_image)
                    colored_image = cv2.merge([b, g, r])

                    save_path = os.path.join(bg_class_path, image.name)
                    if os.path.isfile(save_path):
                        print("already file exists, {}".format(save_path))
                        continue
                    cv2.imwrite(save_path, colored_image)
                    if os.path.isfile(save_path):
                        print('save !!, {}'.format(save_path))

                except:
                    print('error: {}'.format(image.path))

        end = time.time()
        print('{} folder is done: {:.2}m'.format(data_type.name, (end - start) / 60))


if __name__ == "__main__":
    fancy_path = '/home/jin6491/temp_15/Color_extraction'
    paint_bg2(fancy_path)
    
    # /home/jin6491/temp_15/Color_extraction/data/data_type/class/xxx.jpg

