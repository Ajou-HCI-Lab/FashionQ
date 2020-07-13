import pandas as pd
import json
from collections import OrderedDict

filedata = OrderedDict()

with open('test.json') as make_file:
	json_data = json.load(make_file)

for i in json_data:
	splitarr = []
	for j in range(0, len(json_data[i])):
		str_split = json_data[i][j].split('_')
		str = ""
		for k in range(0, len(str_split)):
			if len(str_split)==1:
				str = str_split[0]
			if k == 0:
				continue
			if k == 1:
				str = str_split[1]
			else:
				str = str + '_' + str_split[k]
		splitarr.append(str)

	filedata[i] = splitarr

print(filedata)



with open('attributesByGroups.json', 'w', encoding="utf-8") as make_file:
	json.dump(filedata, make_file, ensure_ascii=False, indent="\t")
