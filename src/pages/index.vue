<template>
    <div>
        <router-view></router-view>
        <Tabbar :active="tabActive"></Tabbar>
    </div>
</template>
<script>
import Tabbar from './../components/tabbar'
export default {
    data() {
        return {
            tabActive: 'home/home'
        }
    },
    components:{
       Tabbar 
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
          vm.tabActive = 'home/' + to.name;
        });
    },
    beforeRouteUpdate (to, from, next) {
        // just use `this`
        this.tabActive = 'home/' + to.name;
        next()
    }
}
</script>