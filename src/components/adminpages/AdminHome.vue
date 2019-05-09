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
            <p @click="exit">退出登录</p>
          </div></el-col>
        </el-row>
      </div>

      <div class="bottom-content">
        <div class="bottom-left">
          <el-row>
            <el-col>
              <el-menu
                default-active="1-1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#C0C0C0"
                text-color="#000000"
                active-text-color="#C71585">

                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span>课程信息管理</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/adminHome/CourseInfo">
                    <el-menu-item index="1-1">课程信息</el-menu-item>
                    </router-link>
                    <router-link to="/adminHome/CourseAdd">
                    <el-menu-item index="1-2">添加课程</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>

                <router-link to="/adminHome/StudentInfoManage">
                <el-menu-item index="2">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>学生信息管理</span>
                  </template>
                </el-menu-item>
                </router-link>

                <router-link to="/adminHome/TeacherInfoManage">
                <el-menu-item index="3">
                  <template slot="title">
                    <i class="el-icon-service"></i>
                    <span>教师信息管理</span>
                  </template>
                </el-menu-item>
                </router-link>

                <router-link to="/adminHome/RoomInfoInquire">
                <el-menu-item index="4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>教室信息查看</span>
                  </template>
                </el-menu-item>
                </router-link>

              </el-menu>
            </el-col>
          </el-row>
        </div>

        <div class="bottom-right">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
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
        exit(){
          var that = this;
          that.$router.push("/")
        },
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
  }
  .bottom-content{
    width: 100%;
  }
  .bottom-left{
    width: 18% ;
    float: left;
  }
  a {
    text-decoration: none;
  }
  .bottom-right{
    width: 82%;
    float: left;
  }

</style>
