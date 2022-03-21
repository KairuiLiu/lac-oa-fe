const jsonServer = require('json-server');
const admin = require('./db_admin');
const aduit = require('./db_aduit');
const apply = require('./db_apply');
const applicant = require('./db_applicant');
const support = require('./db_sup');

const db = { ...admin, ...aduit, ...applicant, ...aduit, ...apply, ...support };

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.get('/user/login', async (req, res) => {
	let type;
	let grp;
	if (/^admin/.test(req.query.userid)) {
		type = 'admin';
		grp = ['管理员', '全部管理员'];
	} else if (/^apply/.test(req.query.userid)) {
		type = 'applicant';
		grp = ['申请人', '2019本科生'];
	} else if (/^aduit/.test(req.query.userid)) {
		type = 'aduit';
		grp = ['审核人', '社会人士'];
	} else if (/^support/.test(req.query.userid)) {
		type = 'support';
		grp = ['审核人', '社会人士'];
	} else {
		res.send({ code: 1 });
		return;
	}
	res.send({
		code: 0,
		data: {
			userInfo: {
				token: '123',
				userId: '1234561',
				username: '张1',
				email: '123@t.com',
				department: '计算机学院',
				face: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				phone: '12345678900',
				group: grp,
			},
			type,
		},
	});
});

server.use(
	jsonServer.rewriter({
		'/admin/*': '/admin_$1',
		'/aduit/*': '/aduit_$1',
		'/applicant/*': '/applicant_$1',
		'/apply/*': '/apply_$1',
		'/support/*': '/support_$1',
	})
);

server.use(middlewares);
server.use(router);
server.listen(20204, () => {
	console.log('JSON Server is running');
});
