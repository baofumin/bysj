const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    CustomBar: app.globalData.CustomBar,
    list:[],
    icon:"",
    Tab:[],
    TabCur: 0,
    types:"",
    index: 0,
    id: null,
    windowHeight: 0,//获取屏幕高度
    typeList:[],
    swiperList: [ {
      id: 2,
      type: 'image',
        url: 'https://n.sinaimg.cn/sinacn10115/235/w662h373/20191216/3013-ikvenft1598307.jpg'
    },{
      id: 0,
      type: 'image',
      url: 'https://d.ifengimg.com/q100/img1.ugc.ifeng.com/newugc/20200812/13/wemedia/3a0b57e3c01ecaba29caf9cf792c4e464d0cfb62_size406_w1920_h1067.jpg'
    }],
  },
  //自定义组件
  attached: function () {

    var that = this;
    wx.getSystemInfo({
        success: function (res) {
            that.setData({
                windowHeight: res.windowHeight
            })
        }
    })
    getData(that,"")
  }, methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        types: this.data.typeList[e.currentTarget.dataset.id].name,
        scrollLeft: (e.currentTarget.dataset.id-1)*60
      })
   if(e.currentTarget.dataset.id == 0 ){
      getData(this,"")
   }else{
   
   }
 }, toReply(e) {
  var id = e.currentTarget.dataset.id;
  app.globalData.id = id;
  wx.navigateTo({
    url: '/pages/basics/detailed/detailed?id=' + id
  })

} ,
    getData(e) {

      var that = this;
      that.setData({
        icon: app.globalData.local_url,
      })
      var val = e.detail.value;
      getData(that, val);
    }


  }




})

function getData(that,val){

  var get_url = app.globalData.local_url + "api/getNewList?name="+val+"&userId="+app.globalData.userId ;
  
  wx.request({
    url: get_url,
    data: {

    },
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.data.code == 200) {
        console.log(res.data.data);
        that.setData({
          list: res.data.data,
        });

      } else {

      }
    }
  })


}