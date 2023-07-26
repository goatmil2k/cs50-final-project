var ajaxButtons = document.getElementsByClassName('ajaxrequest'); //get all the button tags that will preform ajaxrequests

var qAnswered = 0; //to keep track of the questions answered by the user

var Score = 0; //to keep track of score

document.addEventListener('DOMContentLoaded', function () {
    ajaxRequest(); // an ajaxrequest is made once the DOM is loaded.
    
    var answers = document.querySelectorAll('.ans-button');
    for (let i = 0; i < answers.length; i++){
        answers[i].addEventListener('click', function () {
        if (!checkIfClicked()) { // this is to make user the function is only called once for each question.
            qAnswered++;
            if (answers[i].getAttribute('name') == 'incorrect') {
            answers[i].style.backgroundColor = '#ea3e3e';
            $('#notify').show();
            document.getElementById('notify').innerHTML = "Incorrect!";
            clicked(); // this function is explained below
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
    //function to check if one of the the answers button have been clicked once.
    //for this function to return false, all the values of the ans-button must be unclicked.                                    
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
    //when this function is called, the values of the ans-buttons change from unclicked to clicked.
    var buttons = document.querySelectorAll('.ans-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].value = 'clicked';
    }
}

function unclicked () {
    //when this function is called, the values of the ans-buttons changee from clicked to unclicked.
    var buttons =  document.querySelectorAll('.ans-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].value = 'unclicked';
    }
}

function ajaxRequest() {
    // this ajaxrequest is made to avoid reloading the page for every other question.
    // this makes keeping track of user scores easier
    // everytime this function is called a variety of fuctions are called inside this function to make it look like the page is refreshed.
    $.ajax({
    // the request is made to the following route and a dictionary is returned.
    url: '/ajax-request',
    success: function(response) {
        $('#notify').hide(); // to hide a <p> tag that tells the user if the answer is correct or incorrect
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
        // a value is assigned to the buttons that are meant to call this function.
        // 0 for the presidents and 1 for capital cities.
        // The return values of request changes accordingly
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
    // this function saves the summary of user's different scores in localStorage to send
    // them to a differnt template
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


