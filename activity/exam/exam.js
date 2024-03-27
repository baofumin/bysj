const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    list:[],
    list1:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  attached: function () {
    var get_url = app.globalData.local_url + "api/getExamList?userId="+app.globalData.userId;
  var that =this;
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
            list: res.data.data.list,
            list1: res.data.data.list1,
          });
  
        } else {
  
        }
      }
    })
  },
  methods: {
    getData(e) {
      var val = e.detail.value;
      var get_url = app.globalData.local_url + "api/getExamList?name=" +val+"userId="+app.globalData.id;
      var that =this;
        wx.request({
          url: get_url,
          data: {
           name:val
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.data.code == 200) {
              console.log(res.data.data);
              that.setData({
                list: res.data.data.list,
                list1: res.data.data.list1,
              });
      
            } else {
      
            }
          }
        })
    },
    toReply(e) {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/activity/info/info?id=' + id
      })

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})