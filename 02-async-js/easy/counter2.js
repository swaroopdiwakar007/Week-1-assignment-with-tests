n = 0

function counter() {
    console.clear();
    console.log(n);
    n += 1;
    setTimeout(counter, 1000)
}

counter()
