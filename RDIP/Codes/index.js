
let s, n;       
eng_dict = {
    1: ["John ate an apple before afternoon",
        "before afternoon John ate an apple",
        "John before afternoon ate an apple"],
    2: ["some students like to study in the night",
        "at night some students like to study"],
    3: ["John and Mary went to church",
        "Mary and John went to church"],
    4: ["John went to church after eating",
        "after eating John went to church",
        "John after eating went to church"],
    5: ["did he go to market","he did go to market"],
    6: ["the woman who called my sister sells cosmetics",
        "the woman who sells cosmetics called my sister",
        "my sister who sells cosmetics called the woman",
        "my sister who called the woman sells cosmetics"],
    7: ["John goes to the library and studies",
        "John studies and goes to the library"],
    8: ["John ate an apple so did she",
        "she ate an apple so did John"],
    9: ["the teacher returned the book after she noticed the error",
        "the teacher noticed the error after she returned the book",
        "after the teacher returned the book she noticed the error",
        "after the teacher noticed the error she returned the book",
        "she returned the book after the teacher noticed the error",
        "she noticed the error after the teacher returned the book",
        "after she returned the book the teacher noticed the error",
        "after she noticed the error the teacher returned the book"],
    10: ["I told her that I bought a book yesterday",
        "I told her yesterday that I bought a book",
        "yesterday I told her that I bought a book",
        "I bought a book that I told her yesterday",
        "I bought a book yesterday that I told her",	
        "yesterday I bought a book that I told her"]
}

hindi_dict = {
    1:["राम और श्याम बाजार गयें"
        ,"राम और श्याम गयें बाजार"
        ,"बाजार गयें राम और श्याम"
        ,"गयें बाजार राम और श्याम"],
    2:["राम सोया और श्याम भी",
        "श्याम सोया और राम भी",
        "सोया श्याम और राम भी",
        "सोया राम और श्याम भी"],
    3:["मैंने उसे बताया कि राम सो रहा है",
        "मैंने उसे बताया कि सो रहा है राम", 
        "उसे मैंने बताया कि राम सो रहा है",
        "उसे मैंने बताया कि सो रहा है राम",
        "मैंने बताया उसे कि राम सो रहा है",
        "मैंने बताया उसे कि सो रहा है राम",
        "उसे बताया मैंने कि राम सो रहा है",
        "उसे बताया मैंने कि सो रहा है राम",
        "बताया मैंने उसे कि राम सो रहा है",
        "बताया मैंने उसे कि सो रहा है राम",
        "बताया उसे मैंने कि राम सो रहा है",
        "बताया उसे मैंने कि सो रहा है राम"],
    4:["राम खाकर सोया",
        "खाकर राम सोया",
        "राम सोया खाकर",
        "खाकर सोया राम",
        "सोया राम खाकर",
        "सोया खाकर राम"],
    5:["बिल्लियों को मारकर कुत्ता सो गया",	
        "मारकर बिल्लियों को कुत्ता सो गया",	 
        "बिल्लियों को मारकर सो गया कुत्ता",	
        "मारकर बिल्लियों को सो गया कुत्ता",	
        "कुत्ता सो गया बिल्लियों को मारकर",	
        "कुत्ता सो गया मारकर बिल्लियों को",	
        "सो गया कुत्ता बिल्लियों को मारकर",
        "सो गया कुत्ता मारकर बिल्लियों को"],
    6:["एक लाल किताब वहाँ है",
        "एक लाल किताब है वहाँ",
        "वहाँ है एक लाल किताब",
        "है वहाँ एक लाल किताब"],
    7:["एक बड़ी सी किताब वहाँ है",	
        "एक बड़ी सी किताब है वहाँ",
        "बड़ी सी एक किताब वहाँ है",
        "बड़ी सी एक किताब है वहाँ",
        "वहाँ है एक बड़ी सी किताब",
        "वहाँ है बड़ी सी एक किताब",
        "है वहाँ एक बड़ी सी किताब",
        "है वहाँ बड़ी सी एक किताब"]
    
}
$(document).ready(function(){
    $("select").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            console.log(optionValue);
            if(optionValue && optionValue!='selectlang'){
                show_elements();
                reform_onclick();
                $(".box").not("." + optionValue).hide();
                $("." + optionValue).show();
            } else{
                $(".box").hide();
            }
        });
    }).change();
    $('#show-correct').click(function(){
        $(this).toggle();
        $('#hide-correct').toggle();
    });
    $('#hide-correct').click(function(){
        $(this).toggle();
        $('#show-correct').toggle();
    });
});

function get_sentence(){
    let e = document.getElementById('langs');
    let optionValue = e.options[e.selectedIndex].value;
    console.log(optionValue);
    let sentence = [];
    if(optionValue == 'eng'){
        n = Math.floor(Math.random() * 10)+1;
        sentence = eng_dict[n][0].split();
        console.log(sentence[0].split(" "));
    }
    else if(optionValue == 'hindi'){
        n = Math.floor(Math.random() * 7)+1;
        sentence = hindi_dict[n][0].split();
        console.log(sentence[0].split(" "));
    } 
    return sentence[0].split(" ");
}

