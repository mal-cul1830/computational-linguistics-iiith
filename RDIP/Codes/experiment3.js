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
    /*
    $("#drop2").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            console.log(optionValue);
            if(optionValue && optionValue!='---Select A Sentence---'){
                $('#tablebody').style.display = 'block';
            }
        });
    }).change();*/
});


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
  
  var nouns = ['NN', 'NNP', 'NNPS', 'NNS'];
  var pronouns = ['PRP$', 'PRP', 'WP'];
  var verbs = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ'];
  var adjectives = ['JJ', 'JJS', 'JJR'];
  var adverbs = ['RB', 'RBR', 'RBS', 'WRB'];
  var determiners = ['DT', 'PDT', 'WDT'];
  var prepositions = ['IN'];
  var conjunctions = ['CC'];
  var interjections = ['UH'];

  function on_drop1_select(){
    let e = document.getElementById('lang');
    let optionValue = e.options[e.selectedIndex].value;
    document.getElementById('drop2').style.display = 'block';
    if(optionValue == 'eng'){
        create_drop('drop2',corpus[0]);
    }
    else if(optionValue == 'hindi'){
        create_drop('drop2',corpus[1]);
    }
  }

  function create_drop(selectid, a){
    let select = document.getElementById(selectid);
    while(select.firstChild) select.removeChild(select.lastChild);
    for (const val of a) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
        console.log(option);
    }
  }
/*
  function on_drop2_select(){

  }*/