<template>
    <div>

      <div class="student-top">
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">
            &nbsp;
          </div></el-col>

          <el-col :span="8"><div class="grid-content bg-purple-light">
            <h1>选&nbsp;&nbsp;课&nbsp;&nbsp;界&nbsp;&nbsp;面</h1>
            <p>选课起止时间:{{beginTime}}--{{endTime}}</p>
          </div></el-col>

          <el-col :span="8"><div class="grid-content bg-purple" style="float: right">
            <p>账号：{{account}}</p>
            <p>修改密码</p>
            <p>{{nowTime}}</p>
          </div></el-col>
        </el-row>

      </div>

    </div>
</template>

<script>
    export default {
        data(){
          return{
            account: 3333,
            beginTime: "2019-04-22 12:00:00",
            endTime: "2019-4-25 12:00:00"
          };
        },
      methods: {
        // 获取当前时间函数
        timeFormate(timeStamp) {
          let year = new Date(timeStamp).getFullYear();
          let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
          let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
          //let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
          //let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
          // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
          // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
          this.nowTime = year + "年" + month + "月" + date +"日";
          // console.log(this.nowTime);
        },
        // 定时器函数
        nowTimes(){
          this.timeFormate(new Date());
          setInterval(this.nowTimes,60*1000*60);
        },
      },
      // 创建完成时
      created() {
        this.nowTimes();
      },
      // 挂载完成时
      mounted(){
        this.nowTimes();
      },
    }
</script>

<style scoped>
.student-top{
  background: darkkhaki;
  margin-top: -1%;
  width: 100%;
}
</style>
