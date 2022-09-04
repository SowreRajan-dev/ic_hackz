import random


def keyGen():
    key = ""
    for i in range(5):
        key += random.choice("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
        key += str(random.randint(0, 9))

    keys = open("keys.db", "ab+")
    keys.write(bytes(key+"\n", encoding="UTF-8"))

    return key
