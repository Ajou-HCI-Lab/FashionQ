import pandas as pd
import json
from collections import OrderedDict
import itertools


prob = pd.read_csv("attribute_groups.csv")

filedata = OrderedDict()

# num = len(prob['Attribute'])
# for i in range(0,num):
# 	datas = []
# 	for j in prob['Attribute']
# 	filedata[prob['Group'][i]]=prob['Attribute'][i]
#
# with open('attributeGroupsJson.json', 'w', encoding="utf-8") as make_file:
# 	json.dump(filedata, make_file, ensure_ascii=False, indent="\t")


num=0

attributes = []
for i in prob['Attribute']:
	a = i.split('_', maxsplit=1)
	if len(a)>1:
		attributes.append(a[1])
	else:
		attributes.append(a[0])



groups = []
for i in prob['Group']:
	groups.append(i)
# groups_set = set(groups)
# groups = list(groups_set)


de = []
tx = []
fi = []
do = []
ga = []
ty = []


for attr in attributes:
	if groups[num] == 'Decorations':
		de.append(attr)
	elif groups[num] == 'Textile pattern':
		tx.append(attr)
	elif groups[num] == 'Finishing':
		fi.append(attr)
	elif groups[num] == 'Dominant colors':
		do.append(attr)
	elif groups[num] == 'Type of clothes':
		ty.append(attr)
	elif groups[num] == 'Garments parts':
		ga.append(attr)
	if num<=len(attributes):
		num = num+1
filedata['Type of clothes']=ty
filedata['Dominant colors']=do
filedata['Garments parts']=ga
filedata['Textile pattern']=tx
filedata['Decorations'] = de
filedata['Finishing']=fi


print(filedata)
# if groups[num] == 'Decorations':
# 	json['Decorations'] = attr
# elif groups[num] == 'Textile pattern':
# 	json['Textile pattern'] = attr
# elif groups[num] == 'Finishing':
# 	json['Finishing'] = attr
# elif groups[num] == 'Dominant colors':
# 	json['Dominant colors'] = attr
# elif groups[num] == 'Garments parts':
# 	json['Garments parts'] = attr

	# print(json)
	# num = num+1







# datas = []
# for group in groups:
# 	if num > len(attributes):
# 		break
# 	datas.append(attributes[num])
# 	if num < len(attributes)-1:
# 		if groups[num] is not groups[num+1]:
# 			filedata[group]=datas
# 			datas=[]
# 			num=num+1
# 			continue
# 	num = num+1
#
# print(filedata)
#
#
#
with open('attributeGroupsJson.json', 'w', encoding="utf-8") as make_file:
	json.dump(filedata, make_file, ensure_ascii=False, indent="\t")
