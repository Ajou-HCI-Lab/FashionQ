from .serializers import PhotoSerializer
from .models import Photo
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status


# Create your views here.


class PhotoView(APIView):
	parser_classes = (MultiPartParser, FormParser)

	def get(self, request, *args, **kwargs):
		photos = Photo.objects.all()
		serializer = PhotoSerializer(photos, many=True)
		return Response(serializer.data)

	def post(self, request, *args, **kwargs):
		photos_serializer = PhotoSerializer(data=request.data)
		if photos_serializer.is_valid():
			photos_serializer.save()
			return Response(photos_serializer.data, status=status.HTTP_201_CREATED)
		else:
			print('error', photos_serializer.errors)
			return Response(photos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
