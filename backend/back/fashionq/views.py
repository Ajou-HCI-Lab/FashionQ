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
from django.utils.html import escape
import pandas as pd
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))))
from load_model import singleton_retinanet
from load_model import color_extraction

# Create your views here.

def dataframe(request):
	return render(request, "dataframe.html")

class PhotoView(APIView):
	parser_classes = (MultiPartParser, FormParser)

	def get(self, request, *args, **kwargs):
		photos = Photo.objects.all()
		serializer = PhotoSerializer(photos, many=True)
		return Response(serializer.data.file)

	def post(self, request, *args, **kwargs):
		model = singleton_retinanet.SingletonRetinaNet.instance()
		color_extraction_model = color_extraction.ColorExtraction()
		photos_serializer = PhotoSerializer(data=request.data)
		# print(request.FILES['file'].name) <-이렇게하면 파일이름 불러올 수 있음
		if photos_serializer.is_valid():
			photos_serializer.save()
			file = open("media/"+request.FILES['file'].name,'r')

			# dataFrame으로 얻음
			df = pd.DataFrame(model.run_detection())
			df2 = pd.DataFrame(color_extraction_model.multiple_color_extraction())


			print(df)
			print(df2)
			template = loader.get_template('dataframe.html')
			return HttpResponse(df.to_html())
			# return HttpResponseRedirect(reverse('dataframe'))
			# return render(request,"dataframe.html",{'dataframe' : escape(df.to_html())})
			# 	render(request, "dataframe.html",{
			# 	'dataframe' : df
			# })

			# return Response(photos_serializer.data, status=status.HTTP_201_CREATED)
		else:
			print('error', photos_serializer.errors)
			return Response(photos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
