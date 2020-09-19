$(document).ready(function(){
    $("select").change(function(){
        $(this).find("option:selected").each(function(){
            init();
            var optionValue = $(this).attr("value");
            console.log(optionValue);
            if(optionValue && optionValue!='selectcorps'){
                $(".box").not("." + optionValue).hide();
                $("." + optionValue).show();
            } else{
                $(".box").hide();
            }
        });
    }).change();
});


let corpus1 = 'A mouse was having a very bad time. She could find no food at all. She looked here and there, but there was no food, and she grew very thin. At last the mouse found a basket, full of corn. There was a small hole in the basket, and she crept in. She could just get through the hole. Then she began to eat the corn. Being very hungry, she ate a great deal, and went on eating and eating. She had grown very fat before she felt that she had had enough. When the mouse tried to climb out of the basket, she could not. She was too fat to pass through the hole. " How shall I climb out?" said the mouse. "oh, how shall I climb out?" Just then a rat came along, and he heard the mouse. "Mouse," said the rat, "if you want to climb out of the basket, you must wait till you have grown as thin as you were when you went in."';
let corpus2 = 'A wolf carried off a lamb. The lamb said, " I know you are going to eat me, but before you eat me I would like to hear you play the flute. I have heard that you can play the flute better than anyone else, even the shepherd himself." The wolf was so pleased at this that he took out his flute and began to play. When he had done, the lamb insisted him to play once more and the wolf played again. The shepherd and the dogs heard the sound, and they came running up and fell on the wolf and the lamb was able to get back to the flock.';
let corpus3 = "A man had a little dog, and he was very fond of it. He would pat its head, and take it on his knee, and talk to it. Then he would give it little bits of food from his own plate. A donkey looked in at the window and saw the man and the dog. " + '"Why does he not make a pet of me?"'+' said the donkey. "'+"It is not fair. I work hard, and the dog only wags its tail, and barks, and jumps on its master's"+' knee. It is not fair."'+' Then the donkey said to himself, "If I do what the dog does, he may make a pet of me."'+" So the donkey ran into the room. It brayed as loudly as it could. It wagged its tail so hard that it knocked over a jar on the table. Then it tried to jump on to its master's "+'knee. The master thought the donkey was mad, and he shouted, "Help! Help!" Men came running in with sticks, and they beat the donkey till it ran out of the house, and they drove it back to the field. "I only did what the dog does," said the donkey," and yet they make a pet of the dog, and they beat me with sticks. It is not fair."';

function init(){
    let v1 = document.getElementById('para1');
    console.log(v1);
    v1.innerText = corpus1;
    let v2 = document.getElementById('para2');
    v2.innerText = corpus2;
    let v3 = document.getElementById('para3');
    v3.innerText = corpus3;

}

function corpus_return(a, mode = 1){
    let x = [];
    let b = a.split(' ');
    var patt1 = /[A-Za-z]/g;
    for(let i = 0;i<b.length;++i){
        if(mode==1){
            try{x.push(b[i].match(patt1).join('').toString().toLowerCase());}
            finally{continue;}
        }
        else{
            try{
                var stemmer = new Snowball('English');
                stemmer.setCurrent(b[i].match(patt1).join('').toString().toLowerCase());
                stemmer.stem();
                x.push(stemmer.getCurrent());
            }
            finally{continue;}
        }
         
    }
    console.log(x);
    return x;
}
function get_unique(value, index, self) { 
    return self.indexOf(value) === index;
}

function get_vals(corp, mode = 1){
    let crp;
    eval('crp = '+corp);
    let c1 = corpus_return(crp, mode);
    var unique = c1.filter( get_unique );
    return {'tokens': c1.length,'types': unique.length, 'words':unique};
}

function submit_onclick(){
    let e = document.getElementById('corps');
    let optionValue = e.options[e.selectedIndex].value.split(' ').join().toLowerCase();
    let d = get_vals(optionValue);
    let l = 0;
    console.log(d);
    try{
        if(document.getElementById('tokens'+optionValue[6]).value == d['tokens']){
            document.getElementById('tokens'+optionValue[6]).style.backgroundColor = 'green';
            l+=1;
        }
        else{
            document.getElementById('tokens'+optionValue[6]).style.backgroundColor = 'red';
        }
        if(document.getElementById('types'+optionValue[6]).value == d['types']){
            document.getElementById('types'+optionValue[6]).style.backgroundColor = 'green';
            l+=1;
        }
        else{
            document.getElementById('types'+optionValue[6]).style.backgroundColor = 'red';
        }
        if(l == 2){
            console.log('right'+optionValue[6]);
            document.getElementById('right'+optionValue[6]).style.display = 'block';
            document.getElementById('wrong'+optionValue[6]).style.display = 'none';
        }
        else{
            console.log('right'+optionValue[6]);
            document.getElementById('right'+optionValue[6]).style.display = 'none';
            document.getElementById('wrong'+optionValue[6]).style.display = 'block';
        }
    }
    finally{
        console.log('error');
    }
    
}

function continue_onclick(){
    let e = document.getElementById('corps');
    let optionValue = e.options[e.selectedIndex].value.split(' ').join().toLowerCase();
    let n = optionValue[6];
    document.getElementById('right'+n).style.display = 'none';
    console.log(n);
    document.getElementById('submit'+n).style.display = 'none';
    document.getElementById('root'+n).style.display = 'block'; 
}

function submit2_onclick(){

    let e = document.getElementById('corps');
    let optionValue = e.options[e.selectedIndex].value.split(' ').join().toLowerCase();
    let d = get_vals(optionValue, 2);
    /*console.log(d['words'].length);
    let c = [];
    for(let i = 0;i<d['words'].length;++i){
        var stemmer = new Snowball('English');
        stemmer.setCurrent(d['words'][i]);
        stemmer.stem();
        c.push(stemmer.getCurrent());
        console.log(d['words'][i]);
        console.log(c);
        console.log('hello');
    }
    console.log(c);
    console.log(c.length);
    var unique = c.filter( get_unique );
    console.log(unique);
    console.log(unique.length);*/
    console.log(d['tokens']);
    console.log(d['types']);
    console.log(d['words']);
    //functionality for comparing
    try{
        if(document.getElementById('rooti'+optionValue[6]).value == d['types']){
            document.getElementById('rooti'+optionValue[6]).style.backgroundColor = 'green';
            document.getElementById('final'+optionValue[6]).innerText = 'Right Answer';
            document.getElementById('final'+optionValue[6]).style.color = 'green';
        }
        else{
            document.getElementById('rooti'+optionValue[6]).style.backgroundColor = 'red';
            document.getElementById('final'+optionValue[6]).innerText = 'Wrong Answer';
            document.getElementById('final'+optionValue[6]).style.color = 'red';
        }
    }
    finally{
        console.log('error');
    }
    // end of functionality for comparing

}
