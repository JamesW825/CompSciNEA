# write fizzbuzz up to 50

def fizzbuzz(n):
    if n % 3 == 0 and n % 5 == 0:
        print("fizzbuzz")
    elif n % 3 == 0:
        print("fizz")
    elif n % 5 == 0:
        print("buzz")
    else:
        print(n)

for i in range(1, 51):
    fizzbuzz(i)