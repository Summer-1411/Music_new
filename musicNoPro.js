const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('.playlist');
var heading = $('header h2');
var cdImg = $('.cd-thumb'); 
var cd = $('.cd');
var audio = $('#audio');
var playBtn = $('.btn-toggle-play');
var player = $('.player') //Để thêm class playing hiển thị nút pause
var progress = $('#progress');//Thanh để tua âm thanh
var next = $('.btn-next');
var back = $('.btn-prev');
var randomBtn = $('.btn-random');
var repeatBtn = $('.btn-repeat');
var sound = $('.sound');



//console.log(playlist)
//console.log(repeatBtn)
const app = {
    currentIndex : 0,
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    songs: [
        {
            name: 'Trou Is A Friend',
            singer: 'Remix',
            path: './asess/linkMusic/music0.mp3',
            image: './asess/linkImage/image0.jpg',
        },
        {
            name: 'Thu Cuối',
            singer: 'Mr.T - Hằng Bi',
            path: './asess/linkMusic/music1.mp3',
            image: './asess/linkImage/image1.jpg',
        },
        {
            name: 'Send It',
            singer: 'Austin Mahone',
            path: './asess/linkMusic/music2.mp3',
            image: './asess/linkImage/image2.jpg',
        },
        {
            name: 'Fahe Hell Speaker Remix',
            singer: 'Alan Walker',
            path: './asess/linkMusic/music3.mp3',
            image: './asess/linkImage/image3.jpg',
        },
        {
            name: 'Anh Mệt Rồi Lofi',
            singer: 'Anh Quân Idol',
            path: './asess/linkMusic/music4.mp3',
            image: './asess/linkImage/image4.jpg',
        },
        {
            name: 'The Nights',
            singer: 'Aciivi',
            path: './asess/linkMusic/music5.mp3',
            image: './asess/linkImage/image5.jpg',
        },
        {
            name: 'Castle In The Sky',
            singer: 'Kimi Wo Nosete',
            path: './asess/linkMusic/music6.mp3',
            image: './asess/linkImage/image6.jpg',
        },
        {
            name: 'Chỉ Là Muốn Nói Lofi',
            singer: 'Khải x Freak D',
            path: './asess/linkMusic/music7.mp3',
            image: './asess/linkImage/image7.jpg',
        },
        {
            name: 'Đường Tôi Chở Em Về Lofi',
            singer: 'Freak D x BuiTruongLinh',
            path: './asess/linkMusic/music8.mp3',
            image: './asess/linkImage/image8.jpg',
        },
        {
            name: 'Giấc Mơ Trưa',
            singer: 'Nhạc Chill',
            path: './asess/linkMusic/music9.mp3',
            image: './asess/linkImage/image9.jpg',
        },
        {
            name: 'Hạ Còn Vương Nắng Remix',
            singer: 'DATKA x KIDO',
            path: './asess/linkMusic/music10.mp3',
            image: './asess/linkImage/image10.jpg',
        },
        {
            name: 'Ma Ya Hee',
            singer: 'Piano',
            path: './asess/linkMusic/music11.mp3',
            image: './asess/linkImage/image11.jpg',
        },
        {
            name: 'Summertime',
            singer: 'K391',
            path: './asess/linkMusic/music12.mp3',
            image: './asess/linkImage/image12.jpg',
        },
        {
            name: 'Mặt Trái Của Sự Thật',
            singer: 'HKT',
            path: './asess/linkMusic/music13.mp3',
            image: './asess/linkImage/image13.jpg',
        },
        {
            name: 'Ahola',
            singer: 'Cool',
            path: './asess/linkMusic/music14.mp3',
            image: './asess/linkImage/image14.jpg',
        },
        {
            name: 'Chiều Thu Hoạ Bóng Nàng Remix',
            singer: '',
            path: './asess/linkMusic/music15.mp3',
            image: './asess/linkImage/image15.jpg',
        },
        {
            name: 'Phố Cũ Còn Anh Lofi',
            singer: 'Freak D x Quinn ft Chilly',
            path: './asess/linkMusic/music16.mp3',
            image: './asess/linkImage/image16.jpg',
        },
        {
            name: 'Unstoppable',
            singer: 'Sia',
            path: './asess/linkMusic/music17.mp3',
            image: './asess/linkImage/image17.jpeg',
        },
        {
            name: 'Never Be Alone',
            singer: 'TheFatRat',
            path: './asess/linkMusic/music18.mp3',
            image: './asess/linkImage/image18.jpg',
        },
        {
            name: 'Yêu Đừng Sợ Đau Remix',
            singer: 'Ngôn Lan Hương',
            path: './asess/linkMusic/music19.mp3',
            image: './asess/linkImage/image19.jpg',
        },
        {
            name: 'Holo',
            singer: 'Ampyx',
            path: './asess/linkMusic/music20.mp3',
            image: './asess/linkImage/image20.jpg',
        },
    ],
    render: function () {
        var _this = this;
        const htmls = this.songs.map(function (song,index) {
            return `
            <div class="song ${index === _this.currentIndex ? 'active' : ''}" data-index = "${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
             </div>`;


             
        })
        playlist.innerHTML = htmls.join('');
    },
    hendleEvents : function(){
        const _this = this;
        //Xử lí Cd quay;
        var cdAnimate = cdImg.animate([
            {transform : 'rotate(360deg)'} 
        ],{
            duration :15000, //Quay 1 vòng trong 15 giây
            iterations : Infinity,//CHu kì vô hạn
        })
        cdAnimate.pause();

       
        var cdWidth = cd.offsetWidth; //Lấy ra kích thước của thẻ cd
        //console.log(cdWidth);
       
        //Xử lí phóng to, thu nhỏ cd
        document.onscroll = function(){
        //    console.log(window .scrollY) //khi scroll màn hình
              const scroll = window.scrollY || document.documentElement.scrollTop;
              var newCdWidth = cdWidth - scroll;
              if(newCdWidth > 0){

              }else{
                  newCdWidth = 0;
              }
              cd.style.width = newCdWidth + 'px';
              cd.style.opacity = newCdWidth/cdWidth;
        }


        //Xử lsi sự kiện khi audio được play
        audio.onplay = function(){
            _this.isPlaying = true;
            player.classList.add('playing');
            cdAnimate.play();
        }

        //Xử lsi sự kiện khi audio bị pause
        audio.onpause = function(){
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdAnimate.pause();
        }

        //Xử lí khi clikc btn Play(logic)
        playBtn.onclick = function(){
            if(_this.isPlaying == true){
                audio.pause();  
            }else{
                audio.play();
            }
            _this.render();
            
        }
        

        //Thuộc tính duration : tổng thời lượng bài hát
        //ontimeupdate : khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                var Percent = audio.currentTime /audio.duration * 100
                progress.value = Percent;
            }
           // console.log(Math.floor(audio.currentTime))
             //Thuộc tính currentTime của thẻ audio trả về số giây hiện tại
        }
        
        //Xử lí khi tua:
        /**
         * e.target.value : phần trăm thời lượng đã nghe (tương tự progress.value)
         * từ phần trăm suy ra số giây
         */ 
        progress.onchange = function(e){
            var time = e.target.value * audio.duration / 100
            audio.currentTime = time;
        }

        //KHi next song:
        next.onclick = function(){
            if(_this.isRandom){
                //Nếu random bật thì nhảy random bài hát
                _this.radomSong();

            }else{
                //Nếu random tắt thì nhảy bài hát tiếp theo
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }


        //Khi quay lại bài trước
        back.onclick = function(){
            if(_this.isRandom){
                _this.radomSong();
            }else{
                _this.backSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();

              
        }
        
        //Hàm bật tắt random
        randomBtn.onclick = function(){
            if(_this.isRandom){
                _this.isRandom = false;
                randomBtn.classList.remove('active');

            }else{
                _this.isRandom = true;
                randomBtn.classList.add('active');
            }
           
        }
        // audio.onclick = function(){
        //     _this 
        //     audio.play = function(){
        //         this
        //     }
        // }
        //Xử lí next song khi kết thúc bài hát;
        audio.onended = function(){
            //Cách 1:
            // if(_this.isRandom){
            //     _this.radomSong();
            //     player.classList.add('playing');
            //     cdAnimate.play();
            // }else{
            //     _this.nextSong();
            //     player.classList.add('playing');
            //     cdAnimate.play();
            // }
            // audio.play();

            //Cách 2:
            if(_this.isRepeat){//nếu có repeat thì phát lại bài
                audio.play();
            }else{
                next.click();//nếu không thì chuyển bài tiếp theo
            }
            
        }
        //xử lí bật tắt repeat
        repeatBtn.onclick = function(){
            if(_this.isRepeat){
                _this.isRepeat = false;
                repeatBtn.classList.remove('active');
            }else{
                _this.isRepeat = true;
                repeatBtn.classList.add('active');
            }
        }

        playlist.onclick = function(e){
            // console.log(e.target.closest('.song.active'));
            //closest :trả về true nếu trong e.targer có element mà class là .song và không chưa class active
            var SongElement = e.target.closest('.song:not(.active)');
            if(SongElement){
               _this.currentIndex = Number(SongElement.dataset.index);
               _this.loadCurrentSong();
               _this.render();
               audio.play();
               
            }
        }

        //Xử lí âm thanh
        sound.onchange = function(e){
            var soundValue = e.target.value/100;
            audio.volume = soundValue;
        }

       
       

    },

    //lấy ra bài hát
    getCurrentSong : function(){
        return this.songs[this.currentIndex];
    },



    //tải bài hát hiện tại vào ứng dụng (cho cái đĩa quay quay hiện ảnh bài hát các thứ)
    loadCurrentSong : function(){
    
        heading.textContent = this.getCurrentSong().name; //Thay thế tên bài hát
        cdImg.style.backgroundImage = `url('${this.getCurrentSong().image}')`;//ảnh bài hát
        audio.src = this.getCurrentSong().path; //link bài hát


        //console.log(heading,cdImg,audio);

    },

    //Next bài hát
    nextSong : function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    backSong : function(){
        this.currentIndex--;
        if(this.currentIndex <  0){
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    radomSong : function(){
        var newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        }while(newIndex == this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
          $(".song.active").scrollIntoView({
            behavior: "smooth",
            block: "nearest"
          });
        }, 100);
    },
  
    start: function () {
        //console.log(this);
       
        //lắng nghe xử lí các sự kiện
        this.render();
        this.hendleEvents();

       
        this.getCurrentSong();
        this.loadCurrentSong();
    

        
        
        
        

    }
}




//Để play bài hát. gọi đến phương thức start()
app.start();
