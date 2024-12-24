const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

// 前端路由文件
const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

// 后台路由文件
const adminToysRouter = require('./routes/admin/toys')
const adminMembersRouter = require('./routes/admin/members')
const adminClerksRouter = require('./routes/admin/clerks')
const adminRentalListsRouter = require('./routes/admin/rentalLists')
const adminWorksRouter = require('./routes/admin/works')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS跨域配置
app.use(cors({
  origin: ['http://localhost:5173'], //可设置多个跨域域名
  credentials: true //允许客户端携带验证信息
}))

// 前端路由配置
app.use('/', indexRouter);
// app.use('/users', usersRouter);

// 后台路由配置
app.use('/admin/toys', adminToysRouter)
app.use('/admin/members', adminMembersRouter)
app.use('/admin/clerks', adminClerksRouter)
app.use('/admin/rentalLists', adminRentalListsRouter)
app.use('/admin/works', adminWorksRouter)

module.exports = app;
