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
