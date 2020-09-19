$(document).ready(function(){
    $("#lang").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            console.log(optionValue);
            if(optionValue && optionValue!='selectlang'){
                on_drop1_select();
            }
        });
    }).change();
    $("#drop2").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            console.log(optionValue);
            if(optionValue && optionValue!='---Select A Sentence---'){
                on_drop2_select();
            }
        });
    }).change();
});

let answers = [];
let right = 0;

let flag = true;
var nouns = ['NN', 'NNP', 'NNPS', 'NNS'];
var pronouns = ['PRP$', 'PRP', 'WP'];
var verbs = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ'];
var adjectives = ['JJ', 'JJS', 'JJR'];
var adverbs = ['RB', 'RBR', 'RBS', 'WRB'];
var determiners = ['DT', 'PDT', 'WDT'];
var prepositions = ['IN'];
var conjunctions = ['CC'];
var interjections = ['UH'];
var corpus = [
    [
        '---Select A Sentence---',
        'The child liked the chocolate.',
        'She was stopped by the bravest knight.',
        'Mary baked a cake for his birthday',
        'She decorated the cake carefully',
        'Mary wore a dress with polka dots.',
    ],
    [
        '---Select A Sentence---',
        'राम ने सीता के लिए फल तोड़ा।',
        'छोटे बच्चे पाठशाला जल्दी आयेंगे।',
        'मेहनत का फल मीठा होता है।',
        'वाह! वह खूबसूरत है।',
        'पेड़ से पत्ते गिर गए।',
    ],
  ];
  var lang;

  var types = ['Noun', 'Pronouns', 'Verbs', 'Adjectives', 'Adverbs', 'Determiners', 'Prepositions', 'Conjunctions', 'Interjections'];
  

  function on_drop1_select(){
    let e = document.getElementById('lang');
    let optionValue = e.options[e.selectedIndex].value;
    document.getElementById('drop2').style.display = 'block';
    document.getElementById('tablebody').style.display = 'none';
    if(optionValue == 'eng'){
        create_drop('drop2',corpus[0]);
        lang = 0;
    }
    else if(optionValue == 'hindi'){
        create_drop('drop2',corpus[1]);
        lang = 1;
    }
  }

  function create_drop(selectid, a){
    let select = document.getElementById(selectid);
    try{while(select.firstChild) {select.removeChild(select.lastChild);}}
    finally{
        console.log('eh');
    }
    for (const val of a) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
        console.log(option);
    }
    return select.innerHTML;
  }
function on_drop2_select(){
    let tablebody = document.getElementById('tablebody');
    tablebody.style.display = 'block';
    let e = document.getElementById('drop2');
    let sel = e.options[e.selectedIndex].value;
    //adding to the table

    var table = document.getElementById('maintable');
    try{while(table.firstChild) {table.removeChild(table.lastChild);}}
    finally{
        console.log('eh');
    }
    let td1, td2, td3, td4;
    let sela = corpus_return(sel);
    var tr = [];
    //header
    tr[0] = document.createElement('tr');
    let th1 = document.createElement('td');
    th1.appendChild(document.createTextNode('LEXICON'));
    th1.setAttribute('class','ths');
    let th2 = document.createElement('td');
    th2.appendChild(document.createTextNode('POS'));
    th2.setAttribute('class','ths');
    th3 = document.createElement('td');
    th3.appendChild(document.createTextNode(''));
    th3.setAttribute('class','ths');
    th4 = document.createElement('td');
    th4.appendChild(document.createTextNode(''));
    th4.setAttribute('class','ths');
    tr[0].append(th1);
    tr[0].append(th2);
    tr[0].append(th3);
    tr[0].append(th4);
    table.appendChild(tr[0]);
    
    console.log('creating table');
    for(let i = 0;i<sela.length;++i){
        tr[i] = document.createElement('tr');
        td1 = document.createElement('td');
        td2 = document.createElement('td');
        td3 = document.createElement('td');
        td4 = document.createElement('td');

        td1.appendChild(document.createTextNode(sela[i]));
        let drop3 = document.createElement("select");
        drop3.setAttribute('id', 'drop3'+i);
        console.log('id is '+drop3.getAttribute('id'));
        for(const val of types){
            var option = document.createElement("option");
            if(lang == 1 && val == 'Prepositions'){
                option.value = 'Postpositions';
                option.text = 'Postpositions'.charAt(0).toUpperCase() + 'Postpositions'.slice(1);
            }else{
                option.value = val;
                option.text = val.charAt(0).toUpperCase() + val.slice(1);
            }
            
            drop3.appendChild(option);
        }
        td2.appendChild(drop3);
        let tickcross = document.createElement("img");
        tickcross.setAttribute('class', 'tickcross');
        tickcross.setAttribute('width', '30px');
        tickcross.setAttribute('height', '30px');
        tickcross.setAttribute('display', 'none');
        tickcross.setAttribute('src','https://www.landfx.com/images/docs/kb/installation-errors/4019/blank%20welcome.PNG');
        tickcross.setAttribute('id', 'tc'+i);
        td3.appendChild(tickcross);

        td4.setAttribute('id', 'ans'+i);
        td4.style.display = 'none';

        tr[i].append(td1);
        tr[i].append(td2);
        tr[i].append(td3);
        tr[i].append(td4);

        table.appendChild(tr[i])

        document.getElementById('submit1').style.display = 'block';
        document.addEventListener('click', onclick_submit1);
    }
}

