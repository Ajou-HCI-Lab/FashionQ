import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))))
# print(os.path.dirname(__file__))
# print(os.path.dirname(os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))))

# from FashionQ.load_model import singleton_retinanet
# from backend.back.load_model import singleton_retinanet
from load_model import singleton_retinanet
# singleton_retinanet.singleton_retinanet.instance()