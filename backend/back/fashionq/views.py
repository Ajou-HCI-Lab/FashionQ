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
from django.shortcuts import get_object_or_404
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))))
from load_model import singleton_retinanet
from load_model import color_extraction
from load_model import paintbgfall
import json
from collections import OrderedDict


global temp_val
# Create your views here.

def dataframe(request):
	md = paintbgfall.PaintBgFall.instance()
	md.paint_bg3('FW2010_etro_11_bgfall.jpg')
	return render(request, "dataframe.html")

def map(request):
	global temp_val
	result={}
	result['group']=temp_val
	return JsonResponse(result, json_dumps_params={'ensure_ascii': True})

def test(request, groupNum):
	global temp_val
	result_json ={}
	if request.method == 'GET':
		data = {}
		print(groupNum)
		temp_val=groupNum

		json_temp = {
			"datas_json": [
				{
					"name": "Top_Cardigan_Regular",
					"datas_json": "0.55"
				},
				{
					"name": "Top_Sweater_Regular",
					"datas_json": "0.25"
				},
				{
					"name": "Top_Blouse_Regular",
					"datas_json": "0.23"
				},
				{
					"name": "Pants_Skinny",
					"datas_json": "0.20"
				},
				{
					"name": "Top_Sweatshirts_Regular",
					"datas_json": "0.19"
				},
				{
					"name": "U_neck",
					"datas_json": "0.17"
				},
				{
					"name": "quilted",
					"datas_json": "0.17"
				},
				{
					"name": "Jacket_Blazer",
					"datas_json": "0.16"
				},
				{
					"name": "crochet",
					"datas_json": "0.15"
				},
				{
					"name": "Dot",
					"datas_json": "0.14"
				}
			],
			"prediction_df_NMF": "group7"
		}

		def jaccard_similarity(list1, list2):
			s1 = set(list1)
			s2 = set(list2)
			return len(s1.intersection(s2)) / len(s1.union(s2))

		with open('representative_attributes.json') as make_file:
			json_data = json.load(make_file)
		# attribute_names = ['collar','Top_Sweater_Boxy','Pants_Straight','crochet','Argyle','Floral','gray']
		# result_json['filename']='FW2013_dries-van-noten_47.jpg'
		# result_json['attribute_names']=attribute_names

		# TODO : 여기 지울 것
		attribute_names = ['Top_Cardigan_Regular', 'Top_Sweater_Regular', 'Top_Blouse_Regular', 'Pants_Skinny',
						   'Top_Sweatshirts_Regular', 'U_neck', 'quilted', 'Jacket_Blazer', 'crochet', 'Dot', 'gray']
		result_json['attribute_names'] = attribute_names
		result_json['filename'] = 'FW2010_etro_11.jpg'
		result_json['prediction_df_NMF'] = 'group7'

		# TODO : 여기 주석 해제
		# attribute_names = result_json['attribute_names']

		jaccard_result = {}
		for group in json_data:
			temp = jaccard_similarity(attribute_names, json_data[group])
			jaccard_result[group] = temp
		# jaccard_result.sort(reverse=True)
		res = sorted(jaccard_result.items(), key=(lambda x: x[1]), reverse=True)

		# result_json=json_temp
		result_json['jaccard_result'] = res
		temp_value = 'group9'

		print("qwddqw")
		print(result_json)
		return JsonResponse(result_json, json_dumps_params={'ensure_ascii': True})


