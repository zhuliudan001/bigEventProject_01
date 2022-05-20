$(function () {

  // 去登录点击事件
  $('#link_reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();

  })

  // 去注册点击事件
  $('#link_login').on('click', function () {
    $('.reg-box').hide();
    $('.login-box').show();

  })

  let form = layui.form
  let layer = layui.layer

  // 表单验证
  form.verify({
    // 密码校验
    pwd: [/^[\S]{6,12}$/, '请输入6~12位密码，且不能使用空格！'],

    // 确认密码校验
    repwd: function (value) {
      // 通过形参value可以拿到确认密码框的内容
      // 在拿到密码框的内容
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })


  // 监听注册事件
  $('#form_reg').on('submit', function (e) {
    // 阻止默认提交行为
    e.preventDefault();
    // 注册信息
    let data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val(),
      repassword: $('#form_reg [name=repassword]').val(),
    }

    $.post('/api/reg', data, function (res) {
      if (res.code !== 0) {
        return layer.msg('注册失败！')
      }
      layer.msg('注册成功！')
      // 注册成功后 手动点击去登录 跳转登录页
      $('#link_login').click()
    })

  })


  // 监听登录事件
  $('#form_login').submit(function(e) {

    e.preventDefault()

    $.ajax({
      method:'POST',
      url:'/api/login',
      data:$(this).serialize(),
      success(res){
        if(res.code !== 0) {
          return layer.msg('登录失败!')
        }

        layer.msg('登录成功')
        // 保存token
        localStorage.setItem('token',res.token)
        // 跳转首页
        location.href = '/index.html'

      }


    })


  })









})









