let express = require('express');
let router = express.Router();
let underScore = require('underscore');
let userRoutes = require('./userRoutes');
let movieRouters = require('./movieRouters');
let commentRouter = require('./commentRouters');
// pre handle user
router.use(userRoutes.getUser);

router.get('/', movieRouters.index);
// user router
router.post('/user/login', userRoutes.login);
router.post('/user/signup', userRoutes.signup);

router.get('/showLogin', userRoutes.showLogin);
router.get('/showSignup', userRoutes.showSignup);

router.get('/logout', userRoutes.logout);
router.get('/admin/userlist', userRoutes.loginRequired, userRoutes.adminRequired, userRoutes.userList);


//movie router
// detail 页面
// get('/movie/:id',
router.get('/movie/:id', movieRouters.detail);
// admin 页面  get('/admin/movie',
router.get('/admin/movie', userRoutes.loginRequired, userRoutes.adminRequired, movieRouters.admin);

// list 页面get('/admin/list'
router.get('/admin/list', userRoutes.loginRequired, userRoutes.adminRequired, movieRouters.list);
// 添加新电影
// post('/admin/movie/new',
router.post('/admin/movie/new', userRoutes.loginRequired, userRoutes.adminRequired, movieRouters.new);
// 获取更新页面
// get('/admin/update/:id',
router.post('/admin/movie/:id', userRoutes.loginRequired, userRoutes.adminRequired, movieRouters.update);
// 删除电影
//  delete('/admin/list',
router.delete('/admin/list', userRoutes.loginRequired, userRoutes.adminRequired, movieRouters.list);



// comment routers

router.post('/user/comment', userRoutes.loginRequired, commentRouter.save);
module.exports = router;
