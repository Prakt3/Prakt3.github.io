var socket = io();
socket.on('message', function(data) {
    console.log(data);
});
//������ ����� �������� � ���� ���� ���� ������� ���������
var GameState = {
    //������������� ���������� ����
    init: function() {
        //��������� ��������������� ������
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //�������� ������� ����� �� ����������� � ���������
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //������ � �����
        // sprite.inputEnabled = true;
        // sprite.input.useHandCursor = true;
        // sprite.events.onInputOut.add(rollOut, this);
        // sprite.events.onInputOver.add(rollOver, this);
        // sprite.events.onInputDown.add(click, this);
    },

    //�������� ������� �������� �� ������� ����
    preload: function() {
        game.canvas.oncontextmenu = function(e) {e.preventDefault();};
        this.load.image('background', 'static/images/background.jpg');
        this.load.image('p0', 'static/images/p0.png');

        //��������� ������-����� � ����� �� ������� � ���������� ������
        //this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3);
    },

    //����������� ���� ��� ����� ����, ��� ��� ������� ����� ���������
    create: function() {
        //sound
        //this.load.audio('horseSound', ['assets/audio/horse.ogg', 'assets/audio/horse.mp3']);

        //game.time.desiredFps = 60; //���������� fps
        //game.time.slowMotion = 2.0; //�������� ����������� ��������� �������� �������� �� �����, �� ��������� 0, � ��� 2, ����� ���� �� ������� ����� ������� �� ����
        game.add.tileSprite(0, 0, 8000, 8000, 'background');
        game.world.setBounds(0, 0, 8000, 8000);
        game.physics.startSystem(Phaser.Physics.P2JS);
        //������ ������ �� ������ �������� ����
        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'p0');

        //������������� ������� ����� �� ������ �������
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.camera.follow(this.player);
        //     newAnimalMovement.to({ x: this.game.world.centerX }, 1000);
        //this.chicken.angle = 90;

        //this.chicken.scale.setTo(3,1); //���������� ���������� �� ��� X � ����������� ���� �� �������� �� ��� Y

        //�������� ����, �� ���� � ������ ������ ����������� �� �������� ������������
        //this.chicken.inputEnabled = true;

        //������� ������� ���������� ������ ��� ������������ ������ ������
        //this.chicken.input.pixelPerfectClick = true;

        //������� ��������� ������ ��� ������� �������
        //this.chicken.events.onInputDown.add(this.animateAnimal, this);

        // //������ ��� ���������� �����
        // var animalData = [
        //     {key: 'chicken', text: 'CHICKEN',},
        //     {key: 'horse', text: 'HORSE'},
        //     {key: 'pig', text: 'PIG'},
        //     {key: 'sheep', text: 'SHEEP'}
        // ];

// //�������� ������ ��� �������� ���� �������� � �������� � ����
//         this.animals = this.game.add.group();
//
// //�������� ������ �������
//         var self = this;
//         var animal;
//         animalData.forEach(function(element){
//             // ������ �������� ��� �����, ��������� ��������
//             animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0);
//
//             //� �������� ��, ��� �� ��������� � Phaser, � ��������� �������
//             animal.customParams = {text: element.text, sound: 'to be added..'};
//
//             //��������� ������� ����� �� ������ �������
//             animal.anchor.setTo(0.5);
//

        //�������� ��������
       //animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);


//             //������� ����, ������� ����� ����������� �� ������� � ������ �����
//             animal.inputEnabled = true;
//             animal.input.pixelPerfectClick = true;
//             animal.events.onInputDown.add(self.animateAnimal, this);
//         });
//
// //�������� ������ �������� �� ������ ������
//         this.currentAnimal = this.animals.next();
//         this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
    },

    //��� ������� ����������� ��������� ��� � �������
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

    //������������� �������� � ����������� ����
    // animateAnimal: function(sprite, event) {
    //     console.log('animate animal and play sound');
    //sprite.play('animate');
    // },
//---------------------------------------------------------------------------------------------���������������� ��������
    //������������ ����� ����������� �����
    // switchAnimal: function(sprite, event) {
    //
    //     //���� �������� ����������, �� ������ ������
    //     if(this.isMoving) {
    //         return false;
    //     }
    //
    //     this.isMoving = true;
    //
    //     var newAnimal, endX;
    //     //����������, � ����������� �� ������� ������, ��� ������ ���������
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
    //     //����������� � ��������� ��������, ����������� �� ��� x
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
    // ---------------------------------------------------------------------------------------------rrame ��������
};

//������������� Phaser
var game = new Phaser.Game("100", "100", Phaser.AUTO);

//��������� ��������� � �������� ����
game.state.add('GameState', GameState);

//��������� ���������
game.state.start('GameState');