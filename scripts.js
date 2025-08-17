minTimeDone = false;

function setValues(v = 1) {
    const greenBase = document.getElementById("green-base").value;
    const yellowBase = document.getElementById("yellow-base").value;
    const redBase = document.getElementById("red-base").value;

    timeGreen = greenBase * v;
    timeYellow = yellowBase;
    timeRed = redBase / v;

    document.getElementById("green-final").value = Math.round(timeGreen);
    document.getElementById("yellow-final").value = Math.round(timeYellow);
    document.getElementById("red-final").value = Math.round(timeRed);
}

setValues();

function setColor(group, color) {
    document.querySelectorAll(`.${group}-light div`).forEach(el => {
        el.classList.remove('active');
    });

    document.querySelector(`.${group}-light .${color}`).classList.add('active');
}

function resetCycle() {
    setColor('car', 'green');
    setColor('pedestrian', 'red');
    document.querySelector('#button').classList.remove('ready');

    setTimeout(() => {
        minTimeDone = true;
        document.querySelector('#button').classList.add('ready');
    }, timeGreen);
}

function startCrossing() {
    if (minTimeDone) {
        setColor('car', 'yellow');

        setTimeout(() => {
            setColor('car', 'red');
            setColor('pedestrian', 'green');

            setTimeout(() => {
                minTimeDone = false;
                resetCycle();
            }, timeRed);

        }, timeYellow);
    } else {
        setTimeout(() => {
            startCrossing();
        }, 1000);
    }
}

resetCycle();

document.getElementById('button').addEventListener('click', e => {
    e.preventDefault();
    startCrossing();
});

["green-base", "yellow-base", "red-base"].forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
        const v = document.getElementById("traffic").value;
        setValues(v);
        resetCycle();
    });
});

document.getElementById("traffic").addEventListener("input", e => {
    setValues(e.target.value);
    resetCycle();
});