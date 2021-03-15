<template>
	<div class='tabbar'>
		<Item txt='首页' mark='home/home' :sel='selected' @change='getVal'>
			<img src='../assets/images/master1.png' slot='activeImg'/>
			<img src='../assets/images/master0.png' slot='normalImg'/>
		</Item>		
		<Item txt='跟随交易' mark='home/master' :sel='selected' @change='getVal'>
			<img src='../assets/images/operate1.png' slot='activeImg'/>
			<img src='../assets/images/operate0.png' slot='normalImg'/>
		</Item>
		<Item txt='我的交易' mark='home/trade' :sel='selected' @change='getVal'>
			<img src='../assets/images/detail1.png' slot='activeImg'/>
			<img src='../assets/images/detail0.png' slot='normalImg'/>
		</Item>
		<Item txt='我' mark='home/mine' :sel='selected' @change='getVal'>
			<img src='../assets/images/mine1.png' slot='activeImg'/>
			<img src='../assets/images/mine0.png' slot='normalImg'/>
		</Item>
	</div>
</template>

<script>
import Item from './item'

export default {
	props: ['active'],
	components: {
		Item
	},
	data: function(){
		return {
			selected: 'home/home'
		}
	},
	watch: {
		'active'(newVal,oldVal) {
			// console.log(newVal,oldVal);
			this.selected = newVal;
		}
	},
	methods: {
		getVal: function(val){
			this.selected = val;
		}
	}
}

</script>

<style>
	.tabbar{width: 100%; height: 2.8rem; border-top: 1px solid #ccc; position: fixed; left: 0; bottom: 0;background-color: white;z-index: 101;}
</style>