function rearaange_sentence(sentence){
    var arr = [];
    let f_sent = [];
    let l = sentence.length;
    while(arr.length < l){
        var r = Math.floor(Math.random() * l);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    console.log(arr);
    let i = 0;
    while(i<arr.length){
        console.log(arr[i]);
        f_sent.push(sentence[arr[i]]);
        ++i;
    }
    return f_sent;
}

function show_elements(mode = 1){
    let f_sent;
    let container;
    if(mode == 1){
        let sentence = get_sentence();
        f_sent = rearaange_sentence(sentence);
        s = f_sent;
    }
    else{
        f_sent = s;
    }
    if(document.getElementById('langs').value == 'eng'){
        container = document.getElementById("engelements");
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
        for (let i=0;i<f_sent.length;i++){
            container.appendChild(document.createTextNode("        "));
            var input = document.createElement("input");
            input.type = "button";
            input.name = f_sent[i];
            input.class = 'words';
            input.value = f_sent[i];
            input.addEventListener('click',function(){
                onwordclick(this);
            }, false);
            container.appendChild(input);
            console.log(input);
        }
    }
    else if(document.getElementById('langs').value == 'hindi'){
        container = document.getElementById("hindielements");
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
        for (let i=0;i<f_sent.length;i++){
            container.appendChild(document.createTextNode("        "));
            var input = document.createElement("input");
            input.type = "button";
            input.name = f_sent[i];
            input.class = 'words';
            input.value = f_sent[i];
            input.addEventListener('click',function(){
                onwordclick(this);
            }, false);
            container.appendChild(input);
            console.log(input);
        }

    }
    s = f_sent;   
}
let x = 0;
function onwordclick(el){
    var element = el;
    let e = document.getElementById('langs');
    let optionValue = e.options[e.selectedIndex].value;
    if(optionValue == 'eng'){
            if(document.getElementById('sentencee').innerText == "")
                document.getElementById('reformbutton').style.display = 'block';

            document.getElementById('sentencee').innerHTML = document.getElementById('sentencee').innerText +" "+ element.value;
            console.log(document.getElementById('sentencee').innerHTML);
            element.remove();
            if(document.getElementById("engelements").childElementCount == 0){
            document.getElementById('checkbutton').style.display = 'block';
        }

    }
    else if(optionValue == 'hindi'){
        if(document.getElementById('sentenceh').innerText == ""){
        document.getElementById('reformbutton').style.display = 'block';}
        document.getElementById('sentenceh').innerHTML = document.getElementById('sentenceh').innerText +" "+ element.value;
        console.log(document.getElementById('sentenceh').innerHTML);
        element.remove();
        if(document.getElementById("hindielements").childElementCount == 0){
            document.getElementById('checkbutton').style.display = 'block';
        }

    }
}

function reform_onclick(){
    let e = document.getElementById('langs');
    let optionValue = e.options[e.selectedIndex].value;
    show_elements(2);
    if(optionValue == 'eng')
        document.getElementById('sentencee').innerHTML = "";
    else if(optionValue == 'hindi')
        document.getElementById('sentenceh').innerHTML = "";
    document.getElementById('reformbutton').style.display = 'none';
    document.getElementById('checkbutton').style.display = 'none';
    document.getElementById('res-text').innerHTML = '';
    document.getElementById('show-correct').style.display  = 'none';
    document.getElementById('hide-correct').style.display  = 'none';
    document.getElementById('correct-ans').style.display = 'none';
}

function correct_onclick(){
    let sentence;
    let e = document.getElementById('langs');
    let optionValue = e.options[e.selectedIndex].value;
    if(optionValue == 'eng'){
        sentence = document.getElementById('sentencee').innerText;
        if(eng_dict[n].indexOf(sentence)!=-1){
            document.getElementById('res-text').innerHTML = 'Right answer!!!';
            document.getElementById('res-text').style.color = 'green';
            return true;
        }
        else{
            document.getElementById('res-text').innerHTML = 'Wrong answer!!!';
            document.getElementById('res-text').style.color = 'red';
            document.getElementById('show-correct').style.display  = 'block';
            return false;
        }
    }
    else if(optionValue == 'hindi'){
        sentence = document.getElementById('sentenceh').innerText;
        if(hindi_dict[n].indexOf(sentence)!=-1){
            document.getElementById('res-text').innerHTML = 'Right answer!!!';
            document.getElementById('res-text').style.color = 'green';
            return true;
        }
        else{
            document.getElementById('res-text').innerHTML = 'Wrong answer!!!';
            document.getElementById('res-text').style.color = 'red';
            document.getElementById('show-correct').style.display  = 'block';
            return false;
        }
    }
}

function show_onclick(){
    let sentence;
    let div = document.getElementById('correct-ans');
    console.log(div);
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }
    let e = document.getElementById('langs');
    let optionValue = e.options[e.selectedIndex].value;
    div.style.display = 'block';
    //document.getElementById('hide-correct').style.display = 'block';
    if(optionValue == 'eng'){
        for(let i = 0; i<eng_dict[n].length; ++i){
            //div.appendChild(document.createTextNode("        "));
            var ans = document.createElement("p");
            ans.class = 'ans';
            ans.innerText = eng_dict[n][i];
            console.log(ans);
            div.appendChild(ans);
            console.log(div);
        }
    }
    else if(optionValue == 'hindi'){
        for(let i = 0; i<hindi_dict[n].length; ++i){
            //div.appendChild(document.createTextNode("        "));
            var ans = document.createElement("p");
            ans.class = 'ans';
            ans.innerText = hindi_dict[n][i];
            console.log(ans);
            div.appendChild(ans);
            console.log(div);
        }
    }

}
function hide_onclick(){
    let div = document.getElementById('correct-ans');
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }
    console.log(div);
    div.style.display = 'none';


}

