var ajaxButtons = document.getElementsByClassName('ajaxrequest');

var qAnswered = 0;

var Score = 0;

document.addEventListener('DOMContentLoaded', function () {
    ajaxRequest();
    var answers = document.querySelectorAll('.ans-button');
    for (let i = 0; i < answers.length; i++){
        answers[i].addEventListener('click', function () {
        if (!checkIfClicked()) {
            qAnswered++;
            if (answers[i].getAttribute('name') == 'incorrect') {
            answers[i].style.backgroundColor = '#ea3e3e';
            $('#notify').show();
            document.getElementById('notify').innerHTML = "Incorrect!";
            clicked();
            }
            else if (answers[i].getAttribute('name') == 'correct') {
                answers[i].style.backgroundColor = 'green';
                var scoreTag = document.querySelector('#score-banner');
                var score = JSON.parse(scoreTag.innerHTML);
                $('#notify').show();
                document.getElementById('notify').innerHTML = "Correct!";
                score++;
                Score = score;
                scoreTag.innerHTML = score;
                clicked();
            
            }
            }
        }) 
    }
});

function checkIfClicked () {
    var buttons = document.querySelectorAll('.ans-button');
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
    var buttons = document.querySelectorAll('.ans-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].value = 'clicked';
    }
}

function unclicked () {
    var buttons =  document.querySelectorAll('.ans-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].value = 'unclicked';
    }
}

function ajaxRequest() {
    $.ajax({
    url: '/ajax-request',
    success: function(response) {
        $('#notify').hide();
        unclicked();
        var buttons = $('.ans-button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = 'transparent';
        }
        var answers = $(".ans-button");
        var dictionaryPr = response.dict_p;
        var listPr = response.list_p;
        var dictionaryCy = response.dict_c;
        var listCy = response.list_c;
        for (let i = 0; i < ajaxButtons.length; i++) {
            if (ajaxButtons[i].value == 1) {
                let question = 'Who is the president of ';
                $('.question').html(question + dictionaryPr.country + '?');
                let randomId = dictionaryPr.answer_id;
                for (let i = 0; i < answers.length; i++) {
                    if (answers[i].id == randomId){
                        $(answers[i]).html(dictionaryPr.president);
                        $(answers[i]).attr('name', 'correct');
                    }
                    else {
                        $(answers[i]).html(listPr[i]);
                        $(answers[i]).attr('name', 'incorrect');
                    }
                }
            }
            else if (ajaxButtons[i].value == 2){
                let question = "What is the capital of ";
                $('.question').html(question + dictionaryCy.country + '?');
                let randomId = dictionaryCy.answer_id;
                for (let i = 0; i < answers.length; i++) {
                    if (answers[i].id == randomId){
                        $(answers[i]).html(dictionaryCy.city);
                        $(answers[i]).attr('name', 'correct');
                    }
                    else {
                        $(answers[i]).html(listCy[i]);
                        $(answers[i]).attr('name', 'incorrect');
                    }
                }
            }
        }
    }
    })
}


function quitSummary (button) {
    var accuracy = 0;
    if (qAnswered == 0) {
        accuracy = 0;
    }
    else {
        accuracy = ((Score / qAnswered) * 100).toFixed(2);
    }
    var data = {
        answer: qAnswered,
        score: Score,
        accuracy: accuracy
    };
    localStorage.setItem("send", JSON.stringify(data));
    window.location.href = "quit.html";   
}


