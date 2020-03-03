var a= document.getElementsByClassName('btn');

var result= document.getElementsByClassName('result');
for(var i = 0; i<a.length; i++){
    a[i].setAttribute('id', "item-"+i);
    result[i].setAttribute('id','result-'+i)

};

document.getElementById("item-2").onclick = function () {
    result[2].style.display = "block";
    result[2].innerHTML = "<h1 class='text-center'>OOPS :(</h1>"
    setTimeout(function () {
        window.close()
    },3000)


};
document.getElementById("item-1").onclick = function () {
    result[1].style.display = "block";

};
var text =  "<h2 class='text-center'>Please fill the inputs</h2>" +
    "<div class='center'>"+
    "<input type='text' placeholder='name' class='day' required='required'>"+
    "<input type='text' placeholder='surname' class='day' required='required'>"+
    "<input type='email' placeholder='email' class='day' required='required'>"+
    "<button type='button' id='submit'>Submit</button>" +
     "</div>";

function NotYet() {
    document.getElementById("result-1").innerHTML = text;
    document.querySelector("#result-1 button").onclick = function () {
        document.getElementById("result-1").innerHTML = "<h1>We will try to remind you</h1>";
    }
}

function myFunction() {
  NotYet();
}
function hour() {
    document.getElementById("result-1").style.display = 'none';
    setTimeout(function () {
        document.getElementById("result-1").style.display = 'block'

    },60 * 60 *1000)
}
function week() {
    NotYet();
}
document.getElementById("item-0").onclick = function () {
    document.getElementById("cover").style.display = "block";
    openForm();

};
function openForm() {
    document.getElementById("myForm").style.display = "block";
    PopUpCenter();

}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("cover").style.display = "none";

}
// function PopUpCenter() {
//   var popUp =  document.getElementById('myForm');
//   var width = (window.innerWidth - popUp.offsetWidth)/2 + "px";
//   var height = (window.innerHeight - popUp.offsetHeight)/3 + "px";
//
//   popUp.style.left = width;
//   popUp.style.top = height;
//
// }
// PopUpCenter()
// quiz start

function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            // variable to store the list of possible answers
            const answers = [];

            // and for each available answer...
            for(letter in currentQuestion.answers){

                // ...add an HTML radio button
                answers.push(
                    `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                  <pre class="code">${currentQuestion.code}</pre>
          <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
            // color the answers red
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
    {
        question: "What is the result? ",
        code: "Number(\"1\") - 1 == 0;",
        answers: {
            a: "True",
            b: "False",
            c: "TypeError"
        },
        correctAnswer: "a"
    },
    {
        question: "What is alerted?",
        code: "function bar() {\n" +
            "    return foo;\n" +
            "    foo = 10;\n" +
            "    function foo() {}\n" +
            "    var foo = '11';\n" +
            "}\n" +
            "alert(typeof bar());",
        answers: {
            a: "Number",
            b: "Function",
            c: "String"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the order of values alerted?",
        code: "var x = 3;\n" +
            "\n" +
            "var foo = {\n" +
            "    x: 2,\n" +
            "    baz: {\n" +
            "        x: 1,\n" +
            "        bar: function() {\n" +
            "            return this.x;\n" +
            "        }\n" +
            "    }\n" +
            "}\n" +
            "\n" +
            "var go = foo.baz.bar;\n" +
            "\n" +
            "alert(go());\n" +
            "alert(foo.baz.bar());",
        answers: {
            a: "3,1",
            b: "1,2",
            c: "2,3",
            d: "2,1"
        },
        correctAnswer: "a"
    },
    {
        question: "Which of the following is the output of the below JavaScript code?",
        code:"function getFunc() {\n" +
            "    var a = 7;\n" +
            "    return function(b) {\n" +
            "        alert(a+b);\n" +
            "    }\n" +
            "}\n" +
            "var f = getFunc();\n" +
            "f(5);",
        answers: {
            a: "5",
            b: "7",
            c: "12"
        },
        correctAnswer: "c"
    },
    {
        question: "Which of the following is the output of the below JavaScript code?",
        code:"var x = [typeof x, typeof y][1];\n" +
            "  typeof typeof x;",
        answers: {
            a: "String",
            b: "Object",
            c: "Undefined",
            d: "Number"
        },
        correctAnswer: "d"
    },
    {
        question: "When executed, the below JavaScript code will pop up three alerts. Identify the corret answer?",
        code:"var a = 6;\n" +
            "function test() {\n" +
            "    var a = 7;\n" +
            "    function again() {\n" +
            "        var a = 8;\n" +
            "        alert(a);  // A\n" +
            "    }\n" +
            "    again();\n" +
            "    alert(a);  // B\n" +
            "}\n" +
            "test();\n" +
            "​alert(a);​  // C",
        answers: {
            a: "7,8,6",
            b: "8,7,6",
            c: "6,7,8",
            d: "8,6,7"
        },
        correctAnswer: "b"
    }
];

// Kick things off
buildQuiz();

// Event listeners
submitButton.addEventListener('click', showResults);




