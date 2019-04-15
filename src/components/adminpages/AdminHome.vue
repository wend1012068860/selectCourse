<template>
    <div>
      <div class="top-title">
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">
            &nbsp;
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <h1>选&nbsp;&nbsp;课&nbsp;&nbsp;系&nbsp;&nbsp;统&nbsp;&nbsp;管&nbsp;&nbsp;理&nbsp;&nbsp;界&nbsp;&nbsp;面</h1>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple" style="float: right">
            <h4>管理员:&nbsp;{{adminAccount}}</h4>
            <p>{{nowTime}}</p>
          </div></el-col>
        </el-row>
      </div>

      <div class="bottom-content">
        <div class="bottom-left">
          <el-row>
            <el-col>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#C0C0C0"
                text-color="#000000"
                active-text-color="#DCDCDC">

                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span>课程信息管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-menu-item index="1-3">选项3</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>学生信息管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-service"></i>
                    <span>教师信息管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1">选项1</el-menu-item>
                    <el-menu-item index="3-2">选项2</el-menu-item>
                    <el-menu-item index="3-3">选项3</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>教室信息管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="4-1">选项1</el-menu-item>
                    <el-menu-item index="4-2">选项2</el-menu-item>
                    <el-menu-item index="4-3">选项3</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-edit-outline"></i>
                    <span>数据信息管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="5-1">选项1</el-menu-item>
                    <el-menu-item index="5-2">选项2</el-menu-item>
                    <el-menu-item index="5-3">选项3</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

              </el-menu>
            </el-col>
          </el-row>
        </div>
        <div class="bottom-right">

        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          adminAccount:1111
        }
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
  .top-title{
    background: #A9A9A9;
    width: 100%;
    margin-top: -1%;
  }
  .bottom-content{
    width: 100%;
  }
  .bottom-left{
    width: 18% ;
  }

</style>
