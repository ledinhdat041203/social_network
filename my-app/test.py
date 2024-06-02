def maxA(a):
    max = int(a[0])
    for i in a:
        x = int(i)
        if max<x:
            max = x
    return max

n = input("Nhap Mang: ")
arr = n.split(" ")
print(maxA(arr))