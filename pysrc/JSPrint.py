import random
import json

class JSPrint:
    @staticmethod
    def outputKnown(key, value) -> None:

        print(str(json.dumps({str(key): str(value)})).strip())

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