function onclick_submit1(){
    //var pos = require('pos');
    flag = true;
    let e = document.getElementById('drop2');
    let sel = e.options[e.selectedIndex].value;
    let sela = corpus_return(sel);
    var words = new Lexer().lex(sel); //You have to enter the sentences here
    var tagger = new POSTagger();
    var taggedWords = tagger.tag(words);
    compare_ans(taggedWords);
    console.log(right);
    if(right > 0){
        document.getElementById('getright').style.display = 'block';
    }
    
}
function compare_ans(words){
    answers = [];
    let i = 0;
    right = 0;
    console.log(words);
    for(const val of words){
        console.log(i);
        answers.push(val[1]);
        
        if(val[1]!='.'){
            let e = document.getElementById('drop3'+i);
            console.log(e);
            let sel = e.options[e.selectedIndex].value;
            if(sel == get_final(val[1])){
                console.log(val[1]);
                document.getElementById('tc'+i).setAttribute('src', 'https://cdn1.vectorstock.com/i/thumb-large/15/05/green-tick-checkmark-icon-vector-22691505.jpg');
            }
            else{
                document.getElementById('tc'+i).setAttribute('src', 'https://thumbs.dreamstime.com/b/wrong-cross-symbol-isolated-wrong-cross-symbol-isolated-white-background-d-render-115034283.jpg');
                ++right;
            }
        }
        ++i;
        
    }
}
function corpus_return(a, mode = 1){
    let x = [];
    let b = a.split(' ');
    var patt1 = /[A-Za-z]/g;
    for(let i = 0;i<b.length;++i){
        if(lang == 0){
            try{x.push(b[i].match(patt1).join('').toString().toLowerCase());}
            finally{continue;}
        }
        else{
            try{x.push(b[i]);}
            finally{continue;}
        }
    }
    console.log(x);
    return x;
}


function get_final(val){

    if(nouns.includes(val)){
        return 'Noun';
    }
    else if(prepositions.includes(val))
        {
            if(lang == 0)
                return 'Prepositions';
            else 
                return 'Propositions';
        }
    else if(pronouns.includes(val))
        {return 'Pronouns';}
    else if(verbs.includes(val))
        {return 'Verbs';}
    else if(adverbs.includes(val))
        {return 'Adverbs';}
    else if(adjectives.includes(val))
        {return 'Adjectives';}
    else if(determiners.includes(val))
        {return 'Determiners';}
    else if(conjunctions.includes(val))
        {return 'Conjunctions';}
    else if(interjections.includes(val))
        {return 'Interjections';}
    console.log('done');

}

function getanswers_onclick(){
    let i = 0;
    for(const val of answers){
        if (val == '.')
            break;
        console.log(val);
        document.getElementById('ans'+i).style.display = 'block';
        document.getElementById('ans'+i).innerText = get_final(val);
        ++i;
    }
    document.getElementById('hideright').style.display = 'block';
    document.getElementById('getright').style.display = 'none';


}

function hideanswers_onclick(){
    let i = 0;
    for(const val of answers){
        if(val!='.'){
            document.getElementById('ans'+i).style.display = 'none';
            ++i;
        }
        else
            break;
        
    } 
    console.log('exiting');
    document.getElementById('getright').style.display = 'block';
    document.getElementById('hideright').style.display = 'none';
}



