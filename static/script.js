document.addEventListener('DOMContentLoaded', function () {
    var answers = document.querySelectorAll('.ans');
    for (let i = 0; i < answers.length; i++){
        answers[i].addEventListener('click', function () {
        if (!checkIfClicked()) {
            if (answers[i].getAttribute('name') == 'incorrect') {
            answers[i].style.backgroundColor = 'red';
            clicked();
            }
            else if (answers[i].getAttribute('name') == 'correct') {
                answers[i].style.backgroundColor = 'green';
                let scoreTag = document.getElementById('score');
                let score = JSON.parse(scoreTag.innerHTML);
                score++;
                scoreTag.innerHTML = score;
                console.log(score);
                clicked();
            }
            }
        })
    }

    var nextButton = document.getElementById('next');
    nextButton.hidden = true;
    
});

function checkIfClicked () {
    var buttons = document.querySelectorAll('.ans');
    var counter = 0;
    for (let i = 0; i < buttons.length; i++) {
        if ( buttons[i].value === 'unclicked') {
            counter++;
        }
    }
    if ( counter == 4) {
        return false;
    }
    else {
        return true;
    }
}

function clicked () {
    var buttons = document.querySelectorAll('.ans');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].value = 'clicked';
    }
}

function unclicked () {
    var buttons =  document.querySelectorAll('.ans');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].value = 'unclicked';
    }
}

function ajaxPresident() {
    $.ajax({
    url: '/ajax-president',
    success: function(response) {
        var nextButton = document.getElementById('next')
        nextButton.hidden = false;
        unclicked();
        var buttons = $('.ans');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = '#ff6666';
        }
        var dictionary = response.dictionary;
        var list = response.list;
        let question = 'Who is the president of ';
        $('.question-header').html(question + dictionary.country);
        let randomId = dictionary.answer_id;
        var answers = $('.ans');
        for (let i = 0; i < answers.length; i++){
            if (answers[i].id == randomId){
                $(answers[i]).html(dictionary.president);
                $(answers[i]).attr('name', 'correct');
            }
            else {
                $(answers[i]).html(list[i]);
                $(answers[i]).attr('name', 'incorrect');
            }
        }
        
    }
    })
}

