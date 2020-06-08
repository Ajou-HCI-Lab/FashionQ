from django.urls import path
from . import views
from .views import PhotoView

urlpatterns = [
	# path('', views.PhotoView.as_view(), name='index'),
	path('dataframe/', views.dataframe, name='dataframe'),
	path('map/', views.map, name='map'),
	path('posts/', PhotoView.as_view(), name='photos_list'),
	path('test/<groupNum>/', views.test, name='test'),
	# path('graphs/', PhotoView.graph(), name='graphs')
]
