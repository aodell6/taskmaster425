import random
import json

class JSPrint:
    @staticmethod
    def outputKnown(key, value) -> None:

        outputVal = str({str(key): str(value)}).replace('"','\x5c"').replace("'",'"')

        print(outputVal)

    @staticmethod
    def output(content) -> None:
        if(type(content) == dict):
            for key, value in content.items():
                if (type(value) == dict):
                    JSPrint.output(value)
                else:
                    JSPrint.outputKnown(key, value)
        else:
            JSPrint.outputKnown('UnknownValue'+str(random.randint(0,25000)), content)