class PhotoView(APIView):
	parser_classes = (MultiPartParser, FormParser)
	model = None
	background_model = None
	global result_json

	result_json = {}


	def __init__(self):
		global model, background_model
		model = singleton_retinanet.SingletonRetinaNet.instance()
		# model = paintbgfall.PaintBgFall.instance()

	def get(self, request, *args, **kwargs):
		global result_json
		print("qweqwe")
		if request.method == 'GET':
			data ={}

			json_temp = {
				"datas_json": [
					{
						"name": "Top_Cardigan_Regular",
						"datas_json": "0.55"
					},
					{
						"name": "Top_Sweater_Regular",
						"datas_json": "0.25"
					},
					{
						"name": "Top_Blouse_Regular",
						"datas_json": "0.23"
					},
					{
						"name": "Pants_Skinny",
						"datas_json": "0.20"
					},
					{
						"name": "Top_Sweatshirts_Regular",
						"datas_json": "0.19"
					},
					{
						"name": "U_neck",
						"datas_json": "0.17"
					},
					{
						"name": "quilted",
						"datas_json": "0.17"
					},
					{
						"name": "Jacket_Blazer",
						"datas_json": "0.16"
					},
					{
						"name": "crochet",
						"datas_json": "0.15"
					},
					{
						"name": "Dot",
						"datas_json": "0.14"
					}
				],
				"prediction_df_NMF": "group7"
			}

			def jaccard_similarity(list1, list2):
				s1 = set(list1)
				s2 = set(list2)
				return len(s1.intersection(s2)) / len(s1.union(s2))

			with open('representative_attributes.json') as make_file:
				json_data = json.load(make_file)
			# attribute_names = ['collar','Top_Sweater_Boxy','Pants_Straight','crochet','Argyle','Floral','gray']
			# result_json['filename']='FW2013_dries-van-noten_47.jpg'
			# result_json['attribute_names']=attribute_names

			# TODO : 여기 지울 것
			# attribute_names = ['Top_Cardigan_Regular', 'Top_Sweater_Regular', 'Top_Blause_Regular', 'Pants_Skinny',
			# 				   'Top_Sweatshirts_Regular', 'U_neck', 'quilted','Jacket_Blazer','crochet','Dot','gray']
			# result_json['attribute_names'] = attribute_names
			# result_json['filename'] = 'FW2010_etro_11.jpg'
			# result_json['prediction_df_NMF'] = 'group7'

			print(result_json)
			# TODO : 여기 주석 해제
			attribute_names = result_json['attribute_names']

			jaccard_result ={}
			for group in json_data:
				temp=jaccard_similarity(attribute_names, json_data[group])
				jaccard_result[group] = temp
			# jaccard_result.sort(reverse=True)
			res = sorted(jaccard_result.items(), key=(lambda x: x[1]), reverse=True)

			# result_json=json_temp
			result_json['jaccard_result']=res

			print("qwddqw")
			print(result_json)
			return JsonResponse(result_json, json_dumps_params={'ensure_ascii': True})


			# print(result_json)
			# return JsonResponse(result_json, json_dumps_params={'ensure_ascii': True})

	def post(self, request, *args, **kwargs):
		global model, background_model
		start = time.time()
		print("time 1 :", time.time() - start)

		# Color extraction model load
		color_extraction_model = color_extraction.ColorExtraction()
		photos_serializer = PhotoSerializer(data=request.data)
		# print(request.FILES['file'].name) <-이렇게하면 파일이름 불러올 수 있음
		if photos_serializer.is_valid():
			photos_serializer.save()
			# model.paint_bg3(request.FILES['file'].name)
			model = singleton_retinanet.SingletonRetinaNet.instance()

			print(request.FILES['file'].name)

			result_json["filename"] = request.FILES['file'].name
			current_filename = request.FILES['file'].name
			temp_file = current_filename.split(".")
			file = open("media/" + request.FILES['file'].name, 'r')
			# print(file)
			# print("file : " + file.__str__())
			# print("file : " + file.name) <- media/서명.png
			# print("file : " + request.FILES['file'].name)  <<- 서명.png

			# print("file 경로 : "+os.path.dirname(file))

			# dataFrame으로 얻음
			print("@@@@@@@@@qweqwe")
			print(temp_file)
			print(current_filename)
			df_temp , box_coordinates = model.run_detection(temp_file[0]+"_bgfall."+temp_file[1])
			df = pd.DataFrame(df_temp)

			class_map_arr = pd.read_csv("./mydataset_classmapping.csv")["Class"]
			prediction_array = df["prediction"][0]
			confidence_array = df["confidence"][0]
			# box_coordinates = df["box_coordinates"][0]

			prediction_array = prediction_array[:12]
			confidence_array = confidence_array[:12]
			confidence_array = ['{:.2f}'.format(x) for x in confidence_array]
			# print(prediction_array)
			# print(confidence_array)

			x_name = []
			for pred in prediction_array:
				x_name.append(class_map_arr[pred])

			# n_groups = len(x_name)
			# index = np.arange(n_groups)

			data = []
			if len(x_name) == len(confidence_array):
				for j in range(0, len(x_name)):
					str_split = x_name[j].split('_')
					str = ""
					for k in range(0, len(str_split)):
						if len(str_split) == 1:
							str = str_split[0]
						if k == 0:
							continue
						if k == 1:
							str = str_split[1]
						else:
							str = str + '_' + str_split[k]
					dict = {"name": str,
							"datas_json": confidence_array[j]}
					data.append(dict)




			# data = []
			# if len(x_name) == len(confidence_array):
			# 	for index in range(len(x_name)):
			#
			# 		dict = {"name": x_name[index],
			# 				"datas_json": confidence_array[index]}
			# 		data.append(dict)

			print("data --------------")
			print(data)
			df_pivot = model.columns_from_attribute_detector(df)

			df2 = pd.DataFrame(color_extraction_model.multiple_color_extraction(temp_file[0]+"_bgfall."+temp_file[1]))
			df_one_hot_sum = color_extraction_model.columns_from_color_detector(df2)
			x_name.append(df2['colors'][0])


			attributes =[]
			for attr in data:
				attributes.append(attr['name'])

			attributes.append(df2['colors'][0])


			# result_json["box_coordinates"]= box_coordinates
			result_json["attribute_names"] = attributes
			result_json["datas_json"] = data
			print(result_json)
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

			result_json["prediction_df_NMF"] = group_fin
			# template = loader.get_template('dataframe.html')

			# return render(request, 'index.html', {'chart': dump})
			# multiple
			# print(dump)

			# if os.path.isfile("media/"+request.FILES['file'].name):
			# 	os.remove("media/"+request.FILES['file'].name)

			# TODO : 같은 값이 나오면 큰 값만 보여주기 !!
			# TODO : 옆에 번호를 빼는걸로
			return JsonResponse(result_json, json_dumps_params={'ensure_ascii': True})
		# return HttpResponseRedirect(reverse('dataframe'))
		# return render(request,"dataframe.html",{'dataframe' : escape(df.to_html())})
		# 	render(request, "dataframe.html",{
		# 	'dataframe' : df
		# })

		# return Response(photos_serializer.datas_json, status=status.HTTP_201_CREATED)
		else:
			print('error', photos_serializer.errors)
			return Response(photos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
