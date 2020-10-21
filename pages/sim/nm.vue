<template>
  <b-container>
    <b-row class="mb-2">
      <b-col>
        <b-card sub-title="Player list">
          <b-card-text>
            <table class="table table-sm">
              <template v-for="(item, index) in players_list">
                <tr>
                  <th>{{ index }}</th>
                  <th>{{ gear_setup[item].name }}</th>
                  <td> {{ (100/totalDps()*gear_setup[item].dps[Number(dwh_spec)]).toFixed(2) }}%</td>
                  <td class="cursor-pointer" @click="removePlayer(index)">-</td>
                </tr>
              </template>
            </table>

          </b-card-text>
        </b-card>
      </b-col>

      <b-col>
        <b-card class="mb-2" sub-title="Options">
          <b-card-text>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="dwh_spec">
              <label class="custom-control-label" for="customCheck1">Dwh spec</label>
            </div>

            <hr>
              Kill count: {{ kc }}
            <hr>

            <b-button @click="rollDrop" squared variant="outline-success">Kill</b-button>
            <b-button @click="resetDrop" squared variant="outline-danger">Reset</b-button> |
            <b-button @click="autokill = !autokill" squared variant="outline-danger">{{ !autokill ? 'Start':'Stop' }}</b-button>
            <br>
            <br>
            <vue-slider v-model="autospeed" :min="1" :max="100" />

          </b-card-text>
        </b-card>
        <b-card sub-title="Select gear">
          <b-card-text>

            <table class="table table-sm">
              <template v-for="(item, index) in gear_setup">
                <tr>
                  <th>{{ index }}</th>
                  <th>{{ item.name }}</th>
                  <td>{{ item.dps[0].toFixed(3) }}</td>
                  <td>{{ item.dps[1].toFixed(3) }}</td>
                  <td class="cursor-pointer" @click="addPlayer(index)">+</td>
                </tr>
              </template>
            </table>

          </b-card-text>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col  class="mb-2">
        <b-card sub-title="Timeline">
          <b-card-text>

            <template v-for="(item) in drop_kc">
              <div class="item">
                <rsnum v-bind:number="item.kc"></rsnum>
                <img v-bind:src="'https://static.runelite.net/cache/item/icon/'+item.id+'.png'">
              </div>
            </template>

          </b-card-text>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
        <template v-for="(item, index) in players_list">
          <b-col cols="3" class="mb-2">

              <b-card v-bind:sub-title="'Player '+index">
                <b-card-text>

                  <template v-for="(allDrops, index2) in drops">
                    <template v-for="(drops, index3) in allDrops.drops">
                      <div class="item">
                        <rsnum v-bind:number="getUserDrops(index, drops.id)"></rsnum>
                        <img v-bind:class="{noitem: !getUserDrops(index, drops.id)}" v-bind:src="'https://static.runelite.net/cache/item/icon/'+drops.id+'.png'">
                      </div>
                    </template>
                  </template>

                </b-card-text>
              </b-card>

          </b-col>
        </template>

    </b-row>

  </b-container>
</template>

<style type="text/scss" lang="scss" scoped>
.cursor-pointer{
  cursor: pointer;
}
.noitem {
  opacity: 0.5;
}

.item {
  float: left;
  span {
    color: yellow;
    -webkit-text-stroke: 1px black;
    position: absolute;
  }
}

</style>

<script lang="ts">
import Vue from 'vue'
import Rsnum from "~/components/utils/rsnum.vue";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

interface User {
  userIndex: number;
  drops: Array<number>;
}
interface DropKc {
  id: number;
  kc: number;
}
export default Vue.extend({
  components: {
    Rsnum,
    VueSlider
  },
  data () {
    return {
      interval: <any> undefined,
      autokill: false,
      autospeed: 95,
      kc: 0,
      dwh_spec: <boolean> false,
      gear_setup: [
        {name: "Bludgeon + Max melee(Fire cape)", dps: [7.373, 7.910]},
        {name: "Bludgeon + Max melee(Mythical cape)", dps: [7.445, 7.966]},
        {name: "Bludgeon + Max melee(Infernal cape)", dps: [7.569, 8.106]},
        {name: "Scythe + Max melee(Infernal cape)", dps: [8.069, 9.188]},
        {name: "Scythe + Inq(Infernal cape)", dps: [9.350, 10.227]},
      ],
      players_list: <number[]> [0,0,0,1,1],
      players_drops: <User[]> [],
      drop_kc: <DropKc[]> [],
      drops: [
        {
          chance: 120,
          drops: [
            { name: "Inquisitor's mace", chance: 1, id: 24417 },
            { name: "Inquisitor's great helm", chance: 2, id: 24419 },
            { name: "Inquisitor's hauberk", chance: 2, id: 24420 },
            { name: "Inquisitor's plateskirt", chance: 2, id: 24421 },
            { name: "Nightmare staff", chance: 3, id: 24422 }
          ]
        },
        {
          chance: 600,
          drops: [
            { name: "Harmonised", chance: 1, id: 24511 },
            { name: "Volatile", chance: 1, id: 24514 },
            { name: "Eldritch", chance: 1, id: 24517 }
          ]
        },
      ]
    }
  },
  mounted() {
    this.createInterval();
  },
  destroyed() {
    clearTimeout(this.interval);
  },
  methods: {
    createInterval() {
      const self = this;
      this.interval = setTimeout(function () {
        self.createInterval();
        if(!self.autokill) return;
        self.rollDrop();
      },1000 - (1000/101*self.autospeed));
    },
    addPlayer (index: number) {
      this.players_list.push(index);
    },
    removePlayer (index: number) {
      this.players_list.splice(index, 1);
    },
    totalDps () {
      const self = <any>this;
      return this.players_list.reduce((acc, item) => {
        return acc + parseFloat(self.gear_setup[item].dps[Number(self.dwh_spec)])
      }, 0);
    },
    rollDrop () {
      if(this.players_list.length == 0) return;

      this.kc++;
      const self = this;
      this.drops.forEach(function(entry) {
        //Roll for item drops
        if (entry.chance == self.getRandomInt(1, entry.chance)) {

          //total item weight
          const allWeight = entry.drops.reduce((a, b) => {
            return a + b.chance
          },0)

          //roll for item
          let rolled = self.getRandomInt(1, allWeight);
          let acc = 0;
          let chances = entry.drops.map(el => (acc = el.chance + acc));
          const rolledItem = entry.drops[chances.filter(el => el <= rolled).length - 1];

          //roll player
          acc = 0;
          // chances = self.players_list.map(el => (acc = self.gear_setup[el].dps[0] + acc));
          chances = self.players_list.map(el => {
            return acc = self.gear_setup[el].dps[0] + acc
          });
          rolled = Math.random() * self.totalDps();
          const rolledPlayer: any = chances.filter(el => el <= rolled).length;

          let foundUser = self.players_drops.filter(user => user.userIndex == rolledPlayer);
          if(foundUser.length === 0) {
            self.players_drops.push({userIndex: rolledPlayer, drops: [rolledItem.id] })
          }else{
            foundUser[0].drops.push(rolledItem.id);
          }

          self.drop_kc.push({id:rolledItem.id, kc: self.kc});

        }
      });
    },
    resetDrop () {
      this.kc = 0;
      this.players_drops = [];
      this.drop_kc = [];
    },
    getRandomInt(min: number, max:number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getUserDrops (userId: number, itemId: number) {
      const foundUser = this.players_drops.filter(user => user.userIndex == userId);
      if (foundUser.length === 0) return 0;

      return foundUser[0].drops.filter(items => items == itemId).length;
    },
  }
})

</script>
