<template>
	<div class="Propaganda">
        <img src="../../assets/images/market/Propaganda01.png">
        <img src="../../assets/images/market/Propaganda02.png">
        <img src="../../assets/images/market/Propaganda03.png">
		<div @click="click" class="click"></div>
	</div>
</template>

<style>
	@import '../../assets/css/Propaganda.css';
</style>
<script type="text/ecmascript-6">
import { formatTime } from '@/lib/utils';
import http from '@/lib/http';
  export default {
    data(){
      return{
          
      }
    },
    components:{
      
	},
	created(){
		const that = this;

	},
	methods:{
        //https://mp.weixin.qq.com/s?__biz=MzU1MDkzMjE4MQ==&mid=2247483709&idx=1&sn=102e4d8c22dc320169cbad2cc9b63b6e&chksm=fb985a87ccefd39183acaf2a91856f981ea518bfa614f98170ce87855595099db5099febf096&mpshare=1&scene=1&srcid=1120RRn5EaH07CSyTYdrnWW6&sharer_sharetime=1574236051246&sharer_shareid=dd2f8d77bf054c21f3147cb54d0fa46c&key=5a5cc62d1ce770e9e18a6a871e5cccc243f797c3f42efbabe54d7ae3ea4e189485368a50ea83e39846e0f5de258a69c3c8ed009e4663f282c4827827b1ac6096fe5ef2ac8691f135398a238d05f68596&ascene=1&uin=MjM0NTQ5NjAw&devicetype=Windows+10&version=62070158&lang=zh_CN&pass_ticket=fJpClSqgSOFF53YHx23teD2L0rxqIYIqHjZUiDnbWYQ%3D
        click() {
            window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzU1MDkzMjE4MQ==&mid=2247483709&idx=1&sn=102e4d8c22dc320169cbad2cc9b63b6e&chksm=fb985a87ccefd39183acaf2a91856f981ea518bfa614f98170ce87855595099db5099febf096&mpshare=1&scene=1&srcid=1120RRn5EaH07CSyTYdrnWW6&sharer_sharetime=1574236051246&sharer_shareid=dd2f8d77bf054c21f3147cb54d0fa46c&key=5a5cc62d1ce770e9e18a6a871e5cccc243f797c3f42efbabe54d7ae3ea4e189485368a50ea83e39846e0f5de258a69c3c8ed009e4663f282c4827827b1ac6096fe5ef2ac8691f135398a238d05f68596&ascene=1&uin=MjM0NTQ5NjAw&devicetype=Windows+10&version=62070158&lang=zh_CN&pass_ticket=fJpClSqgSOFF53YHx23teD2L0rxqIYIqHjZUiDnbWYQ%3D';
        },
	}

  }
</script>