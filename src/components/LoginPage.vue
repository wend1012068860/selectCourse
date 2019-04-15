<template>
  <div>
    <div class="bg" :style="bgImg">
      <div class="login">
        <div class="title">
          <h1>选&nbsp;&nbsp;课&nbsp;&nbsp;系&nbsp;&nbsp;统</h1>
        </div>

        <div class="account-height">
          <div class="account">
            <div class="before">
              <h2>账号</h2>
            </div>

            <div class="after">
              <el-input
                placeholder="请输入账号"
                v-model="account"
                clearable>
              </el-input>
            </div>
          </div>
        </div>


        <div class="password-height">
          <div class="password">
            <div class="before2">
              <h2>密码</h2>
            </div>

            <div class="after2">
              <el-input
                placeholder="请输入密码"
                v-model="password"
                show-password>
              </el-input>
            </div>
          </div>
        </div>


        <div class="loginButton">
          <br/>
          <el-button class="btn" type="success" round @click="onClick">登陆</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      bgImg:{
        backgroundImage:"url(" + require("../img/004.jpg") +")",
        backgroundRepeat:"no-repeat",
        backgroundSize:"100% 100%"
      },
      account: '',
      password: ''
    }
  },
  methods:{
    onClick(){
      var that = this;
      this.$http
        .post('http://localhost:8080/login/sign_in ',{"account":this.account,"password":this.password})
        .then(function (response) {
          //alert(JSON.stringify(response.data.data));
          alert(response.data.msg);
          var identity = response.data.data.loginIdentity;
          if (identity === "admin"){
            that.$router.push("/adminHome");
          } else if (identity === "teacher"){
            that.$router.push("/teacherHome");
          } else if (identity === "student"){
            that.$router.push("/studentHome")
          }
        })

    }
  }
}
</script>

<style scoped>
.bg{
  width: 100%;
  height: 100%;
  position: fixed;
}
  .login{
    width: 30%;
    height: 50%;
    border: 3px solid gold;
    border-radius: 10%;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
  }
  .title{
    margin-top: -15px;
    height: 15%;
    font-size: 20px;
  }
  .account{
    margin: 0 auto;
    width: 60%;
  }
  .before{
    float: left;
    margin: 0 auto;
  }
  .after{
    margin: 0 auto;
  }
  .password{
    margin: 0 auto;
    width: 60%;
  }
  .before2{
    float: left;
    margin: 0 auto;
  }
  .after2{
    margin: 0 auto;
  }
  .loginButton{
    margin: 0 auto;
  }
  .btn{
    width: 30%;
    font-size: 100%;
  }
  .account-height{
    height: 30%;
  }
  .password-height{
    height: 30%;
  }

</style>
