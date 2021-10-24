new Vue({
  el: "#app",
  data: {
    userHealth: 100,
    enemyHealth: 100,
    maxHealth: 100,
    minHealth: 0,
    enemyDamage: 0,
    gameIsOn: false,
    monsterUltra: 0,
    logArray: [],
    logIsOn: false,
    logMessage: {
      attack: "Player hits: ",
      monsterAttack: "Monster hits: ",
      specialAttack: "Player hits: ",
      heal: "Player heals: ",
      giveUp: "Player gives up...",
    },
    darkThemeOn: false,
  },
  methods: {
    damageGenerator: function () {
      this.monsterUltra = Math.ceil(Math.random() * 25);
      damageArray.push(this.damage);
    },
    startGame: function () {
      this.gameIsOn = true;
      this.logArray = [];
    },
    attack: function () {
      let point = Math.ceil(Math.random() * 10);
      this.enemyHealth -= point;
      this.monsterAttack();
      this.addToLog({ turn: "p", text: this.logMessage.attack + point });
    },
    specialAttack: function () {
      let point = Math.ceil(Math.random() * 20);
      this.enemyHealth -= point;
      this.monsterAttack();
      this.addToLog({ turn: "p", text: this.logMessage.specialAttack + point });
    },
    monsterAttack: function () {
      let point = Math.ceil(Math.random() * 10);
      this.userHealth -= point;

      this.addToLog({ turn: "m", text: this.logMessage.monsterAttack + point });
    },
    heal: function () {
      if (this.userHealth + 15 > this.maxHealth) {
        this.userHealth = this.maxHealth;
      } else {
        this.userHealth += 15;
      }
      this.monsterAttack();
      this.addToLog({ turn: "p", text: this.logMessage.heal + 15 });
    },
    giveUp: function () {
      this.userHealth = 0;
      if (confirm("You lost. Would you like to restart?")) {
        this.gameIsOn = false;
        this.userHealth = 100;
        this.enemyHealth = 100;
        this.gameMessageArray = [];
      }
    },
    reset: function () {
      this.userHealth = 100;
      this.enemyHealth = 100;
    },
    addToLog: function (log) {
      this.logArray.push(log);
    },
  },
  watch: {
    userHealth: function (value) {
      if (value <= 0) {
        this.userHealth = 0;
        if (confirm("You lost! Play again?")) {
          this.userHealth = 100;
          this.enemyHealth = 100;
          this.gameIsOn = !this.gameIsOn;
          this.gameMessageArray = [];
        }
      } else if (value > 100) {
        this.userHealth = 100;
      }
    },
    enemyHealth: function (value) {
      if (value <= 0) {
        this.enemyHealth = 0;
        if (confirm("You won! Play again?")) {
          this.userHealth = 100;
          this.enemyHealth = 100;
          this.gameIsOn = !this.gameIsOn;
          this.gameMessageArray = [];
        }
      }
    },
    logArray: function (value) {
      if (value.length > 0) {
        this.logIsOn = true;
      }
    },
  },

  computed: {
    monsterBar: function () {
      return {
        width: this.enemyHealth + "%",
      };
    },
    userBar: function () {
      return {
        width: this.userHealth + "%",
      };
    },
    logMessageStyle: function () {
      return {
        "player-turn": this.log.turn == "p",
        "monster-turn": this.log.turn == "m",
      };
    },
  },
});
