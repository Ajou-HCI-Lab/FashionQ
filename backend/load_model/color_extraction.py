import os
import sys
import pandas as pd


class ColorExtraction:

	def __init__(self):
		super().__init__()

	def multiple_color_extraction(self):
		path = "../images/"
		files = os.listdir(path)
		if ".DS_Store" in files:
			files.remove(".DS_Store")

		img_name = []
		colors = []

		for i, num in zip(files, range(0, len(files))):
			order = "./color-extractor color_names.npz " + path + i

			result = os.popen(order).read().rstrip()

			img_name.append(i)
			colors.append(result)
			print(result, num, " / ", len(files))

		df = pd.DataFrame({"img_name": img_name, "colors": colors})
		return df

	def columns_from_color_detector(self, dataframe):

		####################
		# input data 변경 필요
		df = pd.DataFrame(dataframe)
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

		return df_one_hot_sum
