var socket = io();
socket.on('message', function(data) {
    console.log(data);
});
//проект будет включать в себя лишь одно игровое состояние
var GameState = {
    //инициализация параметров игры
    init: function() {
        //параметры масштабирования экрана
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //центруем игровой экран по горизонтали и вертикали
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //работа с мышью
        // sprite.inputEnabled = true;
        // sprite.input.useHandCursor = true;
        // sprite.events.onInputOut.add(rollOut, this);
        // sprite.events.onInputOver.add(rollOver, this);
        // sprite.events.onInputDown.add(click, this);
    },

    //загрузка игровых ресурсов до запуска игры
    preload: function() {
        game.canvas.oncontextmenu = function(e) {e.preventDefault();};
        this.load.image('background', 'static/images/background.jpg');
        this.load.image('p0', 'static/images/p0.png');

        //загружаем спрайт-листы и задаём их размеры и количество кадров
        //this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3);
    },

    //исполняется один раз после того, как все ресурсы будут загружены
    create: function() {
        //sound
        //this.load.audio('horseSound', ['assets/audio/horse.ogg', 'assets/audio/horse.mp3']);

        //game.time.desiredFps = 60; //собственно fps
        //game.time.slowMotion = 2.0; //свойство позволяющее замедлять скорость анимации на сайте, по умолчанию 0, у нас 2, чтобы юнит не слишком резво метался по полю
        game.add.tileSprite(0, 0, 8000, 8000, 'background');
        game.world.setBounds(0, 0, 8000, 8000);
        game.physics.startSystem(Phaser.Physics.P2JS);
        //создаём спрайт по центру игрового мира
        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'p0');

        //устанавливаем опорную точку по центру спрайта
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.camera.follow(this.player);
        //     newAnimalMovement.to({ x: this.game.world.centerX }, 1000);
        //this.chicken.angle = 90;

        //this.chicken.scale.setTo(3,1); //двукратное увеличение по оси X с сохранением того же масштаба по оси Y

        //включаем ввод, то есть – спрайт сможет реагировать на действия пользователя
        //this.chicken.inputEnabled = true;

        //события касания вызываются только для непрозрачных частей курицы
        //this.chicken.input.pixelPerfectClick = true;

        //функция обратного вызова для события касания
        //this.chicken.events.onInputDown.add(this.animateAnimal, this);

        // //данные для обитателей фермы
        // var animalData = [
        //     {key: 'chicken', text: 'CHICKEN',},
        //     {key: 'horse', text: 'HORSE'},
        //     {key: 'pig', text: 'PIG'},
        //     {key: 'sheep', text: 'SHEEP'}
        // ];

// //создадим группу для хранения всех объектов – животных и птиц
//         this.animals = this.game.add.group();
//
// //заполним группу данными
//         var self = this;
//         var animal;
//         animalData.forEach(function(element){
//             // создаём животное или птицу, сохраняем свойства
//             animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0);
//
//             //Я сохраняю всё, что не относится к Phaser, в отдельном объекте
//             animal.customParams = {text: element.text, sound: 'to be added..'};
//
//             //установим опорную точку по центру спрайта
//             animal.anchor.setTo(0.5);
//

        //создадим анимацию
       //animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);


//             //включим ввод, объекты будут реагировать на касания и щелчки мышью
//             animal.inputEnabled = true;
//             animal.input.pixelPerfectClick = true;
//             animal.events.onInputDown.add(self.animateAnimal, this);
//         });
//
// //поместим первое существо по центру экрана
//         this.currentAnimal = this.animals.next();
//         this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
    },

    //эта функция исполняется несколько раз в секунду
    update: function() {
        this.player.angle += 4;
        //  only move when you click
        if (game.input.mousePointer.isDown)
        {
            //  400 is the speed it will move towards the mouse
            game.physics.arcade.moveToPointer(this.player, 200);

            //  if it's overlapping the mouse, don't move any more
            if (Phaser.Rectangle.contains(this.player.body, game.input.x, game.input.y))
            {
                this.player.body.velocity.setTo(0, 0);
            }
        }
        else
        {
            this.player.body.velocity.setTo(0, 0);
        }
    },

    //воспроизводим анимацию и проигрываем звук
    // animateAnimal: function(sprite, event) {
    //     console.log('animate animal and play sound');
    //sprite.play('animate');
    // },
//---------------------------------------------------------------------------------------------Интерполяционная анимация
    //переключение между обитателями фермы
    // switchAnimal: function(sprite, event) {
    //
    //     //если анимация происходит, не делаем ничего
    //     if(this.isMoving) {
    //         return false;
    //     }
    //
    //     this.isMoving = true;
    //
    //     var newAnimal, endX;
    //     //определяем, в зависимости от нажатой кнопки, кто должен появиться
    //     if(sprite.customParams.direction > 0) {
    //         newAnimal = this.animals.next();
    //         newAnimal.x = -newAnimal.width/2;
    //         endX = 640 + this.currentAnimal.width/2;
    //     }
    //     else {
    //         newAnimal = this.animals.previous();
    //         newAnimal.x = 640 + newAnimal.width/2;
    //         endX = -this.currentAnimal.width/2;
    //     }
    //
    //     //настраиваем и запускаем анимацию, перемещение по оси x
    //     var newAnimalMovement = game.add.tween(newAnimal);
    //     newAnimalMovement.to({ x: this.game.world.centerX }, 1000);
    //     newAnimalMovement.onComplete.add(function()
    //     {
    //         this.isMoving = false;
    //     }, this);
    //     newAnimalMovement.start();
    //
    //     var currentAnimalMovement = game.add.tween(this.currentAnimal);
    //     currentAnimalMovement.to({ x: endX }, 1000);
    //     currentAnimalMovement.start();
    //
    //     this.currentAnimal = newAnimal;
    // },
    // ---------------------------------------------------------------------------------------------rrame анимация
};

//инициализация Phaser
var game = new Phaser.Game("100", "100", Phaser.AUTO);

//добавляем состояние к объектам игры
game.state.add('GameState', GameState);

//запускаем состояние
game.state.start('GameState');