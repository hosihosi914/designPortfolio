document.addEventListener("DOMContentLoaded" , ()=> {

    //상단 메뉴 활성화 유지 (active)
    const nav_a = document.querySelectorAll('header nav a');
    nav_a.forEach( i=> {
      i.addEventListener('click' , ()=> {
        nav_a.forEach( j=> j.classList.remove('active') );
        i.classList.add('active');  
      });
    });    

    //#About의 <progress> 스킬바 동작 시작 위치 값
    const skillTop = document.querySelector("#About > div:last-of-type").offsetTop-300;

    //상단 메뉴의 링크id명과 영역 윗쪽 높이
    const sections = [
        {id:"About" , offset: -200 },        
        {id:"MarkUp" , offset: -200 },
        {id:"Gallery" , offset: -200},
        {id:"Contact" , offset: -200}
    ];

    let one = true; //스크롤내리면 1회만 실행
    const pos = sections.map( ({id,offset})=> ({
      id, top: document.getElementById(id).offsetTop + offset
    }));
    
    //스크롤 이벤트 발생부분
    window.addEventListener('scroll' , ()=> {
      const header = document.querySelector('header');
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      //초기 위치 [Home]
      let activeIndex = 0;

      //상단 메뉴에서 활성화 되어야할 index 번호 알아내기
      pos.forEach( (i,j) => {
          if( scrollTop >= i.top )   activeIndex= j+1;
      });
      //스크롤에 따른 메뉴 활성화
      nav_a.forEach( ( i,j) => i.classList.toggle("active" , j===activeIndex) );


      /**************************************/
      //About 가로바 스킬(progress) 애니메이션
      if( one && scrollTop  >= skillTop ) { 

          one= false; //1회 행을 위해.             
          const progress = document.querySelectorAll("#About progress");
          
          progress.forEach( (i,j) =>{
            const number = Number(i.textContent);
            let n = 0;
            setTimeout(()=>{
              
              const interval=  setInterval(()=>{
                  if(n <= number ) {
                      n++;
                      i.setAttribute('value' , n);
                  }
                  else clearInterval(interval);
                } , 5 );
            } , 300* j );
          });              
      }
    });
    
    //(상단메뉴: 햄버거 아이콘) 작은기계장치(휴대폰)에서 동작됨 (0~768픽셀 넓이)
    if( window.innerWidth <=768) {
        const nav = document.querySelector("header nav");        
        const menu = document.querySelector('header button');

        const toLeftNav = ()=> {
            nav.style.left = '-350px';
            document.body.style.overflow = 'auto';
            menu.textContent= 'menu';
        }

        menu.addEventListener('click' , ()=>{
            if(menu.textContent=="menu"){
                nav.style.left = 0;//왼쪽에서 내비 들어옴
                document.body.style.overflow = 'hidden';//스코롤방지
                menu.textContent= 'close';//[x]
            } else {
                toLeftNav();
            }
        });
        //내비게이션 메뉴항목 클릭
        nav_a.forEach( i=> {
            i.addEventListener('click' , ()=>  toLeftNav()  );
        });

    } //(햄버거 아이콘) 작은기계장치: 끝부분

    // 첫 번째 타자 효과: #Home strong
    const strongEl = document.querySelector('#Home strong');
    const text1 = 'Hello, World!';
    let i = 0;

    const typing_1 = () => {
      if (i < text1.length) {
        strongEl.append(text1[i++]);
      } else {
        clearInterval(timer_1);
        setTimeout(startTyping2, 500); // 첫 타자 후 지연 → 두 번째 타자 시작
      }
    };

    const timer_1 = setInterval(typing_1, 200);

    // 두 번째 타자 효과: #Home b
    const bEl = document.querySelector('#Home b');
    const htmlString = 'I am { <span>Lorem ipsum</span> }';

    // HTML 문자열을 DOM 노드로 파싱
    const $b = document.createElement('b');
    $b.innerHTML = htmlString;
    const nodes = Array.from($b.childNodes); // 텍스트, <span>, 텍스트 등

    function startTyping2() {
      bEl.classList.add('active'); // ⭐ 타자 시작 시 클래스 추가 (유지)

      let j = 0;

      const typeNode=()=> {
        if (j >= nodes.length) return; // 종료 후 active 유지

        const node = nodes[j++];

        if (node.nodeType === Node.TEXT_NODE) {
          let text = node.textContent;
          let k = 0;

          const timer_2 = setInterval( () => {
            if (k < text.length) {
              bEl.append(text[k++]);
            } else {
              clearInterval(timer_2);
              typeNode(); // 다음 노드 <span> 진행
            }
          }, 100);
        } else {
          bEl.append(node); // <span> 등 요소 노드는 그대로 삽입
          typeNode(); // 다음 노드로 진행
        }
      }
      typeNode();
    }  //타자치는 효과 끝!

  //What Can I Do?
  const slide = document.getElementById('slide');
  const slideBtn = document.querySelectorAll("#slide_bar button");
  slideBtn.forEach( (i , j) => {
    i.addEventListener('click' , ()=> {        
        if(j === 0) {
          toLeft();
          i.classList.add('active');
          slideBtn[1].classList.remove('active');
        }
        if(j === 1) {
          toRight();
          i.classList.add('active');
          slideBtn[0].classList.remove('active');
        }
    });
  });

  const toLeft = ()=> {
    slide.style.transition="left 1s";
    slide.style.left = "-1400px";    
  }
  const toRight = ()=> {
    slide.style.transition="left 1s";
    slide.style.left = 0;
  }

  //MarkUp
  const slide_1 = document.getElementById('slide-1');
  const slideBtn_1 = document.querySelectorAll('#slide_bar_1 button');

  slideBtn_1.forEach( (i,j)=> {
    i.addEventListener('click' , ()=>{
      slideBtn_1.forEach( ii => ii.classList.remove('active') );
      i.classList.add('active');
      const index = j;
	  //작은기계장치(휴대폰)(0~768픽셀 넓이)
	  if( window.innerWidth <=768) {
		  switch( index ){
			case 0 :   slide_1.style.left = 0;        break;
			case 1 :   slide_1.style.left = "-100vw"; break;
			case 2 :   slide_1.style.left = "-200vw"; break;
			default :  slide_1.style.left = "-300vw"; 
		  }
	  } else {
		  switch( index ){
			case 0 :   slide_1.style.left = 0;         break;
			case 1 :   slide_1.style.left = "-700px";  break;
			case 2 :   slide_1.style.left = "-1400px"; break;
			default :  slide_1.style.left = "-2100px"; 
		  }
	  }
    });
  });

  //Gallery갤러리(Gallery) 메뉴 클릭
  const G_nav_btn = document.querySelectorAll("#Gallery nav button");
  
  G_nav_btn.forEach( (i,j)=> {
      i.addEventListener("click" , ()=> {
        G_nav_btn.forEach( ii=> ii.classList.remove('active') );
        i.classList.add('active');

        //해당 슬라이드  보이기
        const G_box = document.querySelectorAll("#Gallery .G_box");
        G_box.forEach( ii=> {          
          ii.classList.remove('active');
        });
        G_box[j].classList.add('active');  
      });      
  });

  //갤러리(Gallery) 슬라이드
  const G_btn =  document.querySelectorAll("#Gallery .G_box .G_slide_bar button");
  
  G_btn.forEach( i => {
      i.addEventListener("click", e => {
          const parent = e.currentTarget.parentElement;//버튼의 부모
          const buttons = [...parent.children];//부모의 자식들
          const index = buttons.indexOf(e.currentTarget);//클릭한 버튼의 index
          const G_slide = parent.previousElementSibling;

          // 버튼 상태 초기화 & 활성화
          buttons.forEach(b => b.classList.remove("active"));
          i.classList.add("active");

          // 해당 슬라이드 이동
          const move = index * -1100;
          G_slide.style.left = `${move}px`;
    });
  });

  //Contact(문의하기) 영역
  const form = document.getElementById('form');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
          const response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: formData
          });

          const data = await response.json();

          if (response.ok) {
              alert("메세지가 정상적으로 전송되었습니다. 감사합니다!");
              form.reset();
          } else {
              alert("Error: " + data.message);
          }

      } catch (error) {
          alert("Something went wrong. Please try again.");
      } finally {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
      }
  });

});//js 끝!!
