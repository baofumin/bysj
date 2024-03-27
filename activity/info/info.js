const app = getApp();
Page({
  data: {
    TabCur: 0,
    scrollLeft:0,
    info:null,
    userPass: "",
    id:null,
    list:[],
    content:"",
    achievement:""
  },
  userPass: function (e) {
    this.setData({
      userPass: e.detail.value
    })
  },
  getcontent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      startdate: e.detail.value
    })
  },
  toReply(e){
    var that  = this;
    if(!app.globalData.isLogin) {
      wx.navigateTo({
        url: '/pages/about/login/login'
      })
    }else{
      wx.navigateTo({
        url: '/pages/activity/enroll/enroll?id='+that.data.id
      }) 

    }
    
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.init();
    getloadData1(this);
  },
  init(){
    var id = this.data.id;
    var that = this;
    var userId = app.globalData.userId;
    wx.request({
      url: app.globalData.local_url + 'api/getExam',
      data: {
        examId : id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data);
          that.setData({
            info: res.data.data
          });   
        
      }
    })
  },
  showModal(e) {
    var that = this;
    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: '/pages/about/login/login'
      })
      return;
    } 
    this.setData({
      modalName: e.currentTarget.dataset.target
     
    })
  }, hideModal(e) {
   
    this.setData({
      modalName: null
    })
  },toReply1(e){
    var that  = this;
    if(!app.globalData.isLogin) {
      wx.navigateTo({
        url: '/pages/about/login/login'
      })
    }else{
      wx.showModal({
        title: '提示',
        content: that.data.achievement,
        success: function (res) {

        }
      })

    }
    
  },
})







function getloadData1(that) {
  wx.showToast({
    title: '加载中',
    icon: "loading",
    duration: 10000
  });
  wx.request({
    url: app.globalData.local_url  + "api/getEnroll?userId=" + app.globalData.userId+"&examId="+that.data.id,
    data: {

    },
    header: {
      'content-type': 'application/json'
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      console.log(res.data);
      wx.hideToast();
      console.log(res.data.data.sex);
      that.setData({
   
        achievement: res.data.data.achievement
      });
      // 隐藏加载框
      wx.hideLoading();

    },
    fail: function (res) {
      wx.stopPullDownRefresh();
    },
    complete: function (res) {

    },
  })
}