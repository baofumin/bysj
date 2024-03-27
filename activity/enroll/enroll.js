// pages/activity/enroll/enroll.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ["男","女"],
    nations:"",
    sex:"",
    cardNo:"",
    college:"",
    tel:"",
    examId:"",
    numberNo:"",
    address:"",
    political:"",
    postalCode:"",
    index: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      examId: options.id
    })
    console.log(options.id);
    getloadData(this);
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  getNations1(e) {
    console.log("1"+e.detail.value);
    this.setData({
      nations: e.detail.value
    })
  },
  getpostalCode(e) {
    console.log(e);
    this.setData({
      postalCode: e.detail.value
    })
  },
  getpolitical(e) {
    console.log(e);
    this.setData({
      political: e.detail.value
    })
  },
  getaddress(e) {
    console.log(e);
    this.setData({
      address: e.detail.value
    })
  },
  getCardNo(e) {
    console.log(e);
    this.setData({
      cardNo: e.detail.value
    })
  },
  getName(e) {
    console.log( e.detail.value);
    this.setData({
      name: e.detail.value
    })
  },
  getCollege(e) {
    console.log(e);
    this.setData({
      college: e.detail.value
    })
  },
  getNumberNo(e) {
    console.log(e);
    this.setData({
      numberNo: e.detail.value
    })
  }, 
  getTel(e) {
    console.log(e);
    this.setData({
      tel: e.detail.value
    })
  }, 
  save(e){
    var that = this;
    var name = that.data.name
    if (name == "") {
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
        success: function (res) {
        }
      })
      return;
    }
    var nations = that.data.nations
    if (nations == "") {
      wx.showModal({
        title: '提示',
        content: '请输入民族',
        success: function (res) {
        }
      })
      return;
    }
    var cardNo = that.data.cardNo
    if (cardNo == "") {
      wx.showModal({
        title: '提示',
        content: '请输入身份证',
        success: function (res) {
        }
      })
      return;
    }
    var college = that.data.college
    if (college == "") {
      wx.showModal({
        title: '提示',
        content: '请输入学院',
        success: function (res) {
        }
      })
      return;
    }
    var tel = that.data.tel
    if (tel == "") {
      wx.showModal({
        title: '提示',
        content: '请输入联系电话',
        success: function (res) {
        }
      })
      return;
    }
    var index = this.data.index;
    if (index == null) {
      wx.showModal({
        title: '提示',
        content: '请选择性别',
        success: function (res) {
        }
      })
      return;
    }
    var numberNo = that.data.numberNo
    if (numberNo == null) {
      wx.showModal({
        title: '提示',
        content: '请输入考籍号',
        success: function (res) {
        }
      })
      return;
    }
    var address = that.data.address
    if (address == null) {
      wx.showModal({
        title: '提示',
        content: '请输入户籍地址',
        success: function (res) {
        }
      })
      return;
    }
    var postalCode = that.data.postalCode
    if (postalCode == null) {
      wx.showModal({
        title: '提示',
        content: '请输入邮政编码',
        success: function (res) {
        }
      })
      return;
    }
    var political = that.data.political
    if (political == null) {
      wx.showModal({
        title: '提示',
        content: '请输入政治面貌',
        success: function (res) {
        }
      })
      return;
    }
    var save_url = app.globalData.local_url + "api/saveEnroll";
    wx.request({
      url: save_url,
      data: {
        tel:that.data.tel,
        name:that.data.name,
        cardNo:that.data.cardNo,
        examId:that.data.examId,
        college:that.data.college,
        userId :app.globalData.userId,
        nations: that.data.nations,
        sex:this.data.picker[this.data.index],
        numberNo: that.data.numberNo,
        address: that.data.address,
        political: that.data.political,
        postalCode: that.data.postalCode
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: "报名成功",
            icon: "success",
            duration: 10000
          });
          var timer = setTimeout(function () {
            clearTimeout(timer);
            wx.navigateBack()
          }, 1000);
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            success: function (res) {

            }
          })
        }
      }
    })
    },
 
})





function getloadData(that) {
  wx.showToast({
    title: '加载中',
    icon: "loading",
    duration: 10000
  });
  wx.request({
    url: app.globalData.local_url  + "api/getEnroll?userId=" + app.globalData.userId+"&examId="+that.data.examId,
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
      if(res.data.data.sex =='男'){
        console.log("男11");
        that.setData({
          index:0,
       
         })
      }else{
        console.log("男1");
        that.setData({
          index:1,
        
         })
      }
      that.setData({
        tel: res.data.data.tel,
        name: res.data.data.name,
        cardNo: res.data.data.cardNo,
        college: res.data.data.college,
        nations: res.data.data.nations,
        numberNo:res.data.data.numberNo,
        address: res.data.data.address,
        political: res.data.data.political,
        postalCode: res.data.data.postalCode
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