from .serializers import PhotoSerializer
from .models import Photo
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.template import loader
from django.shortcuts import render
import matplotlib.pyplot as plt
from django.utils.html import escape
from django.http import JsonResponse
import pandas as pd
import os
import json
import numpy as np
import sys
import time
 # 시작 시간 저장

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))))
from load_model import singleton_retinanet
from load_model import color_extraction
import json
from collections import OrderedDict

# Create your views here.

def dataframe(request):
	return render(request, "dataframe.html")

class PhotoView(APIView):
	parser_classes = (MultiPartParser, FormParser)
	model = None

	def __init__(self):
		global model
		model = singleton_retinanet.SingletonRetinaNet.instance()

	def get(self, request, *args, **kwargs):
		photos = Photo.objects.all()
		serializer = PhotoSerializer(photos, many=True)
		return Response(serializer.data.file)

	def post(self, request, *args, **kwargs):
		global model
		start = time.time()
		print("time 1 :", time.time() - start)

		print("time 2 :", time.time() - start)
		#Color extraction model load
		color_extraction_model = color_extraction.ColorExtraction()
		photos_serializer = PhotoSerializer(data=request.data)
		# print(request.FILES['file'].name) <-이렇게하면 파일이름 불러올 수 있음
		if photos_serializer.is_valid():
			photos_serializer.save()
			print(request.FILES['file'].name)
			file = open("media/"+request.FILES['file'].name,'r')
			# print(file)
			# print("file : " + file.__str__())
			# print("file : " + file.name) <- media/서명.png
			# print("file : " + request.FILES['file'].name)  <<- 서명.png

			# print("file 경로 : "+os.path.dirname(file))

			# dataFrame으로 얻음
			df = pd.DataFrame(model.run_detection())

			class_map_arr = pd.read_csv("./mydataset_classmapping.csv")["Class"]
			prediction_array = df["prediction"][0]
			confidence_array = df["confidence"][0]

			prediction_array = prediction_array[:10]
			confidence_array = confidence_array[:10]
			confidence_array = ['{:.2f}'.format(x) for x in confidence_array]
			# print(prediction_array)
			# print(confidence_array)

			x_name = []
			for pred in prediction_array:
				x_name.append(class_map_arr[pred])

			# n_groups = len(x_name)
			# index = np.arange(n_groups)

			result_json={}

			data = []
			if len(x_name) == len(confidence_array):
				for index in range(len(x_name)):
					dict = {"name": x_name[index],
							"datas_json": confidence_array[index]}
					data.append(dict)
			result_json["datas_json"]=data
			print(data)
			df_pivot = model.columns_from_attribute_detector(df)

			df2 = pd.DataFrame(color_extraction_model.multiple_color_extraction())
			df_one_hot_sum = color_extraction_model.columns_from_color_detector(df2)

			print("time 3 :", time.time() - start)

			prediction_df_NMF = pd.concat([df_pivot, df_one_hot_sum], axis=1)
			print("df : ")
			print(df)
			print("df2 : ")
			print(df2)
			print("prediction_df_NMF : ")
			print(prediction_df_NMF)

			annotation_stylegroup = pd.read_csv("Annotation_Stylegroup.csv")
			result_list = prediction_df_NMF.columns[(prediction_df_NMF > 0).all()].tolist()
			for attr in result_list:
				if len(annotation_stylegroup.loc[annotation_stylegroup[attr] == True]) != 0:
					annotation_stylegroup = annotation_stylegroup.loc[annotation_stylegroup[attr] == True]
			result_df = annotation_stylegroup.groupby("group_fin").count()
			group_fin = result_df[result_df['files'] == result_df['files'].max()].index.values[0]


			result_json["prediction_df_NMF"]=group_fin
			# template = loader.get_template('dataframe.html')

			# return render(request, 'index.html', {'chart': dump})
			#multiple
			# print(dump)



			# if os.path.isfile("media/"+request.FILES['file'].name):
			# 	os.remove("media/"+request.FILES['file'].name)

			#TODO : 같은 값이 나오면 큰 값만 보여주기 !!
			#TODO : 옆에 번호를 빼는걸로
			return JsonResponse(result_json, json_dumps_params = {'ensure_ascii': True})
			# return HttpResponseRedirect(reverse('dataframe'))
			# return render(request,"dataframe.html",{'dataframe' : escape(df.to_html())})
			# 	render(request, "dataframe.html",{
			# 	'dataframe' : df
			# })

			# return Response(photos_serializer.datas_json, status=status.HTTP_201_CREATED)
		else:
			print('error', photos_serializer.errors)
			return Response(photos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
